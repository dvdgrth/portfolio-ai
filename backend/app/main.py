from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.openai_chat import get_chat_response

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # TODO: Use env variable
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    messages = data.get("messages", [])
    response = get_chat_response(messages)
    print("Response from /chat:", response)
    return response
