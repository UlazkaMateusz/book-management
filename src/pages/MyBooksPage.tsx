import { useFavouriteBooks } from "../hooks/useFavouriteBooks";
import { BookCard } from "../features/BookCard";
import {
  BookFilter,
  BookFilterValues,
} from "../features/BookFilter/BookFilter";

const initialValues = {
  title: undefined,
  author: undefined,
  readingProgress: "all books",
} as BookFilterValues;

export const MyBooksPage = () => {
  const [favouriteBooks, _] = useFavouriteBooks();

  const onSubmit = () => {};

  return (
    <>
      <BookFilter
        initialValues={initialValues}
        onSubmit={onSubmit}
      ></BookFilter>
      <div className="d-flex gap-3 mt-5">
        {favouriteBooks.map((bookKey) => (
          <BookCard key={bookKey} bookKey={bookKey}></BookCard>
        ))}
      </div>
    </>
  );
};
