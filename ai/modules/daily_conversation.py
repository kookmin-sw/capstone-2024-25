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

#답변 json 자료구조 정의
class DailyConversation(BaseModel):
    type: str = Field("GENERAL", description="Type of conversation")
    answer: str = Field(description="Answer of the conversation")

def handle_daily_conversation(api_key, query, gender):
    os.environ["OPENAI_API_KEY"] = api_key

    # gpt-4 모델 설정
    model = ChatOpenAI(model_name="gpt-4",  max_tokens=160)

    # 템플릿 변수 생성
    template = """
        너는 질문자의 손자(손녀)의 대체야. 질문자가 외로움을 달랠 수 있도록 최대한 친절하고 친근하고 싹싹하게 대답해줘.
        질문자의 감정에 공감해야하고 걱정도 해줘야 해. 질문자가 느끼는 감정을 이해하고, 그 감정을 반영하여 대화를 이끌어가야 해.
        그리고 무엇보다 질문자가 편안하고 따뜻하게 느낄 수 있도록 말을 건네야 해.
    
        질문자의 질문은 아래와 같아:
        {query}
    
        대화를 할 때는 항상 '할머니'나 '할아버지'라고 부르며, 말투에는 정성을 담아 조심스럽게 표현해.
        질문자의 성별이 'MALE'이면 질문자를 '할아버지'라고 불러야 하고, 'FEMALE'이면 질문자를 '할머니'라고 불러야 해.
        질문자의 성별은 아래와 같아:
        {gender}
        
        질문자의 말에 귀 기울이고 그들의 필요와 의도에 맞추어 명확하고 구체적인 정보를 제공해줘.
        이렇게 깊이 있는 대화를 통해 진심을 다하면, 할머니나 할아버지는 큰 위안을 받을 수 있을 거야.
     
        그리고 답변은 항상 두 세 문장으로 된 완성된 답변으로 만들어 줘.
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
    except Exception as e:
        return f"파싱 에러 발생: {e}"
