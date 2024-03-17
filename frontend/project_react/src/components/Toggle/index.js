import styled, { css } from 'styled-components';

const sizes = {
  Large: css`
    width: 100%;
    padding: 34px 0;
    font-size: 32px;
  `,
  Medium: css`
    font-size: 24px;
  `,
  Small: css`
    font-size: 20px;
    border-radius: 30px;
    border: 1px solid;
  `,
};
const selecteds = {
  true: css`
    background-color: var(--primary-color);
    color: #ffffff;
    border: none;
  `,
  false: css`
    background-color: #ffffff;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
  `,
};

const ToggleStyled = styled.button`
  background-color: var(--primary-color);
  text-align: center;
  border-radius: 10px;
  ${({ selected }) => selecteds[selected]}
  ${({ size }) => sizes[size]}
`;

const Toggle = ({ text, size, selected, onClick }) => {
  return (
    <ToggleStyled size={size} selected={selected} onClick={onClick}>
      {text}
    </ToggleStyled>
  );
};

export default Toggle;
