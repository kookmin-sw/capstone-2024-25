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
`;

const Category = ({ text, selected, color }) => {
  return (
    <ToggleStyled selected={selected} color={color}>
      {text}
    </ToggleStyled>
  );
};

export default Category;
