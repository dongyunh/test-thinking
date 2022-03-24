import { createReducer } from '@reduxjs/toolkit';
import { updateCurrentPage, updateNickname, updateAdminState } from './actions';

export type BrainWritingState = {
  currentPage: number;
  nickname: string | null;
  isAdmin: boolean;
};

const initialState: BrainWritingState = {
  currentPage: 0,
  nickname: null,
  isAdmin: false,
};

//createReducer로 reducer 생성.
export const brainWritingReducer = createReducer(initialState, builder => {
  builder
    .addCase(updateCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(updateNickname, (state, action) => {
      state.nickname = action.payload;
    })
    .addCase(updateAdminState, (state, action) => {
      state.isAdmin = action.payload;
    })
});
