"""Unit tests for the pure functions that turn a lesson call's custom data
(packed by app/api/stream/call+api.ts) into agent instructions/greeting.
Unlike test_agent.py, these don't call any model and always run.
"""

from agent import DEFAULT_INSTRUCTIONS, build_greeting_prompt, build_instructions

LESSON_CUSTOM_DATA = {
    "languageName": "Spanish",
    "lessonTitle": "Say Hello",
    "goals": ["Greet someone in Spanish", "Say goodbye politely"],
    "vocabulary": [{"term": "hola", "translation": "hello"}],
    "phrases": [{"phrase": "¡Hola! ¿Cómo estás?", "translation": "Hi! How are you?"}],
    "aiTeacherPrompt": {
        "systemPrompt": "Focus on greetings.",
        "focusAreas": ["greetings", "pronunciation"],
        "greeting": "¡Hola! Soy tu profesor de español.",
        "greetingTranslation": "Hi! I'm your Spanish teacher.",
    },
}


def test_build_instructions_includes_lesson_context():
    instructions = build_instructions(LESSON_CUSTOM_DATA)

    assert instructions.startswith(DEFAULT_INSTRUCTIONS)
    assert "Spanish" in instructions
    assert "Say Hello" in instructions
    assert "Focus on greetings." in instructions
    assert "Greet someone in Spanish" in instructions
    assert "hola (hello)" in instructions
    assert "¡Hola! ¿Cómo estás? (Hi! How are you?)" in instructions
    assert "greetings, pronunciation" in instructions


def test_build_instructions_falls_back_to_default_when_empty():
    assert build_instructions({}) == DEFAULT_INSTRUCTIONS


def test_build_greeting_prompt_uses_scripted_greeting():
    prompt = build_greeting_prompt(LESSON_CUSTOM_DATA)

    assert "¡Hola! Soy tu profesor de español." in prompt
    assert "Hi! I'm your Spanish teacher." in prompt
    assert "Say Hello" in prompt


def test_build_greeting_prompt_falls_back_without_scripted_greeting():
    prompt = build_greeting_prompt({"languageName": "Spanish"})

    assert prompt == (
        "Greet the student warmly, introduce yourself as their "
        "Spanish teacher, and ask if they're ready to start."
    )


def test_build_greeting_prompt_falls_back_without_any_context():
    prompt = build_greeting_prompt({})

    assert prompt == (
        "Greet the student warmly, introduce yourself as their AI "
        "language teacher, and ask which language they'd like to "
        "practice today."
    )
