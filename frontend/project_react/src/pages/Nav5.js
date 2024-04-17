import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Nav5() {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
      });
    };
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=df2953604b7379746cd108320967cf69&autoload=false';
    document.head.appendChild(script);
  }, []);
  
  return (
    <Frame>
      <Map id="map" />
      <InnerFrame>
        <button
          style={{
            zIndex: 1,
          }}
          onClick={() => navigate('/')}
        >
          홈으로
        </button>
      </InnerFrame>
    </Frame>
  );
}

const Frame = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Map = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const InnerFrame = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: absolute;
`;
