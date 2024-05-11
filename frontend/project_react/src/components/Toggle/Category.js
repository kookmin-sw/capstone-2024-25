// Category.js

import styled, { css } from 'styled-components';

const selecteds = {
  true: css`
    background-color: ${({ color }) => color};
    color: #ffffff;
    border: 2px solid ${({ color }) => color};
  `,
  false: css`
    background-color: #ffffff;
    color: ${({ unselectedColor }) =>
      unselectedColor ? unselectedColor : 'var(--unselected-color)'};
    border: 2px solid
      ${({ unselectedColor }) =>
        unselectedColor ? unselectedColor : 'var(--unselected-color)'};
  `,
};

const ToggleStyled = styled.button`
  background-color: var(--primary-color);
  text-align: center;
  border-radius: 30px;
  ${({ selected, color }) => selecteds[selected]}
  position: relative;
  font-size: 20px;
  white-space: nowrap;
`;
const SubCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  gap: 4px;
  width: fit-content;
  position: absolute;
  bottom: 160%;
  left: 50%;
  transform: translate(-50%);
  padding: 6px 12px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 8px 8px -8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e8e8e8;
`;
const TailImg = styled.img`
  position: absolute;
  bottom: 100%;
  left: 50%;
  z-index: 2;
  transform: translateX(-50%);
`;

const Category = ({
  text,
  selected,
  color,
  values,
  categoryClick,
  subCategoryClick,
  showSubCategory,
  unselectedColor,
}) => {
  return (
    <ToggleStyled
      selected={selected}
      color={color}
      onClick={(e) => {
        e.stopPropagation();
        categoryClick(e);
      }}
      unselectedColor={unselectedColor}
    >
      {text}
      {selected && showSubCategory && values.length > 0 && (
        <>
          <SubCategoryWrapper>
            {values.map((value) => (
              <Category
                key={value.id}
                text={value.title}
                selected={value.selected}
                color={color}
                values={value.values}
                unselectedColor={unselectedColor}
                categoryClick={(e) => {
                  e.stopPropagation();
                  subCategoryClick(value.id);
                }}
              />
            ))}
          </SubCategoryWrapper>
          <TailImg
            src={
              process.env.PUBLIC_URL + 'images/Chatbot/category-bubble-tail.svg'
            }
          />
        </>
      )}
    </ToggleStyled>
  );
};

export default Category;
