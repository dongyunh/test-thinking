import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';

type ButtonProps = {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
};

type StyleProps = {
  isError?: boolean;
};

const Button = ({ text, disabled, onClick }: ButtonProps) => {
  const handleOnClick = (e: any) => {
    if (!onClick) return;
    onClick();
  };

  return (
    <StyledButton disabled={disabled} onClick={handleOnClick}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button<StyleProps>`
  border: none;
  align-items: center;
  border-radius: 12px;
  background-color: ${themedPalette.modal_button_normal};
  color: ${themedPalette.main_text2};
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 20px;
  transition: 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  cursor: pointer;

  :hover {
    background-color: ${themedPalette.modal_button_hover};
    color: ${themedPalette.main_text1};
  }

  :disabled {
    background-color: ${themedPalette.modal_button_disabled};
    color: ${themedPalette.main_text1};
    cursor: not-allowed;
  }
`;

export { Button };
