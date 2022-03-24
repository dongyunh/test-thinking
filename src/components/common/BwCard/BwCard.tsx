import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';

type CardProps = {
  width: number;
  height: number;
  subject: string;
};
type StyleProps = {
  width: number;
  height: number;
};

const BwCard = ({ width, height, subject }: CardProps) => {
  return (
    <CardWrapper>
      <StyledCard width={width} height={height}>
        <StlyeSubject>{subject}</StlyeSubject>
      </StyledCard>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const StyledCard = styled.div<StyleProps>`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: ${themedPalette.card_bg_normal};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  position: relative;
  transition: 0.2s ease-in-out;
`;

const StlyeSubject = styled.h3`
  text-align: center;
`;

export { BwCard };
