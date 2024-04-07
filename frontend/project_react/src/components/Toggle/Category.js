import styled, { css } from 'styled-components';

const selecteds = {
  true: css`
    background-color: ${({ color }) => color};
    color: #ffffff;
    border: 2px solid ${({ color }) => color};
  `,
  false: css`
    background-color: #ffffff;
    color: var(--unselected-color);
    border: 2px solid #808080;
  `,
};

const ToggleStyled = styled.button`
  background-color: var(--primary-color);
  text-align: center;
  border-radius: 30px;
  ${({ selected, color }) => selecteds[selected]}
  position: relative;
  font-size: 20px;
`;
// Selected 이고 values.length 가 0이 아니면 띄울 놈
const InnerValues = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  //width: fit-content;
  background: url(process.env.PUBLIC_URL + '/images/Chatbot/category-bubble-small.svg')
    no-repeat;
  position: absolute;
  top: 100%;
  left: 50%;
`;

const Category = ({ text, selected, color, values, onClick }) => {
  return (
    <ToggleStyled selected={selected} color={color} onClick={onClick}>
      {text}
      {selected && values.length > 0 && (
        <InnerValues>
          {values.map((value) => (
            <Category
              key={value.id}
              text={value.title}
              selected={value.selected}
              color={color}
              values={value.values}
            />
          ))}
        </InnerValues>
      )}
    </ToggleStyled>
  );
};

export default Category;
