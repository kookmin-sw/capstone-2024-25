import psycopg2
import os
from dotenv import load_dotenv

# 환경 변수 파일 로드
load_dotenv()

# RDS 정보 환경변수에서 로드
db_name = os.getenv("RDS_DB_NAME")
user = os.getenv("RDS_USER")
password = os.getenv("RDS_PASSWORD")
host = os.getenv("RDS_HOST")
port = os.getenv("RDS_PORT")

# 영/한 테이블명 딕셔너리
table_name_dict = {
    "culture_education": "문화생활_교육_장소",
    "culture_park": "문화생활_공원_장소",
    "culture_shopping": "문화생활_쇼핑_장소",
    "visit_bath": "방문목욕서비스_기관",
    "visit_care": "방문간호서비스_기관",
    "visit_recuperation": "방문요양서비스_기관"
}


# RDS 데이터베이스 연결 함수
def connect_database():
    try:
        conn = psycopg2.connect(
            dbname=db_name,
            user=user,
            password=password,
            host=host,
            port=port
        )
        print("데이터베이스 연결 성공!")
        return conn
    except Exception as e:
        print(f"데이터베이스 연결 실패: {e}")
        return None


# 기존 영문 테이블명을 한글명으로 변경하는 함수
def rename_tables(cursor):
    for eng_name, kor_name in table_name_dict.items():
        rename_query = f"ALTER TABLE {eng_name} RENAME TO {kor_name};"
        try:
            cursor.execute(rename_query)
            print(f"테이블 이름이 '{eng_name}'에서 '{kor_name}'로 변경되었습니다.")
        except Exception as e:
            print(f"테이블 이름 변경 실패: {e}")


def main():
    # 데이터베이스 연결
    conn = connect_database()
    if conn:
        cur = conn.cursor()
        # 테이블 이름 변경 실행
        rename_tables(cur)
        # 변경사항 커밋
        conn.commit()
        # 리소스 정리
        cur.close()
        conn.close()


if __name__ == "__main__":
    main()
