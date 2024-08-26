import { useBooksCollection } from "@/hooks/useBooksCollection";
import { useFavouriteBooks } from "@/hooks/useFavouriteBooks";
import { isBookFilteredOut } from "@/pages/MyBooks/utils/isBookFiteredOut";
import { useAppSelector } from "@/hooks/redux";
import { BookCard } from "@/pages/MyBooks/ui/BookCard";

export const BookCardContainer = () => {
  const { books: favouriteBooks } = useFavouriteBooks();
  const [booksCollection] = useBooksCollection();

  const filter = useAppSelector(
    (state) => state.myBookSearchFilters.bookFilterValues,
  );

  const books = favouriteBooks.filter((book) =>
    isBookFilteredOut(book, filter, booksCollection),
  );

  return (
    <>
      {books.map((favouriteBook) => (
        <BookCard key={favouriteBook.key} bookKey={favouriteBook.key} />
      ))}
    </>
  );
};
