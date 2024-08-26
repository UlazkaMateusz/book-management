import { Button } from "react-bootstrap";
import { useFavouriteBooks } from "@/hooks/useFavouriteBooks";
import {
  AuthorDetailsResponse,
  BookDetailsResponse,
} from "@/api/types";

interface FavouriteBookButtonProps {
  bookDetailsResponse: BookDetailsResponse;
  authors: AuthorDetailsResponse[];
  areAuthorsLoading: boolean;
}

export const FavouriteBookButton = ({
  bookDetailsResponse,
  authors,
  areAuthorsLoading,
}: FavouriteBookButtonProps) => {
  const {
    books: favouriteBooks,
    addFavourite,
    removeFavourite,
  } = useFavouriteBooks();

  const isFavourite = !!favouriteBooks.find(
    (favouriteBook) => favouriteBook.key == bookDetailsResponse.key,
  );

  const handleFavouriteButton = () => {
    if (isFavourite) {
      removeFavourite(bookDetailsResponse.key);
    } else {
      addFavourite({
        key: bookDetailsResponse.key,
        title: bookDetailsResponse.title,
        authors: authors.map((a) => a.name),
      });
    }
  };

  return (
    <Button onClick={handleFavouriteButton} disabled={areAuthorsLoading}>
      {isFavourite ? "Remove from favourites" : "Add to favourites"}
    </Button>
  );
};
