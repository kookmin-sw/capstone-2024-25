from config import API_KEY
from ai.modules.twenty_questions import handle_twenty_questions
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional


class PreviousQnAs(BaseModel):
    question: str
    answer: str
    type: Optional[str] = None


class QueryData(BaseModel):
    isGame: bool
    solution: str
    qnas: List[PreviousQnAs]
    question: str


# FastAPI 애플리케이션 인스턴스 생성
app = FastAPI()


# 주어진 질문 데이터를 처리하는 스무고개 챗봇 API 엔드포인트
@app.post("/chatbot_game/")
def twenty_questions_main(query_data: QueryData):
    try:
        api_key = API_KEY
        response = handle_twenty_questions(api_key, query_data.solution, query_data.qnas, query_data.question)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
