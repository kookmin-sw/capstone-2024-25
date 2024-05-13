import os
import json
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_core.prompts.few_shot import FewShotPromptTemplate
from langchain_core.prompts.prompt import PromptTemplate


# 답변 json 자료구조 정의
class DailyConversation(BaseModel):
    isCorrect: bool = Field( escription="Type of conversation")
    solution: str = Field(description="Answer of the game")
    questionCount: int = Field(description="Number of questions")
    answer: str = Field(description="Answer of the conversation")


# 정답 생성 함수(question="" 일 경우)
def generate_solution(api_key):
    try:
        # 예시 설정
        examples = [
            {"input": "길이가 3인 한글로 된 단어를 만들어줘", "output": "바나나"},
            {"input": "길이가 3인 한글로 된  단어를 만들어줘", "output": "가래떡"},
            {"input": "길이가 3인 한글로 된  단어를 만들어줘", "output": "고무줄"},
            {"input": "길이가 3인 한글로 된  단어를 만들어줘", "output": "고추장"},
            {"input": "길이가 3인 한글로 된  단어를 만들어줘", "output": "도라지"},
            {"input": "길이가 4인 한글로 된  단어를 만들어줘", "output": "계란말이"},
            {"input": "길이가 4인 한글로 된  단어를 만들어줘", "output": "사과나무"},
            {"input": "길이가 4인 한글로 된  단어를 만들어줘", "output": "기말고사"},
            {"input": "길이가 4인 한글로 된  단어를 만들어줘", "output": "비빔국수"},
            {"input": "길이가 4인 한글로 된  단어를 만들어줘", "output": "홍길동전"},
        ]

        # 프롬프트 템플릿 생성
        example_prompt = PromptTemplate(
            input_variables=["input", "output"],
            template="{input}\nSolution: {output}"
        )

        # Few-shot 프롬프트 템플릿 생성
        few_shot_prompt = FewShotPromptTemplate(
            examples=examples,
            example_prompt=example_prompt,
            input_variables=["input"],
            suffix="지금부터 스무고개 게임을 시작할 거야. 너는 게임의 출제자로, 정답을 설정해야 해. \
                    정답의 길이는 3 또는 4여야 하며, 한자나 특수문자 없이 오직 한글로만 이루어진 단어만 포함되어야 해. \
                    글자 수를 엄격하게 준수해야 함을 명심해. 답변은 다음과 같은 형식으로 줘: solution: 스무고개 문제의 정답"
        )

        # openAI api key 설정
        os.environ["OPENAI_API_KEY"] = api_key

        # gpt-4 모델 설정
        model = ChatOpenAI(model_name="gpt-4", temperature=1)

        # 질문 설정 및 모델 호출
        formatted_prompt = few_shot_prompt.format()
        result = model.invoke(formatted_prompt)

        # 모델 답변에서 정답 추출
        solution = result.content.split("Solution: ")[1].strip().split("\n")[0]

        return solution
    except Exception:
        return None


# 남은 질문 횟수 계산 함수
def calculate_question_count(qnas):
    # 총 질문 횟수 - 이전 질문 횟수 - 1
    question_count = 20 - len(qnas) - 1
    return question_count


# 정답 판별 함수(question!="" 일 경우)
def verify_answer(solution, question, len_qnas):
    # 남은 질문 횟수가 0보다 큰 경우
    if len_qnas > 0:
        # question이 solution과 같거나 solution이 question에 포함되는 경우, True
        if solution in question:
            return True
    return False


# 사용자 질문에 대한 답변 생성 함수
def generate_answer(api_key, solution, question):
    try:
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
        answer = model.invoke(query).content

        return answer
    except Exception:
        return "죄송해요. 답변 처리 중 문제가 발생했어요. 다시 질문해주세요."


def handle_twenty_questions(api_key, solution, qnas, query):
    # 게임 첫 시작일 경우, 모델이 정답 생성
    if solution == "" and qnas == [] and query == "":
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

