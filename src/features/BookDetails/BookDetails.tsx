import { Button, Col, Container, Placeholder, Row } from "react-bootstrap";
import { BookDetailsResponse } from "../../types/BookDetailsResponse";
import { CenteredSpinner } from "../../shared/CenteredSpinner";
import { AuthorDetailsResponse } from "../../types/AuthorDetailsResponse";

export interface BookDetailsParams {
  imageLoading: boolean;
  bookDetailsResponse: BookDetailsResponse;
  handleImageOnLoad: () => void;
  isFavourite: boolean;
  authors: AuthorDetailsResponse[];
  areAuthorsLoading: boolean;
  handleFavouriteButton: () => void;
}

export const BookDetails = ({
  imageLoading,
  bookDetailsResponse,
  handleImageOnLoad,
  isFavourite,
  handleFavouriteButton,
  authors,
  areAuthorsLoading,
}: BookDetailsParams) => {
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
          {bookDetailsResponse.covers[0] && (
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
