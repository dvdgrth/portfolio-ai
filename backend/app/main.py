from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.openai_chat import get_chat_response
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from pydantic import BaseModel, EmailStr
from typing import Optional

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

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str
    company: Optional[str] = None

@app.post("/api/contact")
@limiter.limit("3/minute")
async def contact(request: Request, form_data: ContactForm):
    try:
        # TODO: Add email sending logic here
        # For now, just print the data
        print(f"Received contact form: {form_data.dict()}")
        return {"status": "success", "message": "Message received"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
@limiter.limit("5/minute")
async def chat(request: Request):
    return {"message": {"role": "assistant", "content": "test"}}
    data = await request.json()
    messages = data.get("messages", [])
    response = get_chat_response(messages)
    print("Response from /chat:", response)
    return response
