import { getAuthenticatedUserId } from "@/lib/clerk-server";
import { getStreamServerClient } from "@/lib/stream-server";

// GET /api/stream/token
// Mints a short-lived Stream user token for the signed-in Clerk user. The
// user id always comes from the verified session, never from the request -
// see lib/clerk-server.ts.
export async function GET(request: Request) {
  let userId: string;
  try {
    userId = await getAuthenticatedUserId(request);
  } catch (err) {
    if (err instanceof Response) return err;
    console.error("Stream token: auth failed", err);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const stream = getStreamServerClient();
    const token = stream.generateUserToken({
      user_id: userId,
      validity_in_seconds: 60 * 60 * 4,
    });

    return Response.json({
      apiKey: process.env.STREAM_API_KEY,
      token,
      userId,
    });
  } catch (err) {
    console.error("Stream token: failed to generate token", err);
    return Response.json({ error: "Failed to generate Stream token" }, { status: 500 });
  }
}
