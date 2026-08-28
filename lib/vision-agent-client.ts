import { authedFetch, type GetToken } from "@/lib/authed-fetch";

export interface AgentSession {
  sessionId: string;
}

export function startAgentSession(getToken: GetToken, lessonId: string): Promise<AgentSession> {
  return authedFetch("/api/agent/start", getToken, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId }),
  });
}

export function stopAgentSession(
  getToken: GetToken,
  lessonId: string,
  sessionId: string,
): Promise<{ ok: boolean }> {
  return authedFetch("/api/agent/stop", getToken, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId, sessionId }),
  });
}
