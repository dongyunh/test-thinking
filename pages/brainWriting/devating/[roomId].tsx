import React, { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { InteractivePage, WaitingRoom } from '../../../src/components/common';
// import { SelectHat, DevatingRoom } from '../../../src/components/layout/SixHat';y
import { useAppDispatch, useAppSelector } from '../../../src/redux/hooks';
import {
  updateCurrentPage,
  updateNickname,
  brainWritingSelector,
} from '../../../src/redux/modules/brainWriting';
import { NicknameModal } from '../../../src/components/common';
import { ChattingRoom } from '../../../src/components/common';
import axios from 'axios';
import CommentIcon from '@mui/icons-material/Comment';
import styled from 'styled-components';
import useSocketHook from '../../../src/hooks/useSocketHook';
import { makeStyles } from '@mui/styles';
import { themedPalette } from '../../../src/theme';

const useStyles = makeStyles({
  icon: {
    color: '#FFFFFF',
  },
});

//TODO : any 수정하기
export const WaitingRoomContext = createContext<any>(null);

export type message = {
  nickname: string;
  content: string;
};

type SettingPageProps = {
  roomId: string;
};

let ConnectedSocket: any;

const SettingPage = ({ roomId }: SettingPageProps) => {
  const dispatch = useAppDispatch();
  const { currentPage, nickname } = useAppSelector(brainWritingSelector);
  const [_nickname, setNickname] = useState<string>();
  const [subject, setSubject] = useState();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const localSenderId = localStorage.getItem('senderId');
  const [senderId, setSenderId] = useState(localSenderId ? Number(localSenderId) : null);
  const HandleSocket = useSocketHook('sixhat');
  const router = useRouter();
  const classes = useStyles();

  console.log(nickname);
  console.log(roomId);

  useEffect(() => {
    if (nickname) {
      ConnectedSocket = new HandleSocket('http://13.125.59.252/websocket');
      ConnectedSocket.connectSH(senderId, roomId);
    }
  }, [nickname]);

  const sendHatData = (hat: string) => {
    ConnectedSocket.sendHatData(nickname, hat);
  };

  const sendMessage = (message: string) => {
    ConnectedSocket.sendMessage(nickname, message);
  };

  const handleNextPage = (pageNum: number) => {
    dispatch(updateCurrentPage(pageNum));
  };

  const handleSubmitSubject = () => {
    // dispatch(changeIsSubmitState(true));
    ConnectedSocket.sendSubject(subject);
  };

  const handleUpdateNickname = async (enteredName: string) => {
    await axios
      .post(`http://52.78.192.124/api/brainwriting/user/nickname/${roomId}`, {
        // bwRoomid: roomId,
        nickname: enteredName,
      })
      .then(res => {
        console.log(res);
        localStorage.setItem('senderId', res.data.userId);
        setSenderId(res.data.userId);
        dispatch(updateNickname(enteredName));
      });
  };

  const pages = [
    {
      component: (
        <WaitingRoom
          onClickSubmit={handleSubmitSubject}
          onClickComplete={() => handleNextPage(1)}
        />
      ),
    },
    // {
    //   component: <SelectHat onClick={sendHatData} onClickComplete={() => handleNextPage(2)} />,
    // },
    // {
    //   component: <DevatingRoom />,
    // },
  ];

  const contextValue = {
    setSubject: setSubject,
    sendMessage,
  };

  return (
    <WaitingRoomContext.Provider value={contextValue}>
      <InteractivePage pages={pages} currentPage={currentPage} />
      {!nickname && <NicknameModal title="항해7팀" onClick={handleUpdateNickname} />}
      <ChatIcon onClick={() => setIsChatOpen(!isChatOpen)}>
        <CommentIcon className={classes.icon} />
      </ChatIcon>
      {isChatOpen && (
        <ChattingContainer>
          <ChattingRoom
            myNickname={nickname}
            // chatHistory={chatHistory}
            onClick={() => setIsChatOpen(!isChatOpen)}
          />
        </ChattingContainer>
      )}
    </WaitingRoomContext.Provider>
  );
};

export default SettingPage;

const ChatIcon = styled.div`
  position: fixed;
  right: 70px;
  bottom: 70px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: #c4c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const ChattingContainer = styled.div`
  position: fixed;
  right: 70px;
  bottom: 100px;
`;

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  const { roomId } = query;
  console.log(roomId);
  return {
    props: {
      roomId,
    },
  };
};
