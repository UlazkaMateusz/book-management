import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useBooksCollection } from "../../../../hooks/useBooksCollection";
import { useFavouriteBooks } from "../../../../hooks/useFavouriteBooks";
import { isBookFilteredOut } from "../../utils/isBookFiteredOut";
import { BookCard } from "../BookCard/BookCard";

export const BookCardContainer = () => {
  const { books: favouriteBooks } = useFavouriteBooks();
  const [booksCollection] = useBooksCollection();

  const filter = useSelector(
    (state: RootState) => state.myBookSearchFilters.bookFilterValues
  );

  const books = favouriteBooks.filter((book) =>
    isBookFilteredOut(book, filter, booksCollection)
  );

  return (
    <>
      {" "}
      {books.map((favouriteBook) => (
        <BookCard
          key={favouriteBook.key}
          bookKey={favouriteBook.key}
        ></BookCard>
      ))}
    </>
  );
};
