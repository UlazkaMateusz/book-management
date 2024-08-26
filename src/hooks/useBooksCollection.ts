import { BookStorageType } from "../types/BookStorageType";
import { useLocalStorage } from "./useLocalStorage";

const booksCollectionLocalStorageKey = "booksCollection";

export const useBooksCollection = () => {
  return useLocalStorage<BookStorageType[]>(booksCollectionLocalStorageKey, []);
};
