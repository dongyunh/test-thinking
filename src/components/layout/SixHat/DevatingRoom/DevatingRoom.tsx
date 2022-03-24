import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CenterLayout } from '../../../common';
import { DevatingChatBox } from '../DevatingChatBox';
import { ChatHistoryType } from '../../../../redux/modules/sixHat/types';

export type message = {
  nickname: string;
  content: string;
};

type DevatingRoomProps = {
  chatHistory: ChatHistoryType;
};

const DevatingRoom = ({ chatHistory }: DevatingRoomProps) => {
  return (
    <CenterLayout>
      <DevatingChatBox />
    </CenterLayout>
  );
};

const Grid = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0px;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Empty = styled.div``;

const FixedChattingRoom = styled.div`
  position: fixed;
  right: 100px;
  bottom: 100px;
`;

export { DevatingRoom };
