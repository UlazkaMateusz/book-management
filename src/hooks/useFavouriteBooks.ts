import { useEffect, useState } from "react";
import { FavouriteBookStorageType } from "../types/FavouriteBookStorageType";

const favouriteBooksLocalStorageKey = "favouriteBooks";

export const useFavouriteBooks = () => {
  const [books, setBooks] = useState(() => {
    const books = localStorage.getItem(favouriteBooksLocalStorageKey);

    // @ts-expect-error JSON.parse properly handles null. If null is passed then null is returned
    const initialValue = JSON.parse(books);
    return (initialValue || []) as FavouriteBookStorageType[];
  });

  useEffect(() => {
    localStorage.setItem(favouriteBooksLocalStorageKey, JSON.stringify(books));
  }, [books, setBooks]);

  return [books, setBooks] as const;
};
