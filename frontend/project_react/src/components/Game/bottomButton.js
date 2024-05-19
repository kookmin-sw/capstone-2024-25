import styled from 'styled-components';
import { motion } from 'framer-motion';

export default function BottomButton({ onClick, children, postAnswer }) {
  return (
    <Button onClick={onClick} postAnswer={postAnswer}>
      {children}
    </Button>
  );
}

const Button = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  border-radius: 12px;
  font-size: 28px;
  font-weight: bold;
  /* background-color: var(--primary-color); */
  background-color: ${(props) =>
    props.postAnswer ? '#2088FF' : 'var(--primary-color)'};
  color: white;
  box-shadow: 0px 8px 6px -6px rgb(102, 102, 102);
  transition: background-color 0.3s;
`;
