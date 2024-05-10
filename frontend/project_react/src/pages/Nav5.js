import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from './map/useKakaoLoader';
import { mapApi } from '../../src/api/apis/mapApis';

const mapCategoryList = [
  [
    ['전체', 'ALL', '#379237'],
    ['병원·약국', 'HOSPITAL', '#EF6C20'],
    ['복지주택', 'WELFAREHOUSE', '#FBC02D'],
  ],
  [
    ['복지관', 'WELFARECENTER', '#0091EA'],
    ['케어센터', 'CARECENTER', '#8BC34A'],
    ['일자리', 'job', '#D57AFF'],
  ],
];

export default function Nav5() {
  useKakaoLoader();

  // 지도 관련 동작
  const [centerState, setCenterState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
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

  // 지도 초기화
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 받아옴
      navigator.geolocation.getCurrentPosition(
        (position) => {
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
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
      setCenterState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);

  async function fetchMarkers() {
    if (currentBounds) {
      try {
        const response = await mapApi.getMapMarkers(currentBounds);
        // console.log('응답', response.data);
        setMapTags(response.data);
      } catch (error) {
        console.error('에러요', error.response.data.code);
      }
    }
  }

  async function fetchMarkerInfo(type, id) {
    try {
      const response = await mapApi.getMarkerInfo(type, id);
      console.log('응답', response.data);
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
      console.error('에러요', error.response.data.code);
    }
  }

  return (
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
            if (mapSizeLevel < 4) {
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
                      position={{ lat: tag['latitude'], lng: tag['longitude'] }}
                      image={{
                        src: `/images/map/marker_${
                          tag['type'] === 'PHARMACY' ? 'HOSPITAL' : tag['type']
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
                fontSize: '20px',
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
  height: 92px;
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
  gap: 4px;
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
