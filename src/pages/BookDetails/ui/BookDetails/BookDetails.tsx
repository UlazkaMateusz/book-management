import { Col, Container, Placeholder, Row } from "react-bootstrap";
import { useEffect } from "react";
import { BookDetailsResponse } from "../../../../api/types";
import { useGetAuthorsDetails } from "../../utils/hooks/useGetAuthorsDetails";
import { FavouriteBookButton } from "../FavouriteBookButton/FavouriteBookButton";
import { ImageWithPlaceholder } from "../../../../features/ImageWithPlaceholder";

export interface BookDetailsProps {
  bookDetailsResponse: BookDetailsResponse;
}

export const BookDetails = ({ bookDetailsResponse }: BookDetailsProps) => {
  const {
    trigger,
    authors,
    isLoading: areAuthorsLoading,
  } = useGetAuthorsDetails();

  useEffect(() => {
    if (bookDetailsResponse) {
      trigger(bookDetailsResponse);
    }
  }, [bookDetailsResponse, trigger]);

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
              <Placeholder xs={6} />
            )}
          </Row>
          <Row className="m-1">
            Publish date: {bookDetailsResponse.first_publish_date}
          </Row>
          <Row className="m-1">
            <FavouriteBookButton
              areAuthorsLoading={areAuthorsLoading}
              authors={authors}
              bookDetailsResponse={bookDetailsResponse}
            />
          </Row>
        </Col>
        <Col>
          {bookDetailsResponse.covers?.length && (
            <ImageWithPlaceholder
              src={`https://covers.openlibrary.org/b/id/${bookDetailsResponse.covers[0]}-M.jpg`}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};
