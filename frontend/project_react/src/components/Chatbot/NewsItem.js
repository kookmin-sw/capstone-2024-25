import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewsItemContainer = styled.span`
  font-size: 16px;
  color: #ffffff;
  max-width: 230px;
  white-space: normal;
  word-break: break-all;
  //border: ;
`;
const NewsContents = styled.p``;
const NewsLink = styled.span`
  text-decoration: underline;
  color: #0066ff;
`;

const NewsItem = ({ news }) => {
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const clickDetail = () => {
    navigate('/job-detail2', {
      state: {
        companyName: '뉴스',
        // password: password,
        worknetUrl: news.link,
      },
    });
  };

  useEffect(() => {
    switch (news.category) {
      case 'business':
        setCategory('경제');
        break;
      case 'world':
        setCategory('세계');
        break;
      case 'sports':
        setCategory('스포츠');
        break;
      case 'technology':
        setCategory('기술');
        break;
      case 'politics':
        setCategory('정치');
        break;
      default:
        setCategory('기타');
        break;
    }
  }, [news.category]);

  return (
    <NewsItemContainer>
      <NewsContents>
        [{news.title} - {category}]
      </NewsContents>
      <NewsContents>{news.description}</NewsContents>
      <NewsContents>
        자세히 보기 :<br />
        <NewsLink
          onClick={() => {
            clickDetail();
          }}
        >
          {news.link}
        </NewsLink>
      </NewsContents>
    </NewsItemContainer>
  );
};

export default NewsItem;
