export type GetToken = () => Promise<string | null>;

// Shared by lib/stream-client.ts and lib/vision-agent-client.ts to call this
// app's own `+api.ts` routes with the signed-in Clerk user's session token.
export async function authedFetch(path: string, getToken: GetToken, init?: RequestInit) {
  const token = await getToken();
  if (!token) throw new Error("Not signed in");

  const response = await fetch(path, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`${path} failed: ${response.status}`);
  }

  return response.json();
}
