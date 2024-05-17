import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useStore from '../../stores/store';

const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url(${(props) => props.imgSrc}) no-repeat center/cover;
`;

const Profile = ({ type, chatImg }) => {
  const [imgSrc, setImgSrc] = useState('');
  const gender = useStore((state) => state.gender);
  const selectedAvatar = useStore((state) => state.selectedAvatar);
  useEffect(() => {
    if (type === 'System') {
      if (!chatImg) {
        // chatImg가 없을 때 ( 처음 )
        if (selectedAvatar === 'BOY') {
          setImgSrc(process.env.PUBLIC_URL + '/images/Chatbot/avatar-male.jpg');
        } else {
          setImgSrc(
            process.env.PUBLIC_URL + '/images/Chatbot/avatar-female.jpg',
          );
        }
      } else {
        setImgSrc(chatImg);
      }
    } else {
      if (gender === 'MALE') {
        setImgSrc(process.env.PUBLIC_URL + 'images/Chatbot/user-male.jpg');
      } else {
        setImgSrc(process.env.PUBLIC_URL + 'images/Chatbot/user-female.jpg');
      }
    }
  }, [type, chatImg]);
  return <ProfileImg imgSrc={imgSrc} />;
};
export default Profile;
