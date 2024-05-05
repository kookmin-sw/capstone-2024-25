import os
from dotenv import load_dotenv

# 환경변수 파일(.env) 로드
load_dotenv()

# 설정 변수 정의
API_KEY = os.getenv("API_KEY")
