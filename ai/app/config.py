import os
from dotenv import load_dotenv

# 환경변수 파일(.env) 로드
load_dotenv()

# api_key 정의
API_KEY = os.getenv("API_KEY")

# RDS DB 연결
DB_URI = os.getenv("DB_URI")

# News api_key 정의
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

# 기상청 단기 예보 api_key 정의
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")