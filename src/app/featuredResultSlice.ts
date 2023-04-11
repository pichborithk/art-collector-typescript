import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Record } from '../types/types';

type InitialState = {
  record: Record | null;
};

const initialState: InitialState = {
  record: null,
};

const featuredResultSlice = createSlice({
  name: 'featured',
  initialState,
  reducers: {
    setFeaturedResult(state, action: PayloadAction<Record>) {
      state.record = action.payload;
    },
  },
});

export const { setFeaturedResult } = featuredResultSlice.actions;
export default featuredResultSlice.reducer;
