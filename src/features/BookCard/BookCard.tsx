import { Card, Placeholder } from "react-bootstrap";
import { useBookDetailsQuery } from "../../api/BookApi";
import { useState } from "react";
import { CenteredSpinner } from "../../shared/CenteredSpinner";
import { useNavigate } from "react-router-dom";

export interface BookCardParams {
  bookKey: string;
}

export const BookCard = ({ bookKey }: BookCardParams) => {
  const { isLoading, data } = useBookDetailsQuery(bookKey);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const navigate = useNavigate();

  const handleOnImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleOnClick = () => {
    navigate(bookKey);
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
      {data && (
        <Card.Img
          style={{ display: isImageLoading ? "none" : "block" }}
          variant="top"
          src={`https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`}
          onLoad={handleOnImageLoad}
        />
      )}
      <Card.Body>
        {isLoading ? (
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={12}></Placeholder>
          </Placeholder>
        ) : (
          <Card.Title>{data?.title}</Card.Title>
        )}
      </Card.Body>
    </Card>
  );
};
