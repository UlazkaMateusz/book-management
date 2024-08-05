import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/bookApi";
import { myBookSearchFiltersReducer } from "./entities/myBooksSearchFilters/myBookSearchFiltersSlice";
import { bookSearchReducer } from "./entities/bookSearch/bookSearchSlice";

const store = configureStore({
  reducer: combineReducers({
    bookSearch: bookSearchReducer,
    myBookSearchFilters: myBookSearchFiltersReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  }),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
