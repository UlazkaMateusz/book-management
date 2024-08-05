import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookFilterValues } from "../../pages/MyBooks/ui/BookFilter/BookFilter";

interface MyBookSearchFiltersState {
  bookFilterValues: BookFilterValues;
}

const initialState: MyBookSearchFiltersState = {
  bookFilterValues: {},
};

export const myBookSearchFiltersSlice = createSlice({
  name: "myBookSearchFilters",

  initialState: initialState,
  reducers: {
    setMyBooksFilters: (state, action: PayloadAction<BookFilterValues>) => {
      state.bookFilterValues = action.payload;
    },
  },
});

export const { setMyBooksFilters } = myBookSearchFiltersSlice.actions;
export default myBookSearchFiltersSlice.reducer;
