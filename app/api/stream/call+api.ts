import { AI_TEACHER_USER_ID } from "@/constants/vision-agent";
import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { getAuthenticatedUserId } from "@/lib/clerk-server";
import { getLessonCallId, LESSON_CALL_TYPE } from "@/lib/lesson-call";
import { getStreamServerClient } from "@/lib/stream-server";

// POST /api/stream/call { lessonId }
// Creates (or reuses) the audio-only Stream call for one Clerk user's
// attempt at one lesson, and enforces audio-only server-side so a client
// can't publish video even if it tried. The lesson itself is looked up
// server-side from the trusted lesson id - the client never supplies
// title/language directly.
//
// Uses the "audio_room" built-in call type so both speakers (the student
// and the AI teacher) can publish audio. That type ships in "backstage"
// mode and its default roles only grant `send-audio`/`join-backstage` to
// the call's owner - the student is the owner (`created_by_id`), so they're
// covered, but the AI teacher isn't. It's added as a member with the
// built-in "admin" role instead, which always carries those grants, and the
// call is taken out of backstage with `goLive()` right away so neither side
// has to wait on a client-side action first.
export async function POST(request: Request) {
  let userId: string;
  try {
    userId = await getAuthenticatedUserId(request);
  } catch (err) {
    if (err instanceof Response) return err;
    console.error("Stream call: auth failed", err);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const lessonId = typeof body?.lessonId === "string" ? body.lessonId : null;
  if (!lessonId) {
    return Response.json({ error: "lessonId is required" }, { status: 400 });
  }

  const lesson = getLessonById(lessonId);
  const language = lesson ? getLanguageById(lesson.languageId) : undefined;
  if (!lesson || !language) {
    return Response.json({ error: "Lesson not found" }, { status: 404 });
  }

  const callId = getLessonCallId(lesson.id, userId);

  try {
    const stream = getStreamServerClient();
    const call = stream.video.call(LESSON_CALL_TYPE, callId);
    await call.getOrCreate({
      data: {
        created_by_id: userId,
        members: [{ user_id: userId }, { user_id: AI_TEACHER_USER_ID, role: "admin" }],
        custom: {
          kind: "ai-audio-lesson",
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          languageId: language.id,
          languageName: language.name,
          goals: lesson.goals.map((goal) => goal.description),
          vocabulary: lesson.vocabulary.map((item) => ({
            term: item.term,
            translation: item.translation,
          })),
          phrases: lesson.phrases.map((phrase) => ({
            phrase: phrase.phrase,
            translation: phrase.translation,
          })),
          aiTeacherPrompt: {
            systemPrompt: lesson.aiTeacherPrompt.systemPrompt,
            greeting: lesson.aiTeacherPrompt.greeting,
            greetingTranslation: lesson.aiTeacherPrompt.greetingTranslation,
            focusAreas: lesson.aiTeacherPrompt.focusAreas,
          },
        },
        settings_override: {
          audio: { mic_default_on: true, default_device: "speaker" },
          video: {
            enabled: false,
            camera_default_on: false,
            // Stream validates target_resolution even when video is
            // disabled - GetOrCreateCall rejects the request without it.
            target_resolution: { width: 640, height: 480 },
          },
        },
      },
    });

    try {
      await call.goLive();
    } catch (err) {
      // Non-fatal: both the student (call owner) and the AI teacher (admin
      // member) already have `join-backstage`, so the call is still
      // joinable even if this best-effort call fails.
      console.error("Stream call: failed to go live", err);
    }

    return Response.json({ callId, callType: LESSON_CALL_TYPE });
  } catch (err) {
    console.error("Stream call: failed to create/get call", err);
    return Response.json({ error: "Failed to create call" }, { status: 500 });
  }
}
