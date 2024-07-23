import { useNavigate, useParams } from "react-router-dom";
import { useBookDetailsQuery } from "../api/BookApi";
import { BookDetailsRecordsData } from "../types/BookDetailsResponse";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { CenteredSpinner } from "../shared/CenteredSpinner";
import { BookDetails } from "../features/BookDetails";
import { PersonalRating } from "../features/PersonalRating/PersonalRating";
import { useFavouriteBooks } from "../hooks/useFavouriteBooks";

export const BookDetailPage = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();
  const { bookKey } = useParams();
  const [favouriteBooks, setFavouriteBooks] = useFavouriteBooks();

  if (!idType || !id) {
    return "Error";
  }

  const [isFavourite, setIsFavourite] = useState(
    () => !!favouriteBooks.find((b) => b.key == bookKey)
  );

  const { data, isLoading } = useBookDetailsQuery({ idType, id });

  const recordData: BookDetailsRecordsData | undefined =
    data?.records[Object.keys(data?.records)[0]]?.data;

  const handleOnClick = () => {
    navigate("/");
  };

  const handleImageOnLoad = () => {
    setImageLoading(false);
  };

  const handleFavouriteButton = () => {
    if (isFavourite) {
      setFavouriteBooks(
        favouriteBooks.filter((b) => !(b.id == id && b.idType == idType))
      );
      setIsFavourite(false);
    } else {
      const newFavouriteBooks = [...favouriteBooks, { id, idType }];
      setFavouriteBooks(newFavouriteBooks);
      setIsFavourite(true);
    }
  };

  if (isLoading) {
    return <CenteredSpinner></CenteredSpinner>;
  }

  if (!recordData) {
    return "Error";
  }

  console.log(recordData);
  console.log(recordData.key);

  return (
    <>
      <BookDetails
        imageLoading={imageLoading}
        recordData={recordData}
        handleImageOnLoad={handleImageOnLoad}
        isFavourite={isFavourite}
        handleFavouriteButton={handleFavouriteButton}
      ></BookDetails>
      <PersonalRating bookKey={recordData.key}></PersonalRating>
      <Button variant="secondary" onClick={handleOnClick}>
        Go to search
      </Button>
    </>
  );
};
