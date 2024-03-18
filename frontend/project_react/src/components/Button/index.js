import styled, { css } from 'styled-components';

const sizes = {
  Large: css`
    font-size: 24px;
    width: 100%;
  `,
  Small: css`
    width: 48%;
  `,
};

const heights = {
  Tall: css`
    height: 60px;
  `,
  Short: css`
    height: 40px;
  `,
};

const types = {
  Primary: css`
    background-color: var(--primary-color);
    border: none;
    color: white;
  `,
  Back: css`
    background-color: #ffffff;
    border: 2px solid #000000;
    color: black;
  `,
};

const ButtonStyled = styled.button`
  background-color: var(--primary-color);
  font-size: 16px;
  text-align: center;
  border-radius: 10px;
  ${({ size }) => sizes[size]}
  ${({ height }) => heights[height]}
  ${({ type }) => types[type]}
  ${(props) =>
    props.disabled &&
    css`
      border: none;
      color: white;
      background-color: #8b8b8b;
      cursor: not-allowed;
    `}
`;

const Button = ({ text, size, height, type, disabled, onClick }) => {
  return (
    <ButtonStyled
      size={size}
      height={height}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </ButtonStyled>
  );
};

export default Button;
