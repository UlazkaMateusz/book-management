import { BookStorageType } from "@/types/BookStorageType";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const booksCollectionLocalStorageKey = "booksCollection";

export const useBooksCollection = () => {
  return useLocalStorage<BookStorageType[]>(booksCollectionLocalStorageKey, []);
};
