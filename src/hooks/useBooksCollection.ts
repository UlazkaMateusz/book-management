import { useEffect, useState } from "react";
import { BookStorageType } from "../types/BookStorageType";

const booksCollectionLocalStorageKey = "booksCollection";

export const useBooksCollection = () => {
  const [books, setBooks] = useState(() => {
    const books = localStorage.getItem(booksCollectionLocalStorageKey);

    // @ts-expect-error JSON.parse properly handles null. If null is passed then null is returned
    const initialValue: BookStorageType[] = JSON.parse(books);
    return initialValue || [];
  });

  useEffect(() => {
    localStorage.setItem(booksCollectionLocalStorageKey, JSON.stringify(books));
  }, [books, setBooks]);

  return [books, setBooks] as const;
};
