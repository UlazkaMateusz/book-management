import { useFavouriteBooks } from "../hooks/useFavouriteBooks";
import { BookCard } from "../features/BookCard";
import {
  BookFilter,
  BookFilterValues,
} from "../features/BookFilter/BookFilter";
import { useState } from "react";
import { useBooksCollection } from "../hooks/useBooksCollection";
import { BookStorageType } from "../types/BookStorageType";

const initialValues = {
  title: "",
  author: "",
  readingProgress: "all books",
} as BookFilterValues;

export const MyBooksPage = () => {
  const { books: favouriteBooks } = useFavouriteBooks();
  const [booksCollection] = useBooksCollection();
  const [filter, setFilter] = useState({} as BookFilterValues);

  const onSubmit = (data: BookFilterValues) => {
    setFilter(data);
  };

  const books = favouriteBooks.filter((book) => {
    let shouldStay = true;
    if (shouldStay && filter.author) {
      shouldStay = book?.authors.some((author) =>
        author.toLocaleLowerCase().includes(filter.author!.toLocaleLowerCase())
      );
    }

    if (
      shouldStay &&
      filter.readingProgress &&
      filter.readingProgress !== "all books"
    ) {
      const foundBook: BookStorageType | undefined = booksCollection.find(
        (b) => b.key == book?.key
      );
      if (filter.readingProgress == "finished only") {
        shouldStay = foundBook?.readingProgress == "Finished";
      } else if (filter.readingProgress == "unfinished only") {
        shouldStay =
          foundBook?.readingProgress == "Reading" ||
          foundBook?.readingProgress == "Unread" ||
          foundBook === undefined;
      }
    }

    if (shouldStay && filter.title) {
      shouldStay = book.title
        .toLocaleLowerCase()
        .includes(filter.title.toLocaleLowerCase());
    }

    return shouldStay;
  });

  return (
    <>
      <BookFilter
        initialValues={initialValues}
        onSubmit={onSubmit}
      ></BookFilter>
      <div className="d-flex gap-3 mt-5 flex-wrap">
        {books.map((favouriteBook) => (
          <BookCard
            key={favouriteBook.key}
            bookKey={favouriteBook.key}
          ></BookCard>
        ))}
      </div>
    </>
  );
};
