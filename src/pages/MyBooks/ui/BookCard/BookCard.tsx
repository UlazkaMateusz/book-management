import { Card, Placeholder } from "react-bootstrap";
import { useBookDetailsQuery } from "@/api/bookApi";
import { useState } from "react";
import { CenteredSpinner } from "@/shared/CenteredSpinner";
import { useNavigate } from "react-router-dom";

export interface BookCardProps {
  bookKey: string;
}

export const BookCard = ({ bookKey }: BookCardProps) => {
  const { isLoading, data } = useBookDetailsQuery(bookKey);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const navigate = useNavigate();

  const handleOnImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleOnClick = () => {
    navigate(bookKey);
  };

  const image_src = data?.covers?.length
    ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`
    : "https://placehold.co/400x600.png";

  return (
    <Card style={{ width: "18rem", cursor: "pointer" }} onClick={handleOnClick}>
      <div
        style={{
          display: isImageLoading ? "flex" : "none",
          height: "18rem",
          alignItems: "center",
        }}
      >
        <CenteredSpinner />
      </div>
      <Card.Img
        style={{ display: isImageLoading ? "none" : "block" }}
        variant="top"
        src={isLoading ? "" : image_src}
        onLoad={handleOnImageLoad}
      />
      <Card.Body>
        {isLoading ? (
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        ) : (
          <Card.Title>{data?.title}</Card.Title>
        )}
      </Card.Body>
    </Card>
  );
};
