from ai.services.api_service import get_news_data
from ai.services.api_service import get_weather_data
import os
import json
import pandas as pd
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field


# 답변 json 자료구조 정의
class ApiBased(BaseModel):
    type: str = Field(description="Type of conversation")
    answer: str = Field(description="Answer of the conversation")


def sort_shorten_news(news_api_key, page, category_eng):
    try:
        top_articles = []
        while len(top_articles) < 6:
            # API 요청 결과 저장
            news_data = get_news_data(news_api_key, page, category_eng)

            # 'results' 키에서 뉴스 목록을 추출
            articles = news_data["results"]
            next_page = news_data["nextPage"]

            # 각 뉴스의 'description'을 기준으로 내림차순 정렬
            sorted_articles = sorted(articles, key=lambda x: x["description"] if x["description"] is not None else "", reverse=True)

            # 상위 6개 뉴스의 'title', 'category', 'description', 'link' 추출
            for article in sorted_articles:
                if len(top_articles) < 6:
                    article_details = {}
                    for key in ["title", "category", "description", "link"]:
                        if key == "category":
                            article_details[key] = article[key][0] if article[key] else "Unknown"
                        else:
                            article_details[key] = article[key]
                    # 뉴스 description 100자 이후 삭제 및 '...' 추가
                    if article["description"]:
                        description = article["description"][:101] + "..."

                    article_details["description"] = description

                    top_articles.append(article_details)
                else:
                    break

            # 다음 페이지가 없거나 6개의 기사가 수집되면 반복 중단
            if not next_page or len(top_articles) == 6:
                break

            # 다음 페이지로 업데이트
            page = next_page

        # 결과 출력
        return top_articles
    except Exception:
        return None


# 뉴스 카테고리 추출 함수(from 질문)
def extract_news_category(api_key, query):
    try:
        # openAI api key 설정
        os.environ["OPENAI_API_KEY"] = api_key

        # gpt-3.5 모델 설정
        model = ChatOpenAI(model_name="gpt-3.5-turbo")

        # 모델에 입력할 질문
        query = (f"""
                 뉴스의 카테고리는 '전체, 정치, 경제, 스포츠, IT/과학, 세계'가 있어.
                 사용자의 질문에서 어떤 뉴스 카테고리를 궁금해하고 있는지 찾아줘.
                 사용자의 질문은 이와 같아: {query}
                 특별하게 궁금한 분야가 없으면 '전체'라고 대답해줘
                 
                 답변은 다음과 같은 형식으로 줘: category: 선택된 카테고리
                 """)

        # 모델 답변 저장
        result = model.invoke(query).content

        # 모델 답변에서 한글 카테고리 추출
        category_kor = result.split(":")[1].strip()

        return category_kor
    except Exception:
        return None


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
    return category_map.get(category, "전체")


# 뉴스 API 기반 챗봇 답변 함수
def handle_news_api_based(api_key, news_api_key, query):
    # 모델이 질문에서 뉴스의 한글 카테고리 추출
    category_kor = extract_news_category(api_key, query)
    # 뉴스 api 파라미터로 추가하기 위해 카테고리 영어 변환
    category_eng = filter_news_type(category_kor)
    # 뉴스 정렬 및 내용 정제
    articles = sort_shorten_news(news_api_key, "", category_eng)

    # 한국 시간대로 현재 시간 가져오기
    kst_now = datetime.now(ZoneInfo("Asia/Seoul"))

    # 챗봇 답변 앞부분 문자열
    header = f"오늘 {kst_now.strftime('%Y년 %m월 %d일')} {'주요' if category_kor == '전체' else category_kor} 뉴스를 알려드릴게요!"
    print(header)

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
    except Exception:
        # 출력 파싱
        output_data = {
            "type": "NEWS",
            "answer": "죄송해요. 뉴스를 불러오지 못했어요. 다시 질문해주세요."
        }

        # JSON 파서를 사용하여 데이터를 파싱
        parsed_output = output_parser.parse(json.dumps(output_data))

        return parsed_output

# -------------------------------------------------------------------------------------------#


# 날씨 기준 날짜, 기준 시간 설정 함수
def get_base_date_time():
    try:
        # base_hours 정의, 각 시작 시간에 따른 베이스 시간 매핑
        base_hours = {
            2: 23, 5: 2, 8: 5, 11: 8, 14: 11, 17: 14, 20: 17, 23: 20
        }

        # 한국 시간대로 현재 시간 가져오기
        kst_now = datetime.now(ZoneInfo("Asia/Seoul"))  # ZoneInfo를 사용하여 한국 시간대 설정

        # 현재 시간 불러오기
        hour = kst_now.hour
        minute = kst_now.minute
        print(hour, minute)

        # 기본값으로 가장 늦은 시간 설정
        base_hour = 23

        # base_date 기본 설정, 동일한 시간대 사용
        base_date = kst_now.date()

        for start_hour, base in base_hours.items():
            if hour < start_hour or (hour == start_hour and minute < 10):
                base_hour = base
                if start_hour == 2 and base == 23:
                    # 만약 start_hour가 2이고 base가 23인 경우, 하루 전 날짜를 사용
                    base_date = base_date - timedelta(days=1)
                break

        # 'base_hour'을 'base_time' 형식으로 변환
        base_time = f"{base_hour:02}00"
        print(base_time)

        # base_date 설정, 한국 시간대의 날짜를 문자열로 변환
        base_date = base_date.strftime("%Y%m%d")
        print(base_date)

        return base_date, base_time
    except Exception as e:
        print("Error:", e)
        return None, None


