import styled from 'styled-components';
import { useState, useEffect } from 'react';

const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url(${(props) => props.imgSrc}) no-repeat center/cover;
`;

const Profile = ({ type }) => {
  const [imgSrc, setImgSrc] = useState('');
  useEffect(() => {
    if (type === 'System') {
      setImgSrc(process.env.PUBLIC_URL + '/images/Chatbot/avatar-male.svg');
    } else {
      setImgSrc(process.env.PUBLIC_URL + 'images/Chatbot/user-male.jpg');
    }
  }, [type]);
  return <ProfileImg imgSrc={imgSrc} />;
};
export default Profile;
