from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.openai_chat import get_chat_response
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # TODO: Use env variable
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
@limiter.limit("5/minute")
async def chat(request: Request):
    return {"message": {"role": "assistant", "content": "test"}}
    data = await request.json()
    messages = data.get("messages", [])
    response = get_chat_response(messages)
    print("Response from /chat:", response)
    return response
