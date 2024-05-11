from config import API_KEY
from ai.modules.twenty_questions import handle_twenty_questions


def twenty_questions_main():
    api_key = API_KEY
    # 함수 실행을 위한 임시값: 초기 실행
    solution_first = ""
    qnas_first = ""
    question_first = ""

    # 함수 실행을 위한 임시값: 초기 실행 X
    solution_second = "무지개"
    qnas_second = [{"question": question_first, "answer": """스무번 안에 제가 생각한 세글자 단어를 맞춰보세요. 
                                                             저는 예/아니오 로만 답변할 수 있어요. 하지만 뭔가 설명이 필요한 부분에 대해서는 부연설명을 할 수도 있어요. 
                                                             이제부터 스무고개를 시작할게요. 질문을 던져주세요!
                                                          """
                   }]
    question_second = "무지개"

    # 함수 초기 실행 경우의 결과 저장
    init_response = handle_twenty_questions(api_key, solution_first, qnas_first, question_first)
    # 함수 초기 실행이 아닌 경우의 결과 저장
    not_init_response = handle_twenty_questions(api_key, solution_second, qnas_second, question_second)

    print(init_response)
    print(not_init_response)


if __name__ == "__main__":
    twenty_questions_main()
