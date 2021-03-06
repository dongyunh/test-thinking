import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  updateCurrentPage,
  sixHatSelector,
  updateAdminState,
  getMessages,
  getUserHatInfo,
} from '../redux/modules/sixHat';

import { UserData } from '@redux/modules/sixHat/types';

export type ResponseData = {
  type: 'ENTER' | 'TALK' | 'HAT' | 'QUIT' | 'SUBJECT';
  roomId: string | null;
  sender: string | null;
  senderId: number | null;
  hat: string | null;
  message: string | null;
};

export default function useSocketHook(type: 'sixhat' | 'brainwriting') {
  const dispatch = useAppDispatch();
  const _api = type == 'sixhat' ? '/subSH/api/sixHat/rooms/' : '/sub/api/brainWriting/rooms/';
  const _messageApi =
    type == 'sixhat' ? '/pubSH/api/sixHat/chat/message' : '/pub/api/brainWriting/chat/message';

  class HandleSocket {
    SockJs;
    StompClient: Stomp.Client;
    _roomId: string | null;
    _senderId: number | null;

    constructor(url: string) {
      this.SockJs = new SockJS(url);
      this.StompClient = Stomp.over(this.SockJs);
      this._roomId = null;
      this._senderId = null;
    }

    connectSH(senderId: number | null, roomId: string) {
      this._senderId = senderId;
      this._roomId = roomId[0];

      this.StompClient.connect({ senderId: this._senderId }, () => {
        this.StompClient.subscribe(
          `/subSH/api/sixHat/rooms/${roomId}`,
          data => {
            const response: ResponseData = JSON.parse(data.body) as ResponseData;
            if (response.type === 'TALK') {
              const newMessage = {
                nickname: response.sender,
                message: response.message,
              };
              dispatch(getMessages(newMessage));
            }

            if (response.type === 'HAT') {
              const userInfo : UserData = {
                nickname: response.sender,
                hat: response.hat,
              };
              dispatch(getUserHatInfo(userInfo));
            }
          },
          { senderId: this._senderId },
        );
      });
    }

    // ???????????? ????????? ??? ?????? ???????????? ??????
    waitForConnection = (ws: any, callback: any) => {
      setTimeout(() => {
        if (ws.ws.readyState === 1) {
          callback();
        } else {
          this.waitForConnection(ws, callback);
        }
      }, 0.1);
    };

    send = (data: ResponseData) => {
      this.waitForConnection(this.StompClient, () => {
        this.StompClient.debug = () => {};
        console.log(data);
        this.StompClient.send(
          '/pubSH/api/sixHat/chat/message',
          { senderId: this._senderId },
          JSON.stringify(data),
        );
      });
    };

    sendMessage = (sender: string, message: string) => {
      try {
        // send??? ?????????
        const data: ResponseData = {
          type: 'TALK',
          roomId: this._roomId,
          sender: sender,
          senderId: this._senderId,
          hat: null,
          message: message,
        };
        this.send(data);
      } catch (e) {
        console.log('message ?????? ?????? ??????', e);
      }
    };

    sendHatData = (sender: string | null, hat: string) => {
      try {
        // send??? ?????????
        const data: ResponseData = {
          type: 'HAT',
          roomId: this._roomId,
          sender: sender,
          senderId: this._senderId,
          hat: hat,
          message: null,
        };
        this.send(data);
      } catch (e) {
        console.log('message ?????? ?????? ??????', e);
      }
    };

    submitSubject = (subject: string) => {
      try {
        // send??? ?????????
        const data: ResponseData = {
          type: 'SUBJECT',
          roomId: this._roomId,
          sender: null,
          senderId: this._senderId,
          hat: null,
          message: null,
        };
        this.send(data);
      } catch (e) {
        console.log('message ?????? ?????? ??????', e);
      }
    };
  }

  return HandleSocket;
}
