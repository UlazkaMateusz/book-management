import { useNavigate, useParams } from "react-router-dom";
import { useBookDetailsQuery } from "../api/BookApi";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { CenteredSpinner } from "../shared/CenteredSpinner";
import { BookDetails } from "../features/BookDetails";
import { PersonalRating } from "../features/PersonalRating/PersonalRating";
import { useFavouriteBooks } from "../hooks/useFavouriteBooks";
import { FavouriteBookStorageType } from "../types/FavouriteBookStorageType";
import { useGetAuthorsDetails } from "../features/BookDetails/useGetAuthorsDetails";

export const BookDetailPage = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();
  const { bookKeyPart } = useParams();
  const [favouriteBooks, setFavouriteBooks] = useFavouriteBooks();
  const [dispatch, authors, areAuthorsLoading] = useGetAuthorsDetails();

  if (!bookKeyPart) {
    return "Error: bookKeyPart is null";
  }

  const bookKey = `/works/${bookKeyPart}`;
  const [isFavourite, setIsFavourite] = useState(
    () => !!favouriteBooks.find((favouriteBook) => favouriteBook.key == bookKey)
  );

  const { data, isLoading } = useBookDetailsQuery(bookKey);

  if (isLoading) {
    return <CenteredSpinner></CenteredSpinner>;
  }

  if (!data) {
    return "Error";
  }

  dispatch(data);

  const handleOnClick = () => {
    navigate("/");
  };

  const handleImageOnLoad = () => {
    setImageLoading(false);
  };

  const handleFavouriteButton = () => {
    if (isFavourite) {
      setFavouriteBooks(
        favouriteBooks.filter((favouriteBook) => favouriteBook.key !== bookKey)
      );
      setIsFavourite(false);
    } else {
      const newFavouriteBooks = [
        ...favouriteBooks,
        {
          key: bookKey,
          title: data.title,
          authors: authors.map((a) => a.name),
        } as FavouriteBookStorageType,
      ];
      setFavouriteBooks(newFavouriteBooks);
      setIsFavourite(true);
    }
  };

  return (
    <>
      <BookDetails
        imageLoading={imageLoading}
        bookDetailsResponse={data}
        handleImageOnLoad={handleImageOnLoad}
        isFavourite={isFavourite}
        handleFavouriteButton={handleFavouriteButton}
        areAuthorsLoading={areAuthorsLoading}
        authors={authors}
      ></BookDetails>
      <PersonalRating bookDetailsResponse={data}></PersonalRating>
      <Button variant="secondary" onClick={handleOnClick}>
        Go to search
      </Button>
    </>
  );
};
