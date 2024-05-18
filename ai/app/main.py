import os
from langchain_openai import ChatOpenAI
from config import API_KEY, DB_URI, NEWS_API_KEY, WEATHER_API_KEY
from ai.modules.daily_conversation import handle_daily_conversation
from ai.modules.data_based import handle_data_based
from ai.modules.api_based import handle_news_api_based
from ai.modules.api_based import handle_weather_api_based
from ai.modules.twenty_questions import handle_twenty_questions
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional


# 이전 대화
class PreviousQnAs(BaseModel):
    question: str
    answer: str
    type: Optional[str] = None


# 일반 챗봇 질문
class QueryData(BaseModel):
    qnas: List[PreviousQnAs]
    address: str
    gender: str
    isGame: bool
    question: str


# 스무고개 챗봇 질문
class GameQueryData(BaseModel):
    isGame: bool
    solution: str
    qnas: List[PreviousQnAs]
    question: str


# FastAPI 애플리케이션 인스턴스 생성
app = FastAPI()


# 질문 분류 함수
def classify_query(query):
    try:
        query = f"""
                    사용자의 질문에 가장 잘 맞는 카테고리를 분류해야해. 각 카테고리에는 특정 주제가 있어.
                    '뉴스': 정치, 경제, 세계, 스포츠, IT/과학, 전체
                    '문화': 교육, 공원, 쇼핑
                    '방문서비스': 간호, 목욕, 요양 서비스
                    '날씨': 날씨
                    '일상대화': 그 외 일반 대화나 소셜 상호작용 관련 질문
    
                    사용자의 질문을 분석하여 가장 적절한 카테고리를 선택해야해.
                    질문의 내용과 맥락을 고려하여 가장 유사한 카테고리를 선택해줘.
                    뉴스, 문화, 방문서비스, 날씨 카테고리의 세부 내용을 참고하여 그 내용을 제공할 수 있으면 해당 카테고리로 분류해줘.
                    
                    위의 네가지 카테고리에 제공할 수 있는 내용이 없다면, 일상대화로 분류해줘.
                    카테고리는 뉴스, 문화, 방문서비스, 날씨, 일상대화 중에 골라서 한글로 답변해야해.
                
                    사용자 질문: '{query}'
                    이에 대한 답변은 category: 선택된 카테고리 형식으로 제공해줘.
                """

        # openAI api key 설정
        os.environ["OPENAI_API_KEY"] = API_KEY

        # gpt-4 모델 설정
        model = ChatOpenAI(model_name="gpt-3.5-turbo")

        # 질문 설정 및 모델 호출
        # formatted_prompt = few_shot_prompt.format()
        result = model.invoke(query)

        # 모델 답변에서 정답 추출
        category = result.content.split("category: ")[1].strip().split("\n")[0]

        return category
    except Exception:
        return "죄송합니다. 카테고리를 분류하지 못했어요. 질문을 다시 입력해주세요."


# 주어진 질문 데이터를 처리하는 일반 챗봇 API 엔드포인트
@app.post("/chatbot/")
def main(query_data: QueryData):
    try:
        api_key = API_KEY
        news_api_key = NEWS_API_KEY
        weather_api_key = WEATHER_API_KEY
        db_uri = DB_URI
        category = classify_query(query_data.question)

        # 카테고리에 따른 함수 실행
        if category == "문화" or category == "방문서비스":
            response = handle_data_based(api_key, query_data.question, db_uri, query_data.address)
        elif category == "뉴스":
            response = handle_news_api_based(api_key, news_api_key, query_data.question)
        elif category == "날씨":
            response = handle_weather_api_based(api_key, weather_api_key, query_data.address)
        else:
            response = handle_daily_conversation(api_key, query_data.question, query_data.qnas)

        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# 주어진 질문 데이터를 처리하는 스무고개 챗봇 API 엔드포인트
@app.post("/chatbot_game/")
def twenty_questions_main(query_data: GameQueryData):
    try:
        api_key = API_KEY
        response = handle_twenty_questions(api_key, query_data.solution, query_data.qnas, query_data.question)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))