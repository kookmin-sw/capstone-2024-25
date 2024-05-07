from ai.services.api_service import get_news_data
import os
import json
from datetime import datetime
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field


# 답변 json 자료구조 정의
class ApiBased(BaseModel):
    type: str = Field("NEWS", description="Type of conversation")
    answer: str = Field(description="Answer of the conversation")


# 뉴스 정렬 및 description 수정 함수
def sort_shorten_news(news_data):
    # 'results' 키에서 뉴스 목록을 추출
    articles = news_data["results"]

    # 각 뉴스의 'description'을 기준으로 내림차순 정렬
    sorted_articles = sorted(articles, key=lambda x: x["description"] if x["description"] is not None else "", reverse=True)

    # 상위 6개 뉴스의 'title', 'category', 'description', 'link' 추출
    top_articles = []
    for article in sorted_articles[:6]:
        article_details = {}
        for key in ["title", "category", "description", "link"]:
            if key == "category":
                article_details[key] = article[key][0]
            else:
                article_details[key] = article[key]
        top_articles.append(article_details)

    # 뉴스 description 100자 이후 삭제 및 '...' 추가
    for article in top_articles:
        article["description"] = article["description"][:101] + "..."

    # 결과 출력
    return top_articles


# 뉴스 카테고리 추출 함수(from 질문)
def extract_news_category(api_key, query):
    # openAI api key 설정
    os.environ["OPENAI_API_KEY"] = api_key

    # gpt-4 모델 설정
    model = ChatOpenAI(model_name="gpt-4")

    # 모델에 입력할 질문
    query = (f"""
             뉴스의 카테고리는 '전체, 정치, 경제, 스포츠, IT/과학, 세계'가 있어.
             사용자의 질문에서 어떤 뉴스 카테고리를 궁금해하고 있는지 찾아줘.
             사용자의 질문은 이와 같아: {query}
             특별하게 궁금한 분야가 없으면 '전체'라고 대답해줘
             
             답변은 다음과 같은 형식으로 줘: category: 선택된 카테고리
             """)

    # 모델 답변 저장
    result = model.predict(query)

    # 모델 답변에서 한글 카테고리 추출
    category_kor = result.split(":")[1].strip()

    return category_kor


# 뉴스 영어 카테고리 설정 함수
def filter_news_type(category):
    category_map = {
        "전체": "politics, business, sports, technology, world",
        "정치": "politics",
        "경제": "business",
        "스포츠": "sports",
        "IT/과학": "technology",
        "세계": "world"
    }
    return category_map.get(category, "분류되지 않은 카테고리")


# API 기반 챗봇 답변 함수
def handle_api_based(api_key, news_api_key, query):
    # 모델이 질문에서 뉴스의 한글 카테고리 추출
    category_kor = extract_news_category(api_key, query)
    # 뉴스 api 파라미터로 추가하기 위해 카테고리 영어 변환
    category_eng = filter_news_type(category_kor)
    # api 요청 결과 저장
    news_data = get_news_data(news_api_key, category_eng)
    # 뉴스 정렬 및 내용 정제
    articles = sort_shorten_news(news_data)

    # 챗봇 답변 앞부분 문자열
    header = f"오늘 {datetime.today().strftime("%Y년 %m월 %d일")} {'주요' if category_kor == '전체' else category_kor} 뉴스를 알려드릴게요!"

    # answer JSON 데이터 생성
    answer = {'header': header, 'articles': articles}
    # JSON 문자열로 변환
    result = json.dumps(answer, ensure_ascii=False)

    # 출력 파서 정의
    output_parser = JsonOutputParser(pydantic_object=ApiBased)

    try:
        # 출력 파싱
        output_data = {
            "type": "NEWS",
            "answer": result
        }

        # JSON 파서를 사용하여 데이터를 파싱
        parsed_output = output_parser.parse(json.dumps(output_data))

        return parsed_output
    except Exception as e:
        return f"파싱 에러 발생: {e}"
