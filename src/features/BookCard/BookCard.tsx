import { Card, Container, Placeholder } from "react-bootstrap";
import { useBookDetailsQuery } from "../../api/BookApi";
import { BookDetailsRecordsData } from "../../types/BookDetailsResponse";
import { BookIdentifier } from "../../types/BookSearchResponse";
import { useState } from "react";
import { CenteredSpinner } from "../../shared/CenteredSpinner";
import { useNavigate } from "react-router-dom";

export interface BookCardParams {
  bookIdentifier: BookIdentifier;
}

export const BookCard = ({ bookIdentifier }: BookCardParams) => {
  const { isLoading, data } = useBookDetailsQuery({ ...bookIdentifier });
  const [isImageLoading, setIsImageLoading] = useState(true);
  const navigate = useNavigate();

  const recordData: BookDetailsRecordsData | undefined =
    data?.records[Object.keys(data?.records)[0]]?.data;

  const handleOnImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleOnClick = () => {
    navigate(`/${bookIdentifier.idType}/${bookIdentifier.id}`);
  };

  return (
    <Card style={{ width: "18rem" }} onClick={handleOnClick}>
      <div
        style={{
          display: isImageLoading ? "flex" : "none",
          height: "18rem",
          alignItems: "center",
        }}
      >
        <CenteredSpinner></CenteredSpinner>
      </div>
      <Card.Img
        style={{ display: isImageLoading ? "none" : "block" }}
        variant="top"
        src={recordData?.cover.medium}
        onLoad={handleOnImageLoad}
      />
      <Card.Body>
        {isLoading ? (
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={12}></Placeholder>
          </Placeholder>
        ) : (
          <Card.Title>{recordData?.title}</Card.Title>
        )}
      </Card.Body>
    </Card>
  );
};
