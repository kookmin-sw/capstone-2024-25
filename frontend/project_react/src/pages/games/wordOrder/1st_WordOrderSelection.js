import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { wordOrderApis } from '../../../api/apis/gameApis';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../../components/Header/TitleHeader';
import { useAccessToken } from '../../../components/cookies';
import { CircularProgressbar } from 'react-circular-progressbar';
import Layout from '../../../layouts/Layout';

const sentenceCategories = [
  ['문학', 'literature'],
  ['과학', 'science'],
  ['사회', 'society'],
  ['역사', 'history'],
  ['법률', 'legislation'],
];

export default function WordOrderSelection() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState({
    literature: 0,
    science: 0,
    society: 0,
    history: 0,
    legislation: 0,
  });
  const accessToken = useAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    getProgress();
  }, []);

  async function getProgress() {
    try {
      const res = await wordOrderApis.getProgress(accessToken);
      console.log(res.data);
      setProgress(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <Frame>
        <TitleHeader showBackButton={true} />
        <TitleDiv>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '400', margin: '0px' }}>
              두뇌 향상 게임
            </h2>
            <img
              src="/images/game/bulb.svg"
              style={{ width: '28px', height: '28px' }}
            />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '600', margin: '0px' }}>
            문장 순서 맞추기
          </h1>
        </TitleDiv>
        <CagegoryListBox>
          <CategoryList>
            {sentenceCategories.map((category, index) => (
              <CategoryButton
                key={index}
                onClick={() => navigate(`/game/wordOrderIntro/${category}`)}
              >
                <h2
                  style={{ fontSize: '36px', fontWeight: '500', margin: '0px' }}
                >
                  {category[0]}
                </h2>
                <CircularProgressbar
                  value={progress[category[1]]}
                  text={`${progress[category[1]]}%`}
                  strokeWidth={12}
                  styles={{
                    root: { height: '54px', width: '54px' },
                    path: {
                      stroke: '#4fce84',
                      strokeLinecap: 'round',
                      transition: 'stroke-dashoffset 0.5s ease 0s',
                    },
                    trail: {
                      stroke: '#d7d7d7',
                    },
                    text: {
                      fill: `#333333`,
                      fontSize: '28px',
                      dominantBaseline: 'middle', // Add this
                      textAnchor: 'middle', // Add this
                    },
                  }}
                />
              </CategoryButton>
            ))}
          </CategoryList>
        </CagegoryListBox>
      </Frame>
    </Layout>
  );
}

const Frame = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  gap: 20px;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const CagegoryListBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  /* height: 67%; */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: #379237;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: 16px solid #379237;
  scrollbar-width: none;
`;

const CategoryList = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  gap: 12px;
`;

const CategoryButton = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: black;
  transition: transform 0.3s;
  padding: 20px;

  &:active {
    background-color: #c8e6c9;
    transform: scale(0.95);
  }
`;
