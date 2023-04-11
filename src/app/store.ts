import { configureStore } from '@reduxjs/toolkit';

import searchResultReducer from './searchResultSlice';
import featuredResultReducer from './featuredResultSlice';

const store = configureStore({
  reducer: {
    searchResult: searchResultReducer,
    featuredResult: featuredResultReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
