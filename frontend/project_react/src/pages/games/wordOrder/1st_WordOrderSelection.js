import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GamePageHeader from '../../../components/Header/GamePageHeader';

export default function WordOrderSelection() {
  const [isLoading, setIsLoading] = useState(false);
  const [sentenceCategories, setSentenceCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSentenceCategry();
  }, []);

  useEffect(() => {
    console.log(sentenceCategories);
  }, [sentenceCategories]);

  async function getSentenceCategry() {
    setIsLoading(true);
    await axios
      .get(process.env.PUBLIC_URL + '/wordOrderDummy.json')
      .then((response) => {
        const data = response.data;
        const categories = Object.keys(data);
        //categories를 10배 해서 set하도록
        categories.push(...categories);
        categories.push(...categories);
        categories.push(...categories);
        setSentenceCategories(categories);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Frame>
      <GamePageHeader showBackButton={true}></GamePageHeader>
      <p>문장 순서 맞추기 선택</p>
      <CagegoryListBox>
        {isLoading ? (
          <p>로딩중...</p>
        ) : (
          <CategoryList>
            {sentenceCategories.map((category, index) => (
              <CategoryButton
                key={index}
                onClick={() => navigate(`/game/wordOrderIntro/${category}`)}
              >
                {category}
              </CategoryButton>
            ))}
          </CategoryList>
        )}
      </CagegoryListBox>
    </Frame>
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
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  gap: 20px;
`;

const CagegoryListBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: #379237;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-top: 12px solid #379237;
  border-left: 12px solid #379237;
  border-right: 12px solid #379237;
  scrollbar-width: none;
`;

const CategoryList = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  gap: 8px;
`;

const CategoryButton = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: black;
  transition: transform 0.3s;

  &:active {
    background-color: #c8e6c9;
    transform: scale(0.95);
  }
`;
