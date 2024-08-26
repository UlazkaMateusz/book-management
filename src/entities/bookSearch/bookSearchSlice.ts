import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookSearchResponse } from "@/api/types";
import { BookSearchState } from "@/entities/bookSearch/types/BookSearchState";
import { SearchParams } from "@/entities/bookSearch/types/SearchParams";

const initialState: BookSearchState = {
  isFetching: false,
  searchParams: {},
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
    setSearchParams: (state, action: PayloadAction<SearchParams>) => {
      state.searchParams = action.payload;
    },
  },
});

export const { setBookSearchFetching, setBookSearchData, setSearchParams } =
  bookSearchSlice.actions;
export default bookSearchSlice.reducer;
