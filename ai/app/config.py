import os
from dotenv import load_dotenv

# 환경변수 파일(.env) 로드
load_dotenv()

# api_key 정의
API_KEY = os.getenv("API_KEY")

# RDS DB 연결
DB_URI = os.getenv("DB_URI")