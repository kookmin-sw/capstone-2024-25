import os
import json
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field


# 답변 json 자료구조 정의
class DailyConversation(BaseModel):
    isCorrect: bool = Field( escription="Type of conversation")
    solution: str = Field(description="Answer of the game")
    questionCount: int = Field(description="Number of questions")
    answer: str = Field(description="Answer of the conversation")


# 정답 생성 함수(question="" 일 경우)
def generate_solution(api_key):
    # openAI api key 설정
    os.environ["OPENAI_API_KEY"] = api_key

    # gpt-4 모델 설정
    model = ChatOpenAI(model_name="gpt-4", temperature=2)

    # 모델에 입력할 질문
    query = f"""
                 지금부터 스무고개 게임을 시작할 거야. 너는 게임의 출제자로, 정답을 설정해야 해.
                 정답은 한글 단어로, 글자 수는 3글자 또는 4글자여야 하며, 단어만 포함되어야 해.
                 예를 들어, 3글자로는 '바나나', '충전기', '무지개'가 있고,
                 4글자로는 '사과나무', '운동선수', '단독주택' 등이 있어.
                 글자 수를 엄격하게 준수해야 함을 명심해.
                 답변은 다음과 같은 형식으로 줘: solution: 스무고개 문제의 정답
              """

    # 모델 답변 저장
    result = model.predict(query)

    # 모델 답변에서 스무고개 정답 추출
    solution = result.split(":")[1].strip()

    return solution


# 남은 질문 횟수 계산 함수
def calculate_question_count(qnas):
    question_count = 20 - len(qnas) - 1
    return question_count


# 정답 판별 함수(question!="" 일 경우)
def verify_answer(solution, question, len_qnas):
    if len_qnas > 0:
        if (solution == question) or (solution in question):
            return True
    return False


# 사용자 질문에 대한 답변 생성 함수
def generate_answer(api_key, solution, question):
    # openAI api key 설정
    os.environ["OPENAI_API_KEY"] = api_key

    # gpt-4 모델 설정
    model = ChatOpenAI(model_name="gpt-4")

    # 모델에 입력할 질문
    query = f"""
                너는 스무고개 게임의 출제자야. 정답은 '{solution}'야.
                참여자가 '{question}'이라고 물어봤어.
                이 질문에 대한 답변을 생성해야 해:
                - 만약 질문이 정답과 직접적으로 관련이 있다면, 예, ~~~가 맞아요!
                - 만약 질문이 정답과 관련이 없다면, 아니요, ~~~가 아니예요!
                라고 답변을 해야 하고 ~~~은 질문에서 추출해야해
                - 답변하기 애매한 경우에는 더 적절한 답변을 제시해.
             """

    # 모델 답변 저장
    answer = model.predict(query)

    return answer


def handle_twenty_questions(api_key, solution, qnas, query):
    # 게임 첫 시작일 경우, 모델이 정답 생성
    if solution == "" and qnas == "" and query == "":
        question_count = 19
        is_correct = False
        solution = generate_solution(api_key)
        answer = f"""스무번 안에 제가 생각한 {len(solution)}글자 단어를 맞춰보세요. 저는 예/아니오 로만 답변할 수 있어요. 만약 설명이 더 필요한 부분에 있다면 부연설명을 할 수도 있어요. \n 이제부터 스무고개를 시작할게요. 질문을 던져주세요!"""
    else:
        question_count = calculate_question_count(qnas)
        is_correct = verify_answer(solution, query, question_count)
        solution = solution
        answer = generate_answer(api_key, solution, query)

    # 출력 파서 정의
    output_parser = JsonOutputParser(pydantic_object=DailyConversation)


    try:
        # 출력 파싱
        output_data = {
            "isCorrect": is_correct,
            "solution": solution,
            "questionCount": question_count,
            "answer": answer,
        }

        # JSON 파서를 사용하여 데이터를 파싱
        parsed_output = output_parser.parse(json.dumps(output_data))

        return parsed_output
    except Exception as e:
        return f"파싱 에러 발생: {e}"

