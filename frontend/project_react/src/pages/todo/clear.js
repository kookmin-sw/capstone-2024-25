import styled from 'styled-components';
import { motion } from 'framer-motion';

export default function ClearComment({ needAnimated, children }) {
  return (
    <ClearFrame>
      <motion.img
        initial={needAnimated && { y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        src="/images/save.svg"
        alt="완료"
        style={{ width: '46px', height: '46px' }}
      />
      <motion.div
        initial={needAnimated && { y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          delay: 0.1,
        }}
      >{children}</motion.div>
    </ClearFrame>
  );
}

const ClearFrame = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 24px;
  font-size: 24px;
  font-weight: 500;
`;
