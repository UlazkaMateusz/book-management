import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthorDetailsResponse,
  BookDetailsResponse,
  BookSearchResponse,
} from "@/api/types";
import {
  setBookSearchData,
  setBookSearchFetching,
} from "@/entities/bookSearch/bookSearchSlice";

interface SearchBooksQuery {
  title?: string;
  author?: string;
  year?: number;
}

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BOOKS_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    searchBooks: builder.query<BookSearchResponse, SearchBooksQuery>({
      query: ({ title, author, year }) => {
        const urlSearchParams = new URLSearchParams();

        if (title) {
          urlSearchParams.append("title", title);
        }
        if (author) {
          urlSearchParams.append("author", author);
        }
        if (year) {
          urlSearchParams.append(
            "q",
            `first_publish_year:[${year} TO ${year}]`,
          );
        }

        return "search.json?" + urlSearchParams.toString();
      },

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(setBookSearchFetching());
        const result = await queryFulfilled;
        dispatch(setBookSearchData(result.data));
      },
    }),

    bookDetails: builder.query<BookDetailsResponse, string>({
      query: (bookKey) => `${bookKey}.json`,
    }),

    authorDetails: builder.query<AuthorDetailsResponse, string>({
      query: (authorKey) => `${authorKey}.json`,
    }),
  }),
});

export const {
  useLazySearchBooksQuery,
  useBookDetailsQuery,
  useLazyAuthorDetailsQuery,
} = bookApi;
