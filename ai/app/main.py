import os
from langchain_openai import ChatOpenAI
from config import API_KEY, DB_URI, NEWS_API_KEY, WEATHER_API_KEY
from ai.modules.daily_conversation import handle_daily_conversation
from ai.modules.data_based import handle_data_based
from ai.modules.api_based import handle_news_api_based
from ai.modules.api_based import handle_weather_api_based


# 질문 분류 함수
def classify_query(query):
    # openAI api key 설정
    os.environ["OPENAI_API_KEY"] = API_KEY

    # gpt-4 모델 설정
    model = ChatOpenAI(model_name="gpt-4")

    # 모델에 입력할 질문
    query = f"""
                사용자의 질문에 가장 잘 맞는 카테고리를 분류해야해. 각 카테고리에는 특정 주제가 있어.
                '뉴스' 카테고리에는 정치, 경제, 세계, 스포츠, IT/과학 등의 소주제가 포함돼.
                '문화' 카테고리에는 교육, 공원, 쇼핑 등이 있어.
                '방문서비스' 카테고리에는 간호, 목욕, 요양 서비스가 있어.
                '날씨' 카테고리는 지역의 기상 조건에 관한 정보를 제공해.
                '일상대화' 카테고리는 일반적인 대화를 포함해.
            
                사용자의 질문을 분석하여 가장 적절한 카테고리를 선택해야해.
                질문의 내용과 맥락을 고려하여 가장 유사한 카테고리를 선택해줘.
                뉴스, 문화, 방문서비스, 날씨 카테고리의 세부 내용을 참고하여 그 내용을 제공할 수 있으면 해당 카테고리로 분류해줘.
                예를 들어, '산책 가고싶어.'라는 질문에는 공원데이터를 제공할 수 있으므로 문화 카테고리로 분류해야해.
                그리고 '정치권에 어떤 소식이 있는지 궁금해.'라는 질문에는 정치 뉴스 데이터를 제공할 수 있으므로 뉴스 카테고리로 분류해야해.
                위의 네가지 카테고리에 제공할 수 있는 내용이 없다면, 일상대화로 분류해줘.
            
                사용자 질문: '{query}'
                이에 대한 답변은 category: 선택된 카테고리 형식으로 제공해줘.
            """

    # 모델 답변 저장
    result = model.predict(query)

    # 모델 답변에서 한글 카테고리 추출
    category = result.split(":")[1].strip()

    return category

def main():
    query = input("질문을 입력해주세요: ")
    api_key = API_KEY
    news_api_key = NEWS_API_KEY
    weather_api_key = WEATHER_API_KEY
    db_uri = DB_URI
    # 함수 실행을 위한 임시 값
    gender = "MALE"
    address = "경기도 남양주시 경춘로 1037"

    # 질문 분류
    category = classify_query(query)

    # 카테고리에 따른 함수 실행
    if category == "문화" or category == "방문서비스":
        response = handle_data_based(api_key, query, db_uri, address)
    elif category == "뉴스":
        response = handle_news_api_based(api_key, news_api_key, query)
    elif category == "날씨":
        response = handle_weather_api_based(api_key, weather_api_key, gender, address)
    else:
        response = handle_daily_conversation(api_key, query, gender)

    print(response)


if __name__ == "__main__":
    main()
