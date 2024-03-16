import styled, { css } from 'styled-components';

const sizes = {
  Large: css`
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
    background-color: #379237;
    color: #ffffff;
    border: none;
  `,
  false: css`
    background-color: #ffffff;
    color: #379237;
    border: 2px solid #379237;
  `,
};

const ToggleStyled = styled.button`
  background-color: #379237;
  text-align: center;
  border-radius: 10px;
  ${({ selected }) => selecteds[selected]}
  ${({ size }) => sizes[size]}
`;

const Toggle = ({ text, size, selected }) => {
  return (
    <ToggleStyled size={size} selected={selected}>
      {text}
    </ToggleStyled>
  );
};

export default Toggle;
