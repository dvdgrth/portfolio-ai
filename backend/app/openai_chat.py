import os
import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_chat_response(messages):
    system_promt = {"role": "system", "content": os.getenv("SYSTEM_PROMPT")}
    if not system_promt["content"]:
        raise ValueError("System prompt is not set in the environment variables.")
    print("Messages before adding system prompt:", messages)
    messages.insert(0, system_promt)
    print("Messages after adding system prompt:", messages)
    response = openai.chat.completions.create(
            model="gpt-4.1",
            messages=messages
        )
    print("Response from OpenAI:", response)
    return {"message": {"role": "assistant", "content": response.choices[0].message.content}}


