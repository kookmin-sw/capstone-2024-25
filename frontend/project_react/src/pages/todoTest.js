import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, color } from "framer-motion";
import styled from 'styled-components';

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
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

const todos = [
    "잠자기",
];

export const Example = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    const todoIndex = page % todos.length;

    const paginate = (newDirection) => {
        console.log(page + newDirection, newDirection);
        setPage([page + newDirection, newDirection]);
    };

    return (
        <Container>
            <AnimatePresence initial={false} custom={direction}>
                <MotionCard
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
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
                    <h1>{todos[todoIndex]}</h1>
                </MotionCard>
            </AnimatePresence >
            <div className="next" onClick={() => paginate(1)}>
                {"‣"}
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
                {"‣"}
            </div>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    width: 100dvw;
    max-width: 480px;
    height: 200px;
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
    justify-content: center;
    align-items: center;
    background-color: #D79797;
    border-radius: 20px;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.2);
`;