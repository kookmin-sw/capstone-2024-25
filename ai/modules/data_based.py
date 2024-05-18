import os
import json
import re
from sqlalchemy import create_engine
from langchain_openai import ChatOpenAI
from langchain_community.utilities import SQLDatabase
from langchain.agents import create_sql_agent
from langchain.agents.agent_types import AgentType
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field


# 답변 json 자료구조 정의
class DataBased(BaseModel):
    type: str = Field(description="Type of conversation")
    answer: str = Field(description="Answer of the conversation")


# 질문-답변 타입 설정 함수
def filter_type(table_name):
    category_map = {
        "문화생활 교육 장소": "EDUCATION",
        "문화생활 공원 장소": "PARK",
        "문화생활 쇼핑 장소": "SHOPPING",
        "방문목욕서비스 기관": "BATH",
        "방문간호서비스 기관": "CARE",
        "방문요양서비스 기관": "RECUPERATION",
    }
    return category_map.get(table_name, "GENERAL")


# 쿼리문 내부 테이블명 추출 함수
def extract_table_name(result):
    try:
        # 정규 표현식을 사용하여 테이블 이름을 추출
        pattern = r"table_name:\s*([\w\(\)_]+)"  # 괄호, 언더바, 알파벳, 숫자를 포함하도록 수정
        match = re.search(pattern, result)
        if match:
            # 테이블 이름 추출
            table_name = match.group(1).strip()
            # 추출한 테이블 이름 부분을 결과 문자열에서 삭제
            updated_result = re.sub(pattern, "", result, count=1).strip()
            # 테이블 이름에서 공백 대신 사용된 언더바를 공백으로 변환
            normalized_table_name = table_name.replace('_', ' ')
            return normalized_table_name, updated_result
        else:
            print("참고한 테이블이 없습니다.")
            return None, result
    except Exception as e:
        print(f"오류 발생: {e}")
        return None, None


# 데이터 기반 챗봇 답변 함수
def handle_data_based(api_key, query, db_uri, address):
    # 데이터베이스 엔진 생성
    engine = create_engine(db_uri)

    # openAI api key 설정
    os.environ["OPENAI_API_KEY"] = api_key

    # gpt-4 모델 설정
    model = ChatOpenAI(model_name="gpt-4", temperature=0)

    # 사용자가 입력한 주소에서 00도 00시(구)만 추출
    address = " ".join(address.split()[:2])

    # SQLDatabase 인스턴스 생성
    db = SQLDatabase(engine)

    # 챗봇에게 입력할 질문 정의
    query = (f"""{query}
             우리 집 주소는 {address}야. 결과는 집 주변에 있는 최대 3개의 시설만 추출해서
             다음과 같은 형식으로 반환해줘: 시설명: 실제 시설명 \n 주소: 실제 주소 \n 전화번호: 실제 전화번호(전화번호가 없는 테이블을 참조할 경우, 생략 가능)
             여러 시설이 있을 경우 각 시설 정보 앞에 번호를 부여하고 사이에 '\n'을 추가해줘.
             그리고 한 번에 한 테이블만 참고하고, 어떤 테이블을 참고 했는지도 반환값의 첫 줄에 다음과 같은 형식으로 줘: 'table_name:'""")

    # SQL Agent 생성
    agent_executor = create_sql_agent(
        llm=model,
        toolkit=SQLDatabaseToolkit(db=db, llm=model),
        verbose=True,
        agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    )

    # 모델 답변 결과 저장
    result = agent_executor.run(query)

    # 답변 결과에서 참고한 테이블명과 실제 결과 분리
    table_name, result = extract_table_name(result)

    # 테이블 명으로 질문-답변 카테고리 설정
    category_eng = filter_type(table_name)

    # 최종 답변 결과 저장
    answer = f"등록하신 주소를 기준으로 {table_name}을(를) 소개해 드릴게요!\n" + result

    # 출력 파서 정의
    output_parser = JsonOutputParser(pydantic_object=DataBased)

    try:
        # 출력 파싱
        output_data = {
            "type": category_eng,
            "answer": answer
        }

        # JSON 파서를 사용하여 데이터를 파싱
        parsed_output = output_parser.parse(json.dumps(output_data))

        return parsed_output
    except Exception as e:
        return f"파싱 에러 발생: {e}"
