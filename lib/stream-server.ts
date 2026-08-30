import { StreamClient } from "@stream-io/node-sdk";

// Server-only. Holds the Stream API secret - never import this file from
// client-rendered code, only from `+api.ts` route handlers.
let client: StreamClient | undefined;

export function getStreamServerClient() {
  if (!client) {
    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;
    if (!apiKey || !apiSecret) {
      throw new Error("STREAM_API_KEY and STREAM_API_SECRET must be set");
    }
    client = new StreamClient(apiKey, apiSecret);
  }
  return client;
}
