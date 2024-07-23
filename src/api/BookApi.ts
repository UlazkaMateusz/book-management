import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookSearchResponse } from "../types/BookSearchResponse";
import { BookDetails } from "../types/BookDetailsResponse";

interface SearchBooksQuery {
  title?: string;
  author?: string;
  year?: number;
}

interface BookDetailsQuery {
  bookKey: string;
}

const corsAnywhereProxy = "http://localhost:8080";
export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${corsAnywhereProxy}/https://openlibrary.org`,
  }),
  endpoints: (builder) => ({
    searchBooks: builder.mutation<BookSearchResponse, SearchBooksQuery>({
      query: ({ title, author, year }) => {
        let urlParts = [];

        if (title) {
          urlParts.push(`title=${title}`);
        }
        if (author) {
          urlParts.push(`author=${author}`);
        }
        if (year) {
          urlParts.push(`year=${year}`);
        }

        return "search.json?" + urlParts.join("&");
      },
    }),

    bookDetails: builder.query<BookDetails, BookDetailsQuery>({
      query: ({ bookKey }) => `${bookKey}.json`,
    }),
  }),
});

export const { useSearchBooksMutation, useBookDetailsQuery } = bookApi;
