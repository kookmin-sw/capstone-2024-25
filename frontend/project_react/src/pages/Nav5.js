import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from './map/useKakaoLoader';
import { mapApi } from '../../src/api/apis/mapApis';
import { wordOrderApis } from '../api/apis/gameApis';

const mapCategoryList = [
  [
    ['전체', '#379237'],
    ['병원·약국', '#EF6C20'],
    ['복지주택', '#FBC02D'],
  ],
  [
    ['복지관', '#0091EA'],
    ['케어센터', '#8BC34A'],
    ['일자리', '#D57AFF'],
  ],
];

export default function Nav5() {
  const navigate = useNavigate();
  useKakaoLoader();

  // 지도 관련 동작
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [mapSizeLevel, setMapSizeLevel] = useState(3);

  // 지도 외의 동작
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentBounds, setCurrentBounds] = useState();
  const [mapTags, setMapTags] = useState([]);
  const [markerInfo, setMarkerInfo] = useState();

  // 지도 초기화
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 받아옴
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);

  async function fetchData() {
    if (currentBounds) {
      try {
        const response = await mapApi.getMapMarkers(currentBounds);
        console.log('응답', response.data);
        setMapTags(response.data);
      } catch (error) {
        console.error('에러요', error.message);
      }
    }
  }

  useEffect(() => {
    if (selectedCategory) {
    }
  }, [selectedCategory]);

  return (
    <Frame>
      <MapFrame>
        <Map // 지도를 표시할 Container
          id="map"
          center={{
            // 지도의 중심좌표
            lat: 33.450701,
            lng: 126.570667,
          }}
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
            fetchData();
          }}
          onBoundsChanged={(map) => {
            const bounds = map.getBounds();
            setCurrentBounds({
              sw: bounds.getSouthWest().toString(),
              ne: bounds.getNorthEast().toString(),
            });
          }}
        >
          {!state.isLoading && mapSizeLevel < 5 &&
            mapTags.map((tag, index) => (
              <div key={index}>
                <MapMarker
                  position={{ lat: tag['latitude'], lng: tag['longitude'] }}
                  image={{
                    // src: `/images/map/marker_${selectedCategory}.svg`,
                    src: `/images/map/marker_병원·약국.svg`,
                    size:
                      markerInfo && index === markerInfo.markerIndex
                        ? { width: 60, height: 60 }
                        : { width: 40, height: 40 },
                  }}
                />
                <CustomOverlayMap
                  position={{ lat: tag['latitude'], lng: tag['longitude'] }}
                >
                  <MapTagContainer>
                    <MapTagOverlay
                      $color="#EF6C20"
                      onClick={() => {
                        console.log(tag);
                        setMarkerInfo({
                          markerIndex: index,
                          markerName: tag['type'],
                        });
                      }}
                    >
                      {markerInfo && index === markerInfo.markerIndex
                        ? ''
                        : tag['type']}
                    </MapTagOverlay>
                  </MapTagContainer>
                </CustomOverlayMap>
              </div>
            ))}
        </Map>
      </MapFrame>
      <CategoryFrame>
        <CategoryButtonDiv>
          {mapCategoryList[0].map((category, index) => (
            <CategoryButton
              key={index}
              $color={category[1]}
              $isSelected={selectedCategory === category[0]}
              onClick={() => setSelectedCategory(category[0])}
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
              $color={category[1]}
              $isSelected={selectedCategory === category[0]}
              onClick={() => setSelectedCategory(category[0])}
            >
              {category[0]}
            </CategoryButton>
          ))}
        </CategoryButtonDiv>
      </CategoryFrame>
      {markerInfo && <MarkerInfo>{markerInfo.markerName}</MarkerInfo>}
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

const MapTagContainer = styled.div`
  width: 60px;
  height: 128px;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const MapTagOverlay = styled.div`
  height: 80px;
  pointer-events: all;
  font-size: 18px;
  font-weight: bold;
  color: black;
  z-index: 2;
`;

const MarkerInfo = styled.div`
  width: 100%;
  height: 92px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: absolute;
  bottom: 0;
  z-index: 1;
  box-shadow: rgb(68, 68, 68) 0px 0px 5px;
  --darkreader-inline-boxshadow: #33373a 0px 0px 5px;
`;
