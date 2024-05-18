# 필요한 라이브러리 불러오기
from datetime import datetime, timedelta
import numpy as np
from urllib.request import urlopen
from urllib import parse
from urllib.request import Request
from urllib.error import HTTPError
import ssl
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import re
import time
import pandas as pd
import json
from selenium.common.exceptions import NoSuchElementException, NoSuchWindowException
import os
from dotenv import load_dotenv

# dday 기준 마감일 계산 함수
def calculate_dday(dday_element):
    current_date = datetime.now()
    if dday_element == '채용시까지':
        return '9999-12-31'
    elif dday_element == '오늘접수마감':
        return current_date.strftime('%Y-%m-%d')
    else:
        days_to_add = int(dday_element.replace('D-', '').replace('D', ''))  # 'D-' 또는 'D'를 제거
        deadline_date = current_date + timedelta(days=days_to_add)
        return deadline_date.strftime('%Y-%m-%d')

# 채용 정보 내용 추출 함수
def get_content(driver, soup):
    try:
        driver.find_element(By.CSS_SELECTOR, 'p.tit')

        time.sleep(3)

        province_element = province
        title_element = soup.find('p', class_='tit').text.strip() if soup.find('p', class_='tit') else '제목 없음'
        dday_element = soup.find('span', class_='d-day')
        if dday_element:
            dday_element = dday_element.text.strip()
            deadline_element = calculate_dday(dday_element)
        else:
            dday_element = '마감일 정보 없음'
            deadline_element = '9999-12-31'  # 기본값 설정

        career_element = ' '.join(
            soup.find('strong', string='경력').find_next_sibling('span').text.strip().split()) if soup.find('strong',
                                                                                                          string='경력') else '경력 정보 없음'
        scholarship_element = soup.find('strong', string='학력').find_next_sibling('span').text.strip() if soup.find(
            'strong', string='학력') else '학력 정보 없음'
        address_element = ' '.join(
            soup.find('strong', string='지역').find_next_sibling('span').text.split()) if soup.find('strong',
                                                                                                  string='지역') else '지역 정보 없음'
        latitude_element = ''

        longitude_element = ''

        pay_element = ' '.join(
            soup.find('strong', string='임금').find_next_sibling('span').text.strip().split()) if soup.find('strong',
                                                                                                          string='임금') else '임금 정보 없음'
        companyImageUrl_element = 'https://www.work.go.kr/' + soup.find('img', id='logoImg')['src'] if soup.find('img',
                                                                                                                 id='logoImg') else '이미지 정보 없음'
        companyName_element = soup.find('strong', string='기업명').find_next_sibling('div').text.strip() if soup.find(
            'strong', string='기업명') else '기업명 정보 없음'
        employmentType_element = soup.find('strong', string='고용형태').find_next_sibling('span').text.strip() if soup.find(
            'strong', string='고용형태') else '고용형태 정보 없음'
        workType_element = ' '.join(
            soup.find('strong', string='근무형태').find_next_sibling('span').text.strip().split()) if soup.find('strong',
                                                                                                            string='근무형태') else '근무형태 정보 없음'
        content_element = '\n'.join(
            [str(item).strip() for item in soup.find('caption', string='직무내용 표').find_next('td').contents if
             isinstance(item, str)]) if soup.find('caption', string='직무내용 표') else '직무내용 정보 없음'
        occupation_element = soup.find('caption', string='모집요강 표2. 모집직종, 직종키워드, 관련직종 항목으로 구성').find_next(
            'td').text.strip() if soup.find('caption', string='모집요강 표2. 모집직종, 직종키워드, 관련직종 항목으로 구성') else '모집요강 정보 없음'
        worknetUrl_element = driver.current_url
        worknetId_element = next((param.split('=')[1] for param in driver.current_url.split('?')[1].split('&') if
                                  param.startswith('wantedAuthNo=')), None)

        return (province_element, title_element, dday_element, deadline_element, career_element,
                scholarship_element, address_element, latitude_element, longitude_element, pay_element,
                companyImageUrl_element, companyName_element, employmentType_element, workType_element,
                occupation_element, content_element, worknetUrl_element, worknetId_element)

    except NoSuchElementException:
        # 요소를 찾지 못한 경우, None 리턴
        print('No such element')
        return None

