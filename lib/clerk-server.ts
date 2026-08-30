import { verifyToken } from "@clerk/backend";

// Server-only. Verifies the Clerk session token a client attaches as
// `Authorization: Bearer <token>` and returns the authenticated Clerk user
// id. Never trust a client-supplied user id instead of this.
export async function getAuthenticatedUserId(request: Request): Promise<string> {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null;

  if (!token) {
    throw new Response("Missing Authorization header", { status: 401 });
  }

  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    throw new Error("CLERK_SECRET_KEY must be set");
  }

  try {
    const verified = await verifyToken(token, { secretKey });
    return verified.sub;
  } catch {
    throw new Response("Invalid or expired session", { status: 401 });
  }
}
