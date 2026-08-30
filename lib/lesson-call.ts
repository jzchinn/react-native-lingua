// Server-only. Shared by app/api/stream/call+api.ts and app/api/agent/*+api.ts
// so the Stream call id/type for one Clerk user's attempt at one lesson is
// derived identically in every route - the client only ever supplies a
// lessonId, never the callId directly.

export const LESSON_CALL_TYPE = "audio_room";

export function getLessonCallId(lessonId: string, userId: string): string {
  return `${lessonId}--${userId}`.replace(/[^a-zA-Z0-9_-]/g, "-");
}