# 추출 정보 리스트 저장 함수
def save_content(province_element, title_element, dday_element, deadline_element, career_element,
                 scholarship_element, address_element, latitude_element, longitude_element, pay_element,
                 companyImageUrl_element, companyName_element, employmentType_element, workType_element,
                 occupation_element, content_element, worknetUrl_element, worknetId_element,
                 provinces, titles, ddays, deadlines, careers, scholarships, addresses,
                 latitudes, longitudes, pays, companyImageUrls, companyNames, employmentTypes,
                 workTypes, occupations, contents, worknetUrls, worknetIds):
    if (province_element and title_element and dday_element and deadline_element and career_element
            and scholarship_element and address_element and pay_element and companyImageUrl_element
            and companyName_element and employmentType_element and workType_element and occupation_element
            and content_element and worknetUrl_element and worknetId_element):
        provinces.append(province_element)
        titles.append(title_element)
        ddays.append(dday_element)
        deadlines.append(deadline_element)
        careers.append(career_element)
        scholarships.append(scholarship_element)
        addresses.append(address_element)
        latitudes.append(latitude_element)
        longitudes.append(longitude_element)
        pays.append(pay_element)
        companyImageUrls.append(companyImageUrl_element)
        companyNames.append(companyName_element)
        employmentTypes.append(employmentType_element)
        workTypes.append(workType_element)
        occupations.append(occupation_element)
        contents.append(content_element)
        worknetUrls.append(worknetUrl_element)
        worknetIds.append(worknetId_element)
    else:
        print(f"Some elements are missing.")

# 위경도 처리 함수
def geo_latlng(address, client_id, client_secret):
    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE

    add_urlenc = parse.quote(address)
    url = api_url + add_urlenc
    request = Request(url)
    request.add_header('X-NCP-APIGW-API-KEY-ID', client_id)
    request.add_header('X-NCP-APIGW-API-KEY', client_secret)
    try:
        response = urlopen(request, context=ssl_context)
        rescode = response.getcode()
        if rescode == 200:
            response_body = response.read().decode('utf-8')
            response_body = json.loads(response_body)
            if response_body['addresses']:
                latitude = response_body['addresses'][0]['y']
                longitude = response_body['addresses'][0]['x']
                return latitude, longitude
            else:
                return np.nan, np.nan
        else:
          return np.nan, np.nan
    except HTTPError as e:
        print('HTTP Error!')
        return np.nan, np.nan

# 크롬 브라우저 연결
customsService = Service()
customsOptions = Options()
driver = webdriver.Chrome(service=customsService, options=customsOptions)

# worknet (준)고령자(50세 이상) 채용정보 상세검색 페이지 지역별 code 딕셔너리에 저장
region_codes = {
    'SEOUL': '11000', 'BUSAN': '26000','DAEGU': '27000',
    'INCHEON': '28000', 'GWANGJU': '29000', 'DAEJEON': '30000',
    'ULSAN': '31000', 'SEJONG': '36110', 'GYEONGGI': '41000',
    'CHUNGBUK': '43000', 'CHUNGNAM': '44000', 'JEONNAM': '46000',
    'GYEONGBUK': '47000', 'GYEONGNAM': '48000', 'JEJU': '50000',
    'GANGWON': '51000', 'JEONBUK': '52000',}

# 데이터 프레임 저장할 빈 리스트 생성
work = []

