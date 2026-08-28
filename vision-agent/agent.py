import os
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from fastapi import Header, HTTPException, status
from vision_agents.core import Agent, Runner, ServeOptions, User
from vision_agents.core.agents import AgentLauncher
from vision_agents.core.instructions import Instructions
from vision_agents.plugins import getstream, openai

# STREAM_API_KEY / STREAM_API_SECRET are reused from the parent Expo app's
# .env (one directory up) instead of being duplicated here. OPENAI_API_KEY
# lives in this project's own .env - see .env.example. VISION_AGENT_SHARED_SECRET
# is also reused from the parent .env - it authenticates the Expo backend's
# app/api/agent/*+api.ts routes to this server's `serve` mode (see
# `_require_shared_secret` below).
load_dotenv(Path(__file__).resolve().parent.parent / ".env")
load_dotenv()


DEFAULT_INSTRUCTIONS = (
    "You are a friendly, encouraging AI language teacher on a voice-only call. "
    "Always speak English, and teach the target language through English: "
    "introduce foreign words and phrases naturally, but always give the "
    "English translation right after. Keep sentences short, praise attempts, "
    "and gently correct pronunciation. Never use special characters or "
    "emoji - your replies are spoken aloud."
)


async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="AI Teacher", id="ai-teacher"),
        instructions=DEFAULT_INSTRUCTIONS,
        # Realtime handles speech in and out itself - no separate STT/TTS.
        # send_video=False because this teacher is voice only.
        llm=openai.Realtime(send_video=False),
    )


def build_instructions(custom_data: dict[str, Any]) -> str:
    """Extend DEFAULT_INSTRUCTIONS with the lesson context the Expo app packs
    onto the Stream call's custom data (see app/api/stream/call+api.ts)."""
    language_name = custom_data.get("languageName")
    lesson_title = custom_data.get("lessonTitle")
    goals: list[str] = custom_data.get("goals") or []
    vocabulary: list[dict[str, Any]] = custom_data.get("vocabulary") or []
    phrases: list[dict[str, Any]] = custom_data.get("phrases") or []
    teacher_prompt: dict[str, Any] = custom_data.get("aiTeacherPrompt") or {}
    system_prompt = teacher_prompt.get("systemPrompt")
    focus_areas: list[str] = teacher_prompt.get("focusAreas") or []

    parts = [DEFAULT_INSTRUCTIONS]
    if language_name:
        parts.append(f"Today you are teaching {language_name}.")
    if lesson_title:
        parts.append(f'This lesson is called "{lesson_title}".')
    if system_prompt:
        parts.append(system_prompt)
    if goals:
        parts.append("Lesson goals: " + "; ".join(goals) + ".")
    if vocabulary:
        vocab_list = ", ".join(
            f"{item.get('term')} ({item.get('translation')})"
            for item in vocabulary
            if item.get("term") and item.get("translation")
        )
        if vocab_list:
            parts.append(f"Vocabulary to teach this lesson: {vocab_list}.")
    if phrases:
        phrase_list = ", ".join(
            f"{item.get('phrase')} ({item.get('translation')})"
            for item in phrases
            if item.get("phrase") and item.get("translation")
        )
        if phrase_list:
            parts.append(f"Key phrases to practice: {phrase_list}.")
    if focus_areas:
        parts.append("Focus areas: " + ", ".join(focus_areas) + ".")

    return " ".join(parts)


def build_greeting_prompt(custom_data: dict[str, Any]) -> str:
    """Build the instruction for the agent's opening line from the same
    lesson context, preferring the lesson's own scripted greeting."""
    language_name = custom_data.get("languageName")
    lesson_title = custom_data.get("lessonTitle")
    teacher_prompt: dict[str, Any] = custom_data.get("aiTeacherPrompt") or {}
    greeting = teacher_prompt.get("greeting")
    greeting_translation = teacher_prompt.get("greetingTranslation")

    if greeting and greeting_translation:
        lesson_clause = f' for today\'s lesson on "{lesson_title}"' if lesson_title else ""
        return (
            f'Greet the student warmly using this exact opening line: "{greeting}" '
            f'(which means "{greeting_translation}"), say it and then translate it, '
            f"introduce yourself as their {language_name or 'language'} teacher"
            f"{lesson_clause}, and ask if they're ready to start."
        )
    if language_name:
        return (
            f"Greet the student warmly, introduce yourself as their "
            f"{language_name} teacher, and ask if they're ready to start."
        )
    return (
        "Greet the student warmly, introduce yourself as their AI "
        "language teacher, and ask which language they'd like to "
        "practice today."
    )


async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    # The Expo app creates this call before the agent joins (see
    # app/api/stream/call+api.ts) and stores the selected lesson's full
    # teaching context on it as custom data. get_or_create here just fetches
    # that same call - it will not overwrite the existing data, audio-only
    # settings, or the "admin" member role the Expo app already granted this
    # agent's user (needed to publish audio in the "audio_room" call type).
    call = await agent.create_call(call_type, call_id)
    custom_data = call.custom_data or {}

    instructions = build_instructions(custom_data)
    agent.instructions = Instructions(input_text=instructions)
    agent.llm.set_instructions(agent.instructions)

    async with agent.join(call):
        await agent.simple_response(text=build_greeting_prompt(custom_data))
        await agent.finish()


def _require_shared_secret(authorization: str | None = Header(default=None)) -> None:
    """FastAPI dependency used for every session-management endpoint in
    `serve` mode. Requires a `VISION_AGENT_SHARED_SECRET` bearer token from
    the Expo backend (see lib/vision-agent-server.ts) so nobody else can
    start or stop AI teacher sessions. Left open only if the secret isn't
    configured, e.g. local development."""
    expected = os.environ.get("VISION_AGENT_SHARED_SECRET")
    if not expected:
        return
    provided = authorization.removeprefix("Bearer ") if authorization else None
    if provided != expected:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")


serve_options = ServeOptions(
    can_start_session=_require_shared_secret,
    can_close_session=_require_shared_secret,
    can_view_session=_require_shared_secret,
    can_view_metrics=_require_shared_secret,
)

runner = Runner(
    AgentLauncher(create_agent=create_agent, join_call=join_call),
    serve_options=serve_options,
)


if __name__ == "__main__":
    runner.cli()
