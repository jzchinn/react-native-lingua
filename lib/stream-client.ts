import { authedFetch, type GetToken } from "@/lib/authed-fetch";

export interface StreamSession {
  apiKey: string;
  token: string;
  userId: string;
}

export function fetchStreamSession(getToken: GetToken): Promise<StreamSession> {
  return authedFetch("/api/stream/token", getToken);
}

export interface LessonCall {
  callId: string;
  callType: string;
}

export function createLessonCall(getToken: GetToken, lessonId: string): Promise<LessonCall> {
  return authedFetch("/api/stream/call", getToken, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId }),
  });
}