# 지역별 채용 정보 크롤링
for idx, (province, region_code) in enumerate(region_codes.items()):
    # 데이터 저장할 빈 리스트 생성
    worknetIds = []
    provinces = []
    titles = []
    deadlines = []
    ddays = []
    careers = []
    scholarships = []
    addresses = []
    latitudes = []
    longitudes = []
    pays = []
    companyImageUrls = []
    companyNames = []
    employmentTypes = []
    workTypes = []
    occupations = []
    contents = []
    worknetUrls = []

    # url 기본값(첫 페이지 page_index = 1)
    base_url = 'https://www.work.go.kr/empInfo/empInfoSrch/list/dtlEmpSrchList.do?careerTo=&keywordJobCd=&occupation=&templateInfo=&shsyWorkSecd=&rot2WorkYn=&payGbn=&resultCnt=10&keywordJobCont=&cert=&cloDateStdt=&moreCon=&minPay=&codeDepth2Info=11000&isChkLocCall=&sortFieldInfo=DATE&major=&resrDutyExcYn=&eodwYn=&sortField=DATE&staArea=&sortOrderBy=DESC&keyword=&termSearchGbn=all&carrEssYns=&benefitSrchAndOr=O&disableEmpHopeGbn=&webIsOut=&actServExcYn=&maxPay=&keywordStaAreaNm=&emailApplyYn=&listCookieInfo=DTL&pageCode=&codeDepth1Info=11000&keywordEtcYn=&publDutyExcYn=&keywordJobCdSeqNo=&exJobsCd=&templateDepthNmInfo=&computerPreferential=&regDateStdt=&employGbn=&empTpGbcd=1&region={}&infaYn=&resultCntInfo=10&siteClcd=all&cloDateEndt=&sortOrderByInfo=DESC&currntPageNo=1&indArea=&careerTypes=&searchOn=Y&tlmgYn=&subEmpHopeYn=&academicGbn=&templateDepthNoInfo=&foriegn=&mealOfferClcd=&station=&moerButtonYn=&holidayGbn=&srcKeyword=&enterPriseGbn=all&academicGbnoEdu=noEdu&cloTermSearchGbn=all&keywordWantedTitle=&stationNm=&benefitGbn=&keywordFlag=&notSrcKeyword=&essCertChk=&isEmptyHeader=&depth2SelCode=&_csrf=099c1a24-0e2c-4d58-a290-4a670e2cd6b6&keywordBusiNm=&preferentialGbn=&rot3WorkYn=&pfMatterPreferential=B&regDateEndt=&staAreaLineInfo1=11000&staAreaLineInfo2=1&pageIndex={}&termContractMmcnt=&careerFrom=&laborHrShortYn=#viewSPL'

    # 지역별 worknet (준)고령자(50세 이상) 채용정보 목록 페이지 열기
    driver.get(base_url.format(region_code, 1))

    # 채용 정보 목록 페이지 내용 추출
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    # 총 페이지수 정보 추출
    paging_info = soup.find('div', {'class': 'paging_direct'}).text
    max_page = int(re.search(r'/ (\d+)', paging_info).group(1))

    # 각 페이지에 대한 처리
    for page_index in range(1, max_page+1):
        # 페이지 URL 구성
        page_url = base_url.format(region_code, page_index)

        driver.get(page_url)

        # 현재 창 핸들 저장
        main_window_handle = driver.current_window_handle

        # 1~10번째 줄 정보 가져오기
        for i in range(1, 11):
            try:
                # 세부 채용 공고 페이지를 열기 위한 클릭 실행
                driver.find_element(By.CSS_SELECTOR, f'#list{i} > td:nth-child(3) > div > div > a').click()

                time.sleep(3)

                # 새 창의 핸들 탐색
                new_window_handle = None

                for handle in driver.window_handles:
                    if handle != main_window_handle:
                        new_window_handle = handle
                        break

                if new_window_handle:
                    # 새 창으로 전환
                    driver.switch_to.window(new_window_handle)

                    # 세부 채용 정보 페이지 내용 추출
                    html = driver.page_source
                    soup = BeautifulSoup(html, 'html.parser')

                    # get_content 함수 호출
                    content = get_content(driver, soup)

                    if content:
                        # save_content 함수 호출
                        save_content(*content, provinces, titles, ddays, deadlines, careers, scholarships, addresses,
                                     latitudes, longitudes, pays, companyImageUrls, companyNames, employmentTypes,
                                     workTypes, occupations, contents, worknetUrls, worknetIds)

                    # 페이지 닫기
                    driver.close()

                # 원래 창으로 전환
                driver.switch_to.window(main_window_handle)

            except NoSuchWindowException:
                print("창이 이미 닫혔습니다. 다음 페이지로 이동합니다.")
                continue
            except NoSuchElementException:
                # 요소를 찾지 못한 경우, 반복문 종료
                break
            except Exception as e:
                print(f"예기치 못한 에러 발생: {str(e)}")
                break

        # 세부 채용 정보를 데이터 프레임으로 변환하여 리스트에 추가
        work.append(pd.DataFrame({
            'worknetId': worknetIds,
            'province': provinces,
            'title': titles,
            'deadline': deadlines,
            'dday': ddays,
            'career': careers,
            'scholarship': scholarships,
            'address': addresses,
            'latitude': latitudes,
            'longitude': longitudes,
            'pay': pays,
            'companyImageUrl': companyImageUrls,
            'companyName': companyNames,
            'employmentType': employmentTypes,
            'workType': workTypes,
            'occupation': occupations,
            'contents': contents,
            'worknetUrl': worknetUrls
        }))

        # 'deadline' 컬럼 기준 오름차순 정렬
        work[idx] = work[idx].sort_values(by='deadline')

# 페이지 닫기
driver.close()

# 리스트 모든 요소 하나의 데이터프레임으로 병합
work = pd.concat(work, ignore_index=True)

# 위경도 정보 추가
load_dotenv()
client_id = os.environ.get('client_id')
client_secret = os.environ.get('client_secret')

api_url = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query='

for idx, row in work.iterrows():
    lat, lng = geo_latlng(row['address'].split(',')[0], client_id, client_secret)
    work.at[idx, 'latitude'] = lat
    work.at[idx, 'longitude'] = lng

# 위경도 결측값 존재 행 제거
work = work.dropna(axis=0)

# 데이터 프레임 -> json 형식 변환
json_data = work.to_json(orient='records', force_ascii=False)

# json 파일 저장
with open('./workData.json', 'w', encoding='utf-8') as file:
    file.write(json_data)

