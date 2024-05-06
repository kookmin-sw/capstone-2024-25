import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

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

const todos = ['잠자기'];

export const Card = ({ title, color, imgSrc }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const todoIndex = page % todos.length;

  const paginate = (newDirection) => {
    console.log(page + newDirection, newDirection);
    setPage([page + newDirection, newDirection]);
  };

  return (
    <Container $color={color}>
      <CardTitleRow>
        <img
          src={`/images/todo/${imgSrc}.svg`}
          width="44px"
          height="44px"
          alt="null"
          style={{ paddingLeft: '12px' }}
        />
        <CardTitle>{title}</CardTitle>
      </CardTitleRow>
      <AnimateContainer>
        <div className="next" onClick={() => paginate(1)}>
          {'‣'}
        </div>
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
            ></MotionCard>
          </AnimatePresence>
        <div className="next" onClick={() => paginate(1)}>
          {'‣'}
        </div>
      </AnimateContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.$color};
  overflow: hidden;
  border-radius: 20px;
`;

const AnimateContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MotionCard = styled(motion.div)`
  position: absolute;
  width: calc(100% - 120px);
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background-color: white;
`;

const CardTitleRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const CardTitle = styled.h1`
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
