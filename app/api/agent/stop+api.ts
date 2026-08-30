import { getAuthenticatedUserId } from "@/lib/clerk-server";
import { getLessonCallId } from "@/lib/lesson-call";
import { removeAgentFromCall } from "@/lib/vision-agent-server";

// POST /api/agent/stop { lessonId, sessionId }
// Proxies to the Vision Agent server to close the AI teacher's session.
// Called both when the user explicitly ends the call and when the lesson
// screen unmounts - see app/lesson/[id].tsx.
export async function POST(request: Request) {
  let userId: string;
  try {
    userId = await getAuthenticatedUserId(request);
  } catch (err) {
    if (err instanceof Response) return err;
    console.error("Agent stop: auth failed", err);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const lessonId = typeof body?.lessonId === "string" ? body.lessonId : null;
  const sessionId = typeof body?.sessionId === "string" ? body.sessionId : null;
  if (!lessonId || !sessionId) {
    return Response.json({ error: "lessonId and sessionId are required" }, { status: 400 });
  }

  const callId = getLessonCallId(lessonId, userId);

  try {
    await removeAgentFromCall(callId, sessionId);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Agent stop: failed to stop agent session", err);
    return Response.json({ error: "Failed to stop AI teacher" }, { status: 502 });
  }
}
