import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from './map/useKakaoLoader';
import { mapApi } from '../../src/api/apis/mapApis';

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

  // 지도 외의 동작
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentBounds, setCurrentBounds] = useState({
    sw: 0,
    ne: 0,
  });
  const [mapTags, setMapTags] = useState();

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

  useEffect(() => {}, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
    }
  }, [selectedCategory]);

  async function fetchMapData() {
    try {
      const response = await mapApi.getMapMarkers(currentBounds);
      console.log(response.data[selectedCategory]);
      setMapTags(response.data);
    } catch (error) {
      console.error(error);
    }
  }

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
          level={3} // 지도의 확대 레벨
          onZoomChanged={(map) => {
            const level = map.getLevel();
            console.log(`현재 지도 레벨은 ${level} 입니다`);
          }}
          onTileLoaded={(map) => {
            console.log('지도 타일이 로드됐어요', currentBounds);
            console.log(
              '현재 마커 src:',
              `/images/map/marker_${selectedCategory}.svg`,
            );
            fetchMapData();
          }}
          onBoundsChanged={(map) => {
            const bounds = map.getBounds();
            setCurrentBounds({
              sw: bounds.getSouthWest().toString(),
              ne: bounds.getNorthEast().toString(),
            });
          }}
        >
          {!state.isLoading &&
            mapTags[selectedCategory].map((tag, index) => (
              <>
                <MapMarker
                  position={{ lat: tag['lat'], lng: tag['lng'] }}
                  image={{
                    src: `/images/map/marker_${selectedCategory}.svg`,
                    size: { width: 40, height: 40 },
                  }}
                />
                <CustomOverlayMap
                  position={{ lat: tag['lat'], lng: tag['lng']}}
                >
                 <MapTagOverlay onClick={() => console.log(`${tag['name']} has clicked.`)}>{tag['name']}</MapTagOverlay>
                </CustomOverlayMap>
              </>
            ))}
        </Map>
      </MapFrame>
      <InnerFrame>
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
      </InnerFrame>
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

const InnerFrame = styled.div`
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

const MapTagOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  color: black;
`;
