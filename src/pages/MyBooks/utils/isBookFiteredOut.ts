import { BookStorageType } from "../../../types/BookStorageType";
import { FavouriteBookStorageType } from "../../../types/FavouriteBookStorageType";
import { BookFilterValues } from "../ui/BookFilter/BookFilter";

export const isBookFilteredOut = (
  book: FavouriteBookStorageType,
  filter: BookFilterValues,
  booksCollection: BookStorageType[],
) => {
  let shouldStay = true;
  if (shouldStay && filter.author) {
    shouldStay = book?.authors.some((author) =>
      author.toLocaleLowerCase().includes(filter.author!.toLocaleLowerCase()),
    );
  }

  if (
    shouldStay &&
    filter.readingProgress &&
    filter.readingProgress !== "all books"
  ) {
    const foundBook: BookStorageType | undefined = booksCollection.find(
      (b) => b.key == book?.key,
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
};
