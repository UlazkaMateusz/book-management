import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookSearchResponse } from "../../api/types";

interface BookSearchState {
  isFetching: boolean;
  data?: BookSearchResponse;
}

const initialState: BookSearchState = {
  isFetching: false,
};

export const bookSearchSlice = createSlice({
  name: "bookSearch",

  initialState: initialState,
  reducers: {
    setBookSearchFetching: (state) => {
      state.isFetching = true;
    },
    setBookSearchData: (state, action: PayloadAction<BookSearchResponse>) => {
      state.isFetching = false;
      state.data = action.payload;
    },
  },
});

export const { setBookSearchFetching, setBookSearchData } =
  bookSearchSlice.actions;
export default bookSearchSlice.reducer;
