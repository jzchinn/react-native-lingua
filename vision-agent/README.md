# vision-agent

The AI language teacher for the Duolingo clone app. A voice-only agent, built
with [Vision Agents](https://visionagents.ai), that joins the Stream call the
Expo app creates for a lesson (see `app/api/stream/call+api.ts`) and teaches
the selected language through English using OpenAI Realtime.

The Expo app packs the selected lesson's title, language, goals, vocabulary,
phrases, and AI-teacher prompt onto that Stream call's custom data. `agent.py`
reads it back (`build_instructions`/`build_greeting_prompt`) to teach the
actual lesson content instead of a generic script.

The Expo app also creates the call as the built-in `"audio_room"` type and
adds this agent's Stream user as a member with the `"admin"` role - that
call type only grants `send-audio` to the call owner by default, so the
agent needs an elevated role to speak. See the comments in
`app/api/stream/call+api.ts` for the full permission story.

## Setup

1. Copy `.env.example` to `.env` and add your `OPENAI_API_KEY`.
   `STREAM_API_KEY`/`STREAM_API_SECRET`/`VISION_AGENT_SHARED_SECRET` are
   reused from the parent app's `.env` (`../.env`) - no need to duplicate
   them here.
2. Install dependencies:

   ```bash
   uv sync
   ```

3. Run the agent:

   ```bash
   uv run agent.py run     # single-call console, opens a demo call in the browser
   uv run agent.py serve   # HTTP server, joins calls on request (production)
   ```

   `serve` mode is what `app/api/agent/start+api.ts` and `stop+api.ts` talk
   to (see `VISION_AGENT_URL` in the root `.env.example`) - it exposes
   `POST /calls/{call_id}/sessions` and
   `DELETE /calls/{call_id}/sessions/{session_id}`, guarded by the
   `VISION_AGENT_SHARED_SECRET` bearer token when one is set.

   To join an existing lesson call instead of a fresh demo one, pass its
   `call_type`/`call_id` (from `app/api/stream/call+api.ts`, `call_type` is
   always `"audio_room"`):

   ```bash
   uv run agent.py run --call-type audio_room --call-id <callId> --no-demo
   ```

4. Run the tests:

   ```bash
   uv run pytest
   ```

   `tests/test_lesson_context.py` covers `build_instructions`/
   `build_greeting_prompt` with no network calls. `tests/test_agent.py`
   uses an `LLMJudge` against the real OpenAI API and is skipped unless
   `OPENAI_API_KEY` is set.

## Docker

```bash
docker build -t vision-agent .
docker run --env-file .env -p 8000:8000 vision-agent
```
