from config import API_KEY
from ai.modules.daily_conversation import handle_daily_conversation

def main():
    query = input("질문을 입력해주세요: ")
    api_key = API_KEY
    gender = "MALE"

    # 사용자의 입력을 분석하여 적절한 모듈 호출
    response = handle_daily_conversation(api_key, query, gender)

    print(response)

if __name__ == "__main__":
    main()
