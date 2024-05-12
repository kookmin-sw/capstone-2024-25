import boto3
import psycopg2
import psycopg2.extensions
import os
import csv
from dotenv import load_dotenv

# 환경 변수 파일 로드
load_dotenv()

# S3 및 RDS 정보 환경변수에서 로드
bucket_name = os.getenv("S3_BUCKET_NAME")
region_name = os.getenv("S3_REGION_NAME")
db_name = os.getenv("RDS_DB_NAME")
user = os.getenv("RDS_USER")
password = os.getenv("RDS_PASSWORD")
host = os.getenv("RDS_HOST")
port = os.getenv("RDS_PORT")

# 파일과 테이블 목록
files_to_tables = [
    'culture_education.csv', 'culture_park.csv', 'culture_shopping.csv',
    'visit_bath.csv', 'visit_care.csv', 'visit_recuperation.csv'
]


# RDS 데이터 베이스 연결 함수
def connect_database(host, port, user, password, dbname=None):
    conn_str = f"host={host} port={port} user={user} password={password}"
    if dbname:
        conn_str += f" dbname={dbname}"
    print(f"데이터베이스 연결 문자열: {conn_str}")
    return psycopg2.connect(conn_str)


# RDS 데이터 베이스 존재 여부 확인 및 생성 함수
def ensure_database():
    try:
        # 'postgres' 데이터베이스에 접속하여 현재 데이터베이스 리스트 확인
        conn = connect_database(host, port, user, password, 'postgres')
        conn.autocommit = True
        cur = conn.cursor()
        cur.execute(f"SELECT 1 FROM pg_database WHERE datname='{db_name}'")
        if not cur.fetchone():
            # 데이터베이스가 존재하지 않으면 생성
            try:
                cur.execute(f"CREATE DATABASE {db_name}")
                print(f"{db_name} 데이터베이스가 생성되었습니다.")
            except psycopg2.Error as e:
                if "already exists" in str(e):
                    print(f"{db_name} 데이터베이스는 이미 존재합니다.")
                else:
                    raise
        else:
            # 데이터베이스가 이미 존재할 경우 메시지 출력
            print(f"{db_name} 데이터베이스는 이미 존재합니다.")
        cur.close()
        conn.close()
        return True  # 데이터베이스가 존재하거나 성공적으로 생성된 경우 True 반환
    except psycopg2.Error as e:
        print(f"데이터베이스 접속 또는 생성 실패: {e}")
        return False


# S3 버킷의 csv 파일 문자열 변환 함수
def load_csv_from_s3(bucket, key):
    s3 = boto3.client('s3', region_name=region_name)
    response = s3.get_object(Bucket=bucket, Key=key)
    return response['Body'].read().decode('utf-8')


# S3 버킷의 csv 파일 내용으로 PostgreSQL 테이블 생성 및 데이터 삽입 함수
def create_table_from_csv(cur, table_name, csv_content):
    reader = csv.reader(csv_content.splitlines())
    headers = next(reader)
    create_table_sql = f"CREATE TABLE IF NOT EXISTS {table_name} ("
    create_table_sql += ", ".join([f"{header} TEXT" for header in headers]) + ");"
    cur.execute(create_table_sql)

    for row in reader:
        insert_sql = f"INSERT INTO {table_name} VALUES ({', '.join(['%s'] * len(row))});"
        cur.execute(insert_sql, tuple(row))


def main():
    if ensure_database():
        # 데이터베이스 생성 확인 후 올바른 데이터베이스 이름으로 연결
        conn = connect_database(host, port, user, password, db_name)
        cur = conn.cursor()
        for file_name in files_to_tables:
            table_name = file_name[:-4]  # '.csv' 확장자 제거
            csv_content = load_csv_from_s3(bucket_name, file_name)
            create_table_from_csv(cur, table_name, csv_content)
            print(f"테이블이 생성되었습니다.")
        conn.commit()
        cur.close()
        conn.close()
        print("모든 테이블이 성공적으로 생성되었습니다.")
    else:
        print("데이터베이스 생성 실패로 인해 프로세스를 중단합니다.")


if __name__ == "__main__":
    main()