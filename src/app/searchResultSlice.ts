import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SearchResults } from '../types/types';
import {
  fetchQueryResults,
  fetchQueryResultsFromURL,
  fetchQueryResultsFromTermAndValue,
} from '../api';

type InitialState = {
  loading: boolean;
  error: string;
  result: SearchResults;
};

const initialState: InitialState = {
  loading: false,
  error: '',
  result: {
    info: {},
    records: [],
  },
};

const fetchSearch = createAsyncThunk('search/fetchSearch', fetchQueryResults);

const fetchPage = createAsyncThunk(
  'search/fetchPage',
  fetchQueryResultsFromURL
);

const fetchTerm = createAsyncThunk(
  'search/fetchTerm',
  fetchQueryResultsFromTermAndValue
);

const searchResultSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* ----------------------------------------- fetchSearch ---------------------------------------- */

    builder.addCase(fetchSearch.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchSearch.fulfilled,
      (state, action: PayloadAction<SearchResults>) => {
        state.loading = false;
        state.error = '';
        state.result = action.payload;
      }
    );

    builder.addCase(fetchSearch.rejected, (state) => {
      state.loading = false;
      state.result = {
        info: {},
        records: [],
      };
      state.error = 'Something went wrong';
    });

    /* ----------------------------------------- fetchSearch ---------------------------------------- */

    /* ------------------------------------------ fetchPage ----------------------------------------- */

    builder.addCase(fetchPage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchPage.fulfilled,
      (state, action: PayloadAction<SearchResults>) => {
        state.loading = false;
        state.error = '';
        state.result = action.payload;
      }
    );

    builder.addCase(fetchPage.rejected, (state) => {
      state.loading = false;
      state.result = {
        info: {},
        records: [],
      };
      state.error = 'Something went wrong';
    });

    /* ------------------------------------------ fetchPage ----------------------------------------- */

    /* ------------------------------------------ fetchTerm ----------------------------------------- */

    builder.addCase(fetchTerm.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchTerm.fulfilled,
      (state, action: PayloadAction<SearchResults>) => {
        state.loading = false;
        state.error = '';
        state.result = action.payload;
      }
    );

    builder.addCase(fetchTerm.rejected, (state) => {
      state.loading = false;
      state.result = {
        info: {},
        records: [],
      };
      state.error = 'Something went wrong';
    });

    /* ------------------------------------------ fetchTerm ----------------------------------------- */
  },
});

export { fetchSearch, fetchPage, fetchTerm };
export default searchResultSlice.reducer;
