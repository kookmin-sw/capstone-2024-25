from config import API_KEY, DB_URI
from ai.modules.daily_conversation import handle_daily_conversation
from ai.modules.dataBased import hadle_data_based

def main():
    query = input("질문을 입력해주세요: ")
    api_key = API_KEY
    db_uri = DB_URI
    # 함수 실행을 위한 임시 값
    gender = "MALE"
    address = "경기도 남양주시 경춘로 1037"

    # 사용자의 입력을 분석하여 적절한 모듈 호출
    if "교육" in query:
        response = hadle_data_based(api_key, query, db_uri, address)
    else:
        response = handle_daily_conversation(api_key, query, gender)

    print(response)

if __name__ == "__main__":
    main()
