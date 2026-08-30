// The Stream user id the Vision Agent (vision-agent/agent.py) joins calls
// as. Shared between the client (to detect when the AI teacher has joined
// the call) and the server (to grant it an elevated call-member role) - see
// app/api/stream/call+api.ts and app/lesson/[id].tsx. Must match the
// `agent_user=User(id=...)` in vision-agent/agent.py.
export const AI_TEACHER_USER_ID = "ai-teacher";
