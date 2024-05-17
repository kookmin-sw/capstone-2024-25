import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useStore from '../../stores/store';

const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url(${(props) => props.imgSrc}) no-repeat center/cover;
`;

const Profile = ({ type }) => {
  const [imgSrc, setImgSrc] = useState('');
  const selectedAvatar = useStore((state) => state.selectedAvatar);
  const gender = useStore((state) => state.gender);

  useEffect(() => {
    if (type === 'System') {
      if (!selectedAvatar) {
        setImgSrc(process.env.PUBLIC_URL + '/images/Chatbot/avatar-male.jpg');
      } else {
        setImgSrc(process.env.PUBLIC_URL + '/images/Chatbot/avatar-female.jpg');
      }
    } else {
      if (gender === 'MALE') {
        setImgSrc(process.env.PUBLIC_URL + 'images/Chatbot/user-male.jpg');
      } else {
        setImgSrc(process.env.PUBLIC_URL + 'images/Chatbot/user-female.jpg');
      }
    }
  }, [type, selectedAvatar]);
  return <ProfileImg imgSrc={imgSrc} />;
};
export default Profile;
