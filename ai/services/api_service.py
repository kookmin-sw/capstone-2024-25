from newsdataapi import NewsDataApiClient

# news api 연결 함수
def get_news_data(news_api_key, category="politics, business, world, sports, technology"):
    # news api key 설정
    api = NewsDataApiClient(apikey=news_api_key)

    # news 조회 결과 저장
    response = api.news_api(category=category, country="kr")

    return response