# 날씨 기준 x좌표, y좌표 변환 함수(from 위경도)
def get_location(address):
    try:
        # 현재 스크립트의 디렉토리 경로 추출
        script_dir = os.path.dirname(os.path.abspath(__file__))

        # 파일의 경로를 현재 스크립트의 디렉토리와 결합하여 설정
        file_path = os.path.join(script_dir, "weather_location_data.xlsx")

        # weather_location_data 불러오기
        data = pd.read_excel(file_path)

        # '2단계', '3단계' 열에서 NaN을 빈 문자열로 대체
        data['2단계'] = data['2단계'].fillna("")
        data['3단계'] = data['3단계'].fillna("")

        # '2단계' 열에서 "시" 다음에 문자가 오면 "시 "로 변환
        data['2단계'] = data['2단계'].str.replace(r'(시)(\w)', r'\1 \2', regex=True)

        # '3단계'가 빈 문자열인 데이터만 필터링
        data = data[(data['2단계'] != "") & (data['3단계'] == "")]

        # 필요한 컬럼만 추출
        data = data[['1단계', '2단계', '격자 X', '격자 Y']]

        # 주소 파싱 개선
        target_part = ""
        for part in address.split():
            if "구" in part:
                target_part = part
                break
            elif "군" in part or "시" in part:
                target_part = part

        # 각 부분마다 검색 시도
        if target_part:
            full_address = (data['1단계'] + " " + data['2단계']).str.contains(target_part, regex=True, case=False)
            match = data[full_address]

            if not match.empty:
                nx = match.iloc[0]['격자 X']
                ny = match.iloc[0]['격자 Y']
                return nx, ny

        return None, None
    except Exception:
        return None, None


# JSON 날씨 데이터 추출 함수
def extract_weather_data(json_data):
    try:
        weather_data = dict()

        for item in json_data['response']['body']['items']['item']:
            # 하늘 상태(SKY): 맑음(1), 구름많음(3), 흐림(4)
            if item['category'] == "SKY":
                weather_data["sky"] = item['fcstValue']
            # 강수 형태(PTY): 없음(0), 비(1), 비와 눈(2), 눈(3), 소나기(4)
            if item['category'] == "PTY":
                weather_data["pty"] = item['fcstValue']
            # 1시간 기온(TMP)
            if item['category'] == "TMP":
                weather_data["tmp"] = item['fcstValue']
            # 강수 확률(POP)
            if item['category'] == "POP":
                weather_data["pop"] = item['fcstValue']
            # 풍속(WSD)
            if item['category'] == "WSD":
                weather_data["wsd"] = item['fcstValue']

        return weather_data
    except Exception:
        return None


def reform_weather_data(data):
    try:
        weather_conditions = {
            "1": "맑음",
            "3": "구름많음",
            "4": "흐림"
        }

        precipitation_types = {
            "0": "",
            "1": "비",
            "2": "비와 눈",
            "3": "눈",
            "4": "소나기"
        }

        # 날씨 상태 문자열 구성
        sky_condition = weather_conditions.get(data["sky"], "")
        pty_condition = precipitation_types.get(data["pty"], "")

        # 기본 날씨 정보 구성
        str_weather = f"날씨: {pty_condition}"
        if pty_condition:  # 강수 상태가 있으면 뒤에 추가
            str_weather += f", {sky_condition}"
        else:
            str_weather = f"날씨: {sky_condition}"

        # 기온, 강수 확률, 풍속 추가
        if data["tmp"] is not None:
            str_weather += f"\n기온: {data['tmp']}ºC"
        if data["pop"] is not None:
            str_weather += f"\n강수 확률: {data['pop']}%"
        if data["wsd"] is not None:
            str_weather += f"\n풍속: {data['wsd']}m/s"

        return str_weather
    except Exception:
        return None


# 날씨 API 기반 챗봇 답변 함수
def handle_weather_api_based(api_key, weather_api_key, address):
    base_date, base_time = get_base_date_time()
    nx, ny = get_location(address)
    weather_api_response = get_weather_data(weather_api_key, base_date, base_time, nx, ny)
    print(weather_api_response)
    weather_data = extract_weather_data(weather_api_response)
    final_weather_data = reform_weather_data(weather_data)

    # openAI api key 설정
    os.environ["OPENAI_API_KEY"] = api_key

    # gpt-4 모델 설정
    model = ChatOpenAI(model_name="gpt-4", max_tokens=160)

    # 모델에 입력할 질문
    query = f"""
             너는 직업이 기상캐스터인 질문자의 동생이야. 최대한 친절하게 대답해. 
             존댓말로 대답하고, 답변에 호칭은 생략해줘.
             지금 날씨는 이라는 말로 시작하고 오늘이라는 단어를 포함하지마.
             해요체로 따뜻하고 친근한 말투를 써서 주소 기반 기상 예보: {final_weather_data}를 해석해줘.
             그리고 답변은 항상 두 세 문장으로 된 완성된 답변으로 만들어 줘.
             """

    # 모델 답변 저장
    answer = model.invoke(query).content

    # 출력 파서 정의
    output_parser = JsonOutputParser(pydantic_object=ApiBased)

    try:
        # 출력 파싱
        output_data = {
            "type": "WEATHER",
            "answer": answer
        }

        # JSON 파서를 사용하여 데이터를 파싱
        parsed_output = output_parser.parse(json.dumps(output_data))

        return parsed_output
    except Exception:
        # 출력 파싱
        output_data = {
            "type": "WEATHER",
            "answer": "죄송해요. 날씨를 불러오지 못했어요. 다시 질문해주세요."
        }

        # JSON 파서를 사용하여 데이터를 파싱
        parsed_output = output_parser.parse(json.dumps(output_data))

        return parsed_output
