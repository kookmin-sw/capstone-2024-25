import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Map,
  MapMarker,
} from 'react-kakao-maps-sdk';
import useKakaoLoader from './map/useKakaoLoader';
import { mapApi } from '../../src/api/apis/mapApis';
import { useAccessToken } from '../components/cookies';
import { useLocation } from 'react-router-dom';
import Layout from '../layouts/Layout';

const mapCategoryList = [
  [
    ['전체', 'ALL', '#379237'],
    ['병원·약국', 'HOSPITAL', '#FF7D31'],
    ['복지주택', 'WELFAREHOUSE', '#00C0EA'],
  ],
  [
    ['복지관', 'WELFARECENTER', '#2D3BB5'],
    ['케어센터', 'CARECENTER', '#8BC34A'],
    ['일자리', 'job', '#CB5CFF'],
  ],
];

export default function Nav5() {
  useKakaoLoader();

  // window.addEventListener('flutterInAppWebViewPlatformReady', function (event) {
  //   window.flutter_inappwebview
  //     .callHandler('test')
  //     .then(function (result) {
  //       // print to the console the data coming
  //       // from the Flutter side.
  //       console.log(JSON.stringify(result));

  //       window.flutter_inappwebview.callHandler(
  //         'handlerFooWithArgs',
  //         1,
  //         true,
  //         ['bar', 5],
  //         { foo: 'baz' },
  //         result,
  //       );
  //     });
  // });

  function callFlutter() {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('test');
    } else {
      console.error("Flutter WebView is not initialized.");
    }
  };

  // 지도 관련 동작
  const [centerState, setCenterState] = useState({
    center: {
      lat: 37.61074948136638,
      lng: 126.99701001237902,
    },
    errMsg: null,
    isLoading: true,
  });
  const [mapSizeLevel, setMapSizeLevel] = useState(3);

  // 지도 외의 동작
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [currentBounds, setCurrentBounds] = useState();
  const [mapTags, setMapTags] = useState([]);
  const [markerInfo, setMarkerInfo] = useState();
  const accessToken = useAccessToken();
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const location = useLocation();

  // 지도 초기화
  useEffect(() => {
    if (location.state) {
      console.log('location.state : ', location.state);
      fetchMarkerInfo("JOB", location.state);
    }
    SetCurrentPosition();
  }, []);

  function SetCurrentPosition() {
    console.log('현재 위치로 이동');
    if (navigator.geolocation) {
      console.log('geolocation을 사용할수 있어요..');
      // GeoLocation을 이용해서 접속 위치를 받아옴
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(
            '현재 위치',
            position.coords.latitude,
            position.coords.longitude,
          );
          setCenterState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setCenterState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      console.log('geolocation을 사용할수 없어요..');
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
      setCenterState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }

  async function fetchMarkers() {
    if (currentBounds) {
      try {
        const response = await mapApi.getMapMarkers(accessToken, currentBounds);
        setMapTags(response.data);
      } catch (error) {
        console.error(
          '마커를 서버로부터 받아오는 데에 에러 발생',
          error.response.data.code,
        );
      }
    }
  }

  async function fetchMarkerInfo(type, id) {
    try {
      const response = await mapApi.getMarkerInfo(accessToken, type, id);
      console.log('마커정보:', response.data);
      if (response.data.type === 'JOB') {
        setMarkerInfo({
          id: response.data.id,
          type: response.data.type,
          occupation: response.data.occupation,
          address: response.data.address,
        });
      } else {
        setMarkerInfo({
          id: response.data.id,
          type: response.data.type,
          name: response.data.name,
          address: response.data.address,
          phone: response.data.phoneNumber,
        });
      }
    } catch (error) {
      console.error('마커 세부 정보 에러', error.response.data.code);
    }
  }

  return (
  <Layout>
    <Frame>
      <MapFrame>
        <Map // 지도를 표시할 Container
          id="map"
          center={centerState.center} // 지도의 중심좌표
          isPanto={true}
          style={{
            width: '100%',
            height: '100%',
          }}
          level={mapSizeLevel} // 지도의 확대 레벨
          onZoomChanged={(map) => {
            const level = map.getLevel();
            setMapSizeLevel(level);
            console.log(`현재 지도 레벨은 ${level} 입니다`);
          }}
          onTileLoaded={(map) => {
            console.log('지도 타일이 로드됐어요', currentBounds);
            if (mapSizeLevel < 6) {
              fetchMarkers();
            }
          }}
          onBoundsChanged={(map) => {
            const bounds = map.getBounds();
            setCurrentBounds({
              sw: bounds.getSouthWest().toString(),
              ne: bounds.getNorthEast().toString(),
            });
          }}
        >
          <MapMarker position={position ?? centerState.center} />
          {/* <MapMarker position={centerState.center} /> */}
          {!centerState.isLoading &&
            mapSizeLevel < 6 &&
            mapTags.map(
              (tag, index) =>
                (selectedCategory === 'ALL' ||
                  ('PHARMACY' === tag['type'] &&
                    selectedCategory === 'HOSPITAL') ||
                  selectedCategory === tag['type']) && (
                  <div key={index}>
                    <MapMarker
                      position={{ lat: tag['latitude'], lng: tag['longitude'] }}
                      image={{
                        src: `/images/map/marker_${
                          tag['type'] === 'PHARMACY' ? 'PHARMACY' : tag['type']
                        }.svg`,
                        size:
                          markerInfo && tag['id'] === markerInfo.id
                            ? { width: 60, height: 60 }
                            : { width: 40, height: 40 },
                      }}
                      onClick={() => {
                        console.log(tag);
                        fetchMarkerInfo(tag['type'], tag['id']);
                        setCenterState((prev) => ({
                          ...prev,
                          center: {
                            lat: tag['latitude'],
                            lng: tag['longitude'],
                          },
                        }));
                      }}
                    />
                  </div>
                ),
            )}
        </Map>
      </MapFrame>
      <CategoryFrame>
        <CategoryButtonDiv>
          {mapCategoryList[0].map((category, index) => (
            <CategoryButton
              key={index}
              $color={category[2]}
              $isSelected={selectedCategory === category[1]}
              onClick={() => setSelectedCategory(category[1])}
            >
              {category[0]}
            </CategoryButton>
          ))}
        </CategoryButtonDiv>
        <Spacer direction="column" size="12px" />
        <CategoryButtonDiv>
          {mapCategoryList[1].map((category, index) => (
            <CategoryButton
              key={index}
              $color={category[2]}
              $isSelected={selectedCategory === category[1]}
              onClick={() => setSelectedCategory(category[1])}
            >
              {category[0]}
            </CategoryButton>
          ))}
        </CategoryButtonDiv>
      </CategoryFrame>
      {markerInfo && (
        <MarkerInfo>
          <MarkerInfoLeft>
            <div
              style={{
                width: '100%',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              {markerInfo.type === 'JOB'
                ? markerInfo.occupation
                : markerInfo.name}
            </div>
            <div
              style={{
                width: '100%',
                overflow: 'hidden',
                wordBreak: 'break-all',
                fontSize: '18px',
              }}
            >
              {markerInfo.address}
            </div>
          </MarkerInfoLeft>
          <MarkerInfoRight
          onClick={() => callFlutter()}
          >
            <img
              src={
                markerInfo.type === 'JOB'
                  ? '/images/map/jobDetail.svg'
                  : '/images/map/phone.svg'
              }
            }}
            onBoundsChanged={(map) => {
              const bounds = map.getBounds();
              setCurrentBounds({
                sw: bounds.getSouthWest().toString(),
                ne: bounds.getNorthEast().toString(),
              });
            }}
          >
            <MapMarker position={position ?? centerState.center} />
            {/* <MapMarker position={centerState.center} /> */}
            {!centerState.isLoading &&
              mapSizeLevel < 4 &&
              mapTags.map(
                (tag, index) =>
                  (selectedCategory === 'ALL' ||
                    ('PHARMACY' === tag['type'] &&
                      selectedCategory === 'HOSPITAL') ||
                    selectedCategory === tag['type']) && (
                    <div key={index}>
                      <MapMarker
                        position={{
                          lat: tag['latitude'],
                          lng: tag['longitude'],
                        }}
                        image={{
                          src: `/images/map/marker_${
                            tag['type'] === 'PHARMACY'
                              ? 'PHARMACY'
                              : tag['type']
                          }.svg`,
                          size:
                            markerInfo && tag['id'] === markerInfo.id
                              ? { width: 60, height: 60 }
                              : { width: 40, height: 40 },
                        }}
                        onClick={() => {
                          console.log(tag);
                          fetchMarkerInfo(tag['type'], tag['id']);
                          setCenterState((prev) => ({
                            ...prev,
                            center: {
                              lat: tag['latitude'],
                              lng: tag['longitude'],
                            },
                          }));
                        }}
                      />
                    </div>
                  ),
              )}
          </Map>
        </MapFrame>
        <CategoryFrame>
          <CategoryButtonDiv>
            {mapCategoryList[0].map((category, index) => (
              <CategoryButton
                key={index}
                $color={category[2]}
                $isSelected={selectedCategory === category[1]}
                onClick={() => setSelectedCategory(category[1])}
              >
                {category[0]}
              </CategoryButton>
            ))}
          </CategoryButtonDiv>
          <Spacer direction="column" size="12px" />
          <CategoryButtonDiv>
            {mapCategoryList[1].map((category, index) => (
              <CategoryButton
                key={index}
                $color={category[2]}
                $isSelected={selectedCategory === category[1]}
                onClick={() => setSelectedCategory(category[1])}
              >
                {category[0]}
              </CategoryButton>
            ))}
          </CategoryButtonDiv>
        </CategoryFrame>
        {markerInfo && (
          <MarkerInfo>
            <MarkerInfoLeft>
              <div
                style={{
                  width: '100%',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                {markerInfo.type === 'JOB'
                  ? markerInfo.occupation
                  : markerInfo.name}
              </div>
              <div
                style={{
                  width: '100%',
                  overflow: 'hidden',
                  wordBreak: 'break-all',
                  fontSize: '18px',
                }}
              >
                {markerInfo.address}
              </div>
            </MarkerInfoLeft>
            <MarkerInfoRight>
              <img
                src={
                  markerInfo.type === 'JOB'
                    ? '/images/map/jobDetail.svg'
                    : '/images/map/phone.svg'
                }
                style={
                  markerInfo.type === 'JOB'
                    ? { width: '36px', height: '36px' }
                    : { width: '44px', height: '44px' }
                }
                alt="상세정보 보기"
              />
            </MarkerInfoRight>
          </MarkerInfo>
        )}
      </Frame>
    </Layout>
  );
  
  
}

const Frame = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const MapFrame = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const CategoryFrame = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: absolute;
  z-index: 1;
`;

const Spacer = styled.div`
  width: ${(props) => props.direction === 'row' && props.size};
  height: ${(props) => props.direction === 'column' && props.size};
`;

const CategoryButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
`;

const CategoryButton = styled.button`
  flex-grow: 1; // 가능한 한 많은 공간 차지
  border: 2px solid
    ${(props) => {
      if (props.$isSelected) {
        return props.$color;
      } else {
        return '#808080';
      }
    }};
  padding: 4px 0;
  border-radius: 100px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.$isSelected ? 'white' : '#808080')};
  background-color: ${(props) => {
    if (props.$isSelected) {
      return props.$color;
    } else {
      return 'white';
    }
  }};
`;

const MarkerInfo = styled.div`
  box-sizing: border-box;
  width: 100%;
  /* height: 120px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 16px;
  position: absolute;
  gap: 16px;
  bottom: 0;
  z-index: 1;
  box-shadow: rgb(68, 68, 68) 0px 0px 5px;
  --darkreader-inline-boxshadow: #33373a 0px 0px 5px;
`;

const MarkerInfoLeft = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  gap: 8px;
`;

const MarkerInfoRight = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 2px solid #379237;
  border-radius: 50%;
  flex-shrink: 0;
`;
