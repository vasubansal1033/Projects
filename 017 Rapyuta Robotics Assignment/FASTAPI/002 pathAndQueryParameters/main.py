from typing import Optional
from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def hello_word():
    return {"message": "hello world!"}
