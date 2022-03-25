import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type SelectWordPayload = {
  word: string;
  idx: number;
};

const prefix = 'randomWord';

export const updateCurrentPage = createAction<number>(`${prefix}/UPDATE_CURRENT_PAGE`);
export const selectWord = createAction<SelectWordPayload>(`${prefix}/SELECT_WORD`);
export const getSubject = createAction<string>(`${prefix}/GET_SUBJECT`);

export const getRandomWord = createAsyncThunk(`${prefix}/GET_RANDOM_WORD`, async () => {
  const response = await axios.get('http://13.125.231.85/randomword');
  return response.data;
});

export const postPickedWords = createAsyncThunk(
  `${prefix}/POST_PICKED_WORDS`,
  async (arg, { getState }) => {
    const { randomWord } = getState() as RootState;
    const { pickedWordList } = randomWord;
    const response = await axios.post('http://13.125.231.85/randomword', {
      wordList: pickedWordList,
    });

    console.log(response);
  },
);
