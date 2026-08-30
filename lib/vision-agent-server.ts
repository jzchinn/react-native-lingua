// Server-only. Proxies to the Python Vision Agent HTTP server (vision-agent/
// agent.py, run via `uv run agent.py serve`), which spawns the AI teacher
// into a Stream call. Never import this file from client-rendered code - it
// reads VISION_AGENT_SHARED_SECRET, which authenticates this backend to that
// server (see vision-agent/agent.py's ServeOptions).

function getAgentServerUrl(): string {
  const url = process.env.VISION_AGENT_URL;
  if (!url) {
    throw new Error("VISION_AGENT_URL must be set");
  }
  return url.replace(/\/+$/, "");
}

function getAuthHeaders(): HeadersInit {
  const secret = process.env.VISION_AGENT_SHARED_SECRET;
  if (!secret) {
    // Fail before the request goes out, not by silently sending it
    // unauthenticated - the vision-agent server fails closed on its side
    // too (see `_require_shared_secret` in vision-agent/agent.py).
    throw new Error("VISION_AGENT_SHARED_SECRET must be set");
  }
  return { Authorization: `Bearer ${secret}` };
}

export interface AgentJoinResult {
  sessionId: string;
}

// POST /calls/{call_id}/sessions - starts the AI teacher and has it join the
// call. The call itself must already exist (see app/api/stream/call+api.ts).
export async function joinCallWithAgent(callId: string, callType: string): Promise<AgentJoinResult> {
  const response = await fetch(`${getAgentServerUrl()}/calls/${encodeURIComponent(callId)}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ call_type: callType }),
  });

  if (!response.ok) {
    throw new Error(`Vision agent join failed: ${response.status}`);
  }

  const data = await response.json();
  return { sessionId: data.session_id };
}

// DELETE /calls/{call_id}/sessions/{session_id} - asks the agent to leave.
// A 404 means the session is already gone (e.g. it idled out on its own),
// which is a successful outcome for a cleanup call, not an error.
export async function removeAgentFromCall(callId: string, sessionId: string): Promise<void> {
  const response = await fetch(
    `${getAgentServerUrl()}/calls/${encodeURIComponent(callId)}/sessions/${encodeURIComponent(sessionId)}`,
    { method: "DELETE", headers: getAuthHeaders() },
  );

  if (!response.ok && response.status !== 404) {
    throw new Error(`Vision agent leave failed: ${response.status}`);
  }
}
