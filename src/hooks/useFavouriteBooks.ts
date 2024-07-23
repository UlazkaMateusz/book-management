import { useEffect, useState } from "react";
import { BookIdentifier } from "../types/BookSearchResponse";

const favouriteBooksLocalStorageKey = "favouriteBooks";

export const useFavouriteBooks = () => {
  const [books, setBooks] = useState(() => {
    const books = localStorage.getItem(favouriteBooksLocalStorageKey);

    // @ts-ignore JSON.parse properly handles null. If null is passed then null is returned
    const initialValue = JSON.parse(books);
    return (initialValue || []) as BookIdentifier[];
  });

  useEffect(() => {
    localStorage.setItem(favouriteBooksLocalStorageKey, JSON.stringify(books));
  }, [books, setBooks]);

  return [books, setBooks] as const;
};
