import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/bookApi";
import myBookSearchFiltersReducer, {
  myBookSearchFiltersSlice,
} from "./entities/myBooksSearchFilters/myBookSearchFiltersSlice";
import bookSearchReducer, {
  bookSearchSlice,
} from "./entities/bookSearch/bookSearchSlice";

const store = configureStore({
  reducer: combineReducers({
    [bookSearchSlice.name]: bookSearchReducer,
    [myBookSearchFiltersSlice.name]: myBookSearchFiltersReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  }),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
