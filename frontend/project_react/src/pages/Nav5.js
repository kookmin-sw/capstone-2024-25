import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Map, MapMarker} from 'react-kakao-maps-sdk';
import useKakaoLoader from './map/useKakaoLoader';

const mapKeywordList = [
  ['전체', '병원·약국', '복지주택'],
  ['복지관', '케어센터', '일자리'],
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
  const [selectedCategory, setSelectedCategory] = useState(null);

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
          level={3} // 지도의 확대 레벨
          onZoomChanged={(map) => {
            const level = map.getLevel();
            console.log(`현재 지도 레벨은 ${level} 입니다`);
          }}
        >
          {' '}
          {!state.isLoading && (
            <MapMarker position={state.center}>
              <div style={{ padding: '5px', color: '#000' }}>
                {state.errMsg ? state.errMsg : '여기에 계신가요?!'}
              </div>
            </MapMarker>
          )}
        </Map>
      </MapFrame>
      <InnerFrame>
        <CategoryButtonDiv>
          {mapKeywordList[0].map((keyword, index) => (
            <CategoryButton
              key={index}
              $keyword={keyword}
              $isSelected={selectedCategory === keyword}
              onClick={() => setSelectedCategory(keyword)}
            >
              {keyword}
            </CategoryButton>
          ))}
        </CategoryButtonDiv>
        <Spacer direction="column" size="12px" />
        <CategoryButtonDiv>
          {mapKeywordList[1].map((keyword, index) => (
            <CategoryButton
              key={index}
              $keyword={keyword}
              $isSelected={selectedCategory === keyword}
              onClick={() => setSelectedCategory(keyword)}
            >
              {keyword}
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
  border: 2px solid #808080;
  padding: 4px 0;
  border-radius: 100px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.$isSelected ? 'white' : '#808080')};
  background-color: ${(props) => {
    if (props.$isSelected) {
      switch (props.$keyword) {
        case '전체':
          return '#379237';
        case '병원·약국':
          return '#EF6C20';
        case '복지주택':
          return '#FBC02D';
        case '복지관':
          return '#0091EA';
        case '케어센터':
          return '#8BC34A';
        case '일자리':
          return '#00ffff';
        default:
          return '#808080';
      }
    } else {
      return 'white';
    }
  }};
`;
