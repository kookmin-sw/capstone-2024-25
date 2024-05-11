import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { todoApis } from '../../api/apis/todoApis';
import { useAccessToken } from '../../components/cookies';

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export const Card = ({ title, color, type, imgSrc, mission, clearTodo }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [currentTodo, setCurrentTodo] = useState();
  const accessToken = useAccessToken();

  useEffect(() => {
    setCurrentTodo(mission);
  }, [mission]);

  const paginate = (newDirection) => {
    console.log(page + newDirection, newDirection);
    setPage([page + newDirection, newDirection]);

    if (newDirection === 1) {
      getNextTodo();
    } else {
      getPreviousTodo();
    }
  };

  async function getNextTodo() {
    try {
      const response = await todoApis.getNextTodo(accessToken, type);
      console.log(response);
      setCurrentTodo(response.data.routine);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPreviousTodo() {
    try {
      const response = await todoApis.getPreviousTodo(accessToken, type);
      console.log(response);
      setCurrentTodo(response.data.routine);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <AnimatePresence initial={false} custom={direction}>
        <MotionCard
          key={page}
          custom={direction}
          variants={variants}
          $color={color}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <CardTitleRow>
            <img
              src={`/images/todo/${imgSrc}.svg`}
              width="44px"
              height="44px"
              alt="null"
              style={{ paddingLeft: '14px' }}
            />
            <CardTitle>{title}</CardTitle>
          </CardTitleRow>
          <MissionRow>
            <img
              src={`/images/todo/arrow.svg`}
              width="44px"
              height="44px"
              alt="null"
              style={{ marginLeft: '24px' }}
              onClick={() => paginate(-1)}
            />
            <h2 style={{ color: 'white' }}>{currentTodo}</h2>
            <img
              src={`/images/todo/arrow.svg`}
              width="44px"
              height="44px"
              alt="null"
              style={{ marginRight: '24px', transform: 'rotate(180deg)' }}
              onClick={() => paginate(1)}
            />
          </MissionRow>
          <ClearButton $color={color} onClick={() => clearTodo(type)}>
            완료하기
          </ClearButton>
        </MotionCard>
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100dvw;
  max-width: 480px;
  height: 240px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const MotionCard = styled(motion.div)`
  position: absolute;
  width: calc(100% - 60px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  background-color: ${(props) => props.$color};
  border-radius: 20px;
`;

const CardTitleRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const CardTitle = styled.h1`
  margin-left: 10px;
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const MissionRow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClearButton = styled.button`
  background-color: white;
  padding: 6px 12px;
  margin: 12px;
  color: ${(props) => props.$color};
  font-size: 20px;
  font-weight: bold;
  border-radius: 100px;
  border: none;
  z-index: 3;
`;
