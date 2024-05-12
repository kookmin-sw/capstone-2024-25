from newsdataapi import NewsDataApiClient
import requests
import json


# news api 연결 함수
def get_news_data(news_api_key, page, category="politics, business, world, sports, technology"):
    try:
        # news api key 설정
        api = NewsDataApiClient(apikey=news_api_key)

        if page == "": # 첫 번째 호출
            # news 조회 결과 저장
            response = api.news_api(category=category, country="kr")
        else:
            # news 조회 결과 저장
            response = api.news_api(category=category, country="kr", page=page)

        return response
    except Exception:
        return None


# 날씨 api 연결 함수
def get_weather_data(weather_api_key, base_date, base_time, nx, ny):
    try:
        # 기상청 단기예보 api url 정의
        api_url = f"http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey={weather_api_key}&dataType=json&numOfRows=12&pageNo=1&base_date={base_date}&base_time={base_time}&nx={nx}&ny={ny}"

        # 날씨 조회 결과 저장
        response = requests.get(api_url, verify=False)

        # 바이트 문자열을 UTF-8 문자열로 디코드
        decoded_data = response.content.decode("UTF-8")

        # 문자열을 JSON 딕셔너리로 파싱
        response = json.loads(decoded_data)

        return response
    except Exception:
        return None
