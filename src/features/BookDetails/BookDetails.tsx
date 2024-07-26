import { Button, Col, Container, Placeholder, Row } from "react-bootstrap";
import { BookDetailsResponse } from "../../types/BookDetailsResponse";
import { CenteredSpinner } from "../../shared/CenteredSpinner";
import { AuthorDetailsResponse } from "../../types/AuthorDetailsResponse";
import { useState } from "react";
import { useFavouriteBooks } from "../../hooks/useFavouriteBooks";

export interface BookDetailsParams {
  bookDetailsResponse: BookDetailsResponse;
  authors: AuthorDetailsResponse[];
  areAuthorsLoading: boolean;
}

export const BookDetails = ({
  bookDetailsResponse,
  authors,
  areAuthorsLoading,
}: BookDetailsParams) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [favouriteBooks, setFavouriteBooks] = useFavouriteBooks();

  const handleImageOnLoad = () => {
    setImageLoading(false);
  };

  const isFavourite = !!favouriteBooks.find(
    (favouriteBook) => favouriteBook.key == bookDetailsResponse.key
  );

  const handleFavouriteButton = () => {
    if (isFavourite) {
      setFavouriteBooks(
        favouriteBooks.filter(
          (favouriteBook) => favouriteBook.key !== bookDetailsResponse.key
        )
      );
    } else {
      const newFavouriteBooks = [
        ...favouriteBooks,
        {
          key: bookDetailsResponse.key,
          title: bookDetailsResponse.title,
          authors: authors.map((a) => a.name),
        },
      ];
      setFavouriteBooks(newFavouriteBooks);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Row className="m-1">Title: {bookDetailsResponse.title}</Row>
          <Row className="m-1">
            Authors:{" "}
            {authors.length ? (
              authors.map((a) => a.name).join(", ")
            ) : (
              <Placeholder xs={6}></Placeholder>
            )}
          </Row>
          <Row className="m-1">
            Publish date: {bookDetailsResponse.first_publish_date}
          </Row>
          <Row className="m-1">
            <Button
              onClick={handleFavouriteButton}
              disabled={areAuthorsLoading}
            >
              {isFavourite ? "Remove from favourites" : "Add to favourites"}
            </Button>
          </Row>
        </Col>
        <Col>
          {bookDetailsResponse.covers?.length && (
            <>
              <div style={{ display: imageLoading ? "block" : "none" }}>
                <CenteredSpinner></CenteredSpinner>
              </div>
              <img
                style={{ display: imageLoading ? "none" : "block" }}
                src={`https://covers.openlibrary.org/b/id/${bookDetailsResponse.covers[0]}-M.jpg`}
                onLoad={handleImageOnLoad}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
