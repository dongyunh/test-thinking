import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../theme';
import { WaitingRoomContext } from '../../../../../pages/sixHat/devating/[roomId]';

const ChatTextField = ({}) => {
  const [content, setContent] = useState<string>();
  const { sendMessage } = useContext(WaitingRoomContext);

  return (
    <TextFieldContainer>
      <TextField onChange={e => setContent(e.target.value)} />
      <Button onClick={() => sendMessage(content)}>입력</Button>
    </TextFieldContainer>
  );
};

const TextField = styled.input`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 18px;
  height: 100%;
`;

const TextFieldContainer = styled.div`
  width: 100%;
  height: 60px;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 50px 0 20px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 40px;
  height: 20px;
  position: absolute;
  right: 15px;
  border: none;
  background-color: transparent;
  color: #8a8a8a;
  cursor: pointer;
`;

export { ChatTextField };