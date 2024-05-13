import os
import json
from langchain_openai import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate
)
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field


# 답변 json 자료구조 정의
class DailyConversation(BaseModel):
    type: str = Field("GENERAL", description="Type of conversation")
    answer: str = Field(description="Answer of the conversation")


def handle_daily_conversation(api_key, query, gender, previous_qnas):
    # openAI api key 설정
    os.environ["OPENAI_API_KEY"] = api_key

    # gpt-4 모델 설정
    model = ChatOpenAI(model_name="gpt-4",  max_tokens=160)

    # 이전 대화를 문자열로 변환
    qna_text = '\n'.join([f"질문: {qna.question} 답변: {qna.answer}" for qna in previous_qnas])

    # 템플릿 변수 생성
    template = f"""
        너는 질문자의 손자(손녀)야. 질문자가 외로움을 달랠 수 있도록 최대한 친절하게 대답해줘.
        질문자의 감정에 공감해야 하며, 그 감정을 반영하여 대화를 이끌어가야 해.
    
        이전 대화 내용:
        {qna_text}

        현재 질문:
        {query}
    
        대화를 할 때는 가끔 '할머니'나 '할아버지'라고 부르며, 말투에는 정성을 담아 조심스럽게 표현해.
        질문자의 성별이 'MALE'이면 질문자를 '할아버지'라고, 'FEMALE'이면 '할머니'라고 불러.
        질문자의 성별은 {gender}야.
        
        질문자의 말에 귀 기울이고 그들의 필요와 의도에 맞추어 명확하고 구체적인 정보를 제공해줘.
        그리고 답변은 항상 간단한 두 세 문장으로 된 완성된 답변으로 만들어 줘.
        답변의 마지막 문장은 질문자의 다음 질문을 유도할 수 있는 문장으로 마무리해줘.
    """

    # 프롬프트 템플릿 설정
    system_message_prompt = SystemMessagePromptTemplate.from_template(template)
    human_template = "{query} {gender}"
    human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)

    chat_prompt = ChatPromptTemplate(
        messages=[system_message_prompt, human_message_prompt]
    )

    # 모델 호출
    result = model.invoke(chat_prompt.format_prompt(query=query, gender=gender).to_messages())

    # 출력 파서 정의
    output_parser = JsonOutputParser(pydantic_object=DailyConversation)

    try:
        # 출력 파싱
        output_data = {
            "type": "GENERAL",
            "answer": result.content.strip()
        }

        # JSON 파서를 사용하여 데이터를 파싱
        parsed_output = output_parser.parse(json.dumps(output_data))

        return parsed_output
    except Exception:
        # 출력 파싱
        output_data = {
            "type": "GENERAL",
            "answer": "죄송해요. 질문을 명확히 이해하지 못했어요. 다시 질문해주세요."
        }

        # JSON 파서를 사용하여 데이터를 파싱
        parsed_output = output_parser.parse(json.dumps(output_data))

        return parsed_output
