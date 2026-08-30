import { getLessonById } from "@/data/lessons";
import { getAuthenticatedUserId } from "@/lib/clerk-server";
import { getLessonCallId, LESSON_CALL_TYPE } from "@/lib/lesson-call";
import { joinCallWithAgent } from "@/lib/vision-agent-server";

// POST /api/agent/start { lessonId }
// Proxies to the Vision Agent server to have the AI teacher join the
// lesson's Stream call (created beforehand by app/api/stream/call+api.ts).
// The callId is re-derived server-side from the trusted lesson id and the
// verified Clerk user, never taken from the client.
export async function POST(request: Request) {
  let userId: string;
  try {
    userId = await getAuthenticatedUserId(request);
  } catch (err) {
    if (err instanceof Response) return err;
    console.error("Agent start: auth failed", err);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const lessonId = typeof body?.lessonId === "string" ? body.lessonId : null;
  if (!lessonId) {
    return Response.json({ error: "lessonId is required" }, { status: 400 });
  }

  const lesson = getLessonById(lessonId);
  if (!lesson) {
    return Response.json({ error: "Lesson not found" }, { status: 404 });
  }

  const callId = getLessonCallId(lesson.id, userId);

  try {
    const { sessionId } = await joinCallWithAgent(callId, LESSON_CALL_TYPE);
    return Response.json({ sessionId });
  } catch (err) {
    console.error("Agent start: failed to start agent session", err);
    return Response.json({ error: "Failed to start AI teacher" }, { status: 502 });
  }
}
