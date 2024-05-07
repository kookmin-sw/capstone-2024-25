from newsdataapi import NewsDataApiClient
import requests
import xmltodict
import json

# news api 연결 함수
def get_news_data(news_api_key, category="politics, business, world, sports, technology"):
    # news api key 설정
    api = NewsDataApiClient(apikey=news_api_key)

    # news 조회 결과 저장
    response = api.news_api(category=category, country="kr")

    return response


# 날씨 api 연결 함수
def get_weather_data(weather_api_key, base_date, base_time, nx, ny):
    # 기상청 단기예보 api url 정의
    api_url = f"http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey={weather_api_key}&numOfRows=10&pageNo=1&base_date={base_date}&base_time={base_time}&nx={nx}&ny={ny}"

    # 날씨 조회 결과 저장
    response = requests.get(api_url, verify=False)

    # XML을 딕셔너리로 변환
    dict_data = xmltodict.parse(response.content)

    # 딕셔너리를 JSON 문자열로 변환
    response = json.dumps(dict_data)

    return response
