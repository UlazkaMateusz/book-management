import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/bookApi";

const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
