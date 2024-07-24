import { useNavigate, useParams } from "react-router-dom";
import { useBookDetailsQuery } from "../api/BookApi";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { CenteredSpinner } from "../shared/CenteredSpinner";
import { BookDetails } from "../features/BookDetails";
import { PersonalRating } from "../features/PersonalRating/PersonalRating";
import { useFavouriteBooks } from "../hooks/useFavouriteBooks";

export const BookDetailPage = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();
  const { bookKeyPart } = useParams();
  const [favouriteBooks, setFavouriteBooks] = useFavouriteBooks();

  if (!bookKeyPart) {
    return "Error: bookKeyPart is null";
  }

  const bookKey = `/works/${bookKeyPart}`;
  const [isFavourite, setIsFavourite] = useState(
    () => !!favouriteBooks.find((key) => key == bookKey)
  );

  const { data, isLoading } = useBookDetailsQuery(bookKey);

  const handleOnClick = () => {
    navigate("/");
  };

  const handleImageOnLoad = () => {
    setImageLoading(false);
  };

  const handleFavouriteButton = () => {
    if (isFavourite) {
      setFavouriteBooks(favouriteBooks.filter((key) => key !== bookKey));
      setIsFavourite(false);
    } else {
      const newFavouriteBooks = [...favouriteBooks, bookKey];
      setFavouriteBooks(newFavouriteBooks);
      setIsFavourite(true);
    }
  };

  if (isLoading) {
    return <CenteredSpinner></CenteredSpinner>;
  }

  if (!data) {
    return "Error";
  }

  return (
    <>
      <BookDetails
        imageLoading={imageLoading}
        bookDetailsResponse={data}
        handleImageOnLoad={handleImageOnLoad}
        isFavourite={isFavourite}
        handleFavouriteButton={handleFavouriteButton}
      ></BookDetails>
      <PersonalRating bookKey={data.key}></PersonalRating>
      <Button variant="secondary" onClick={handleOnClick}>
        Go to search
      </Button>
    </>
  );
};
