import { Button, Col, Container, Row } from "react-bootstrap";
import { BookDetailsRecordsData } from "../../types/BookDetailsResponse";
import { CenteredSpinner } from "../../shared/CenteredSpinner";

export interface BookDetailsParams {
  imageLoading: boolean;
  recordData: BookDetailsRecordsData;
  handleImageOnLoad: () => void;
  isFavourite: boolean;
  handleFavouriteButton: () => void;
}

export const BookDetails = ({
  imageLoading,
  recordData,
  handleImageOnLoad,
  isFavourite,
  handleFavouriteButton,
}: BookDetailsParams) => {
  return (
    <Container>
      <Row>
        <Col>
          <Row className="m-1">Title: {recordData.title}</Row>
          <Row className="m-1">
            Authors:{" "}
            {recordData.authors.map((author) => author.name).join(", ")}
          </Row>
          <Row className="m-1">Publish date: {recordData.publish_date}</Row>
          <Row className="m-1">
            <Button onClick={handleFavouriteButton}>
              {isFavourite ? "Remove from favourites" : "Add to favourites"}
            </Button>
          </Row>
        </Col>
        <Col>
          {recordData.cover && (
            <>
              <div style={{ display: imageLoading ? "block" : "none" }}>
                <CenteredSpinner></CenteredSpinner>
              </div>
              <img
                style={{ display: imageLoading ? "none" : "block" }}
                src={recordData.cover.medium}
                onLoad={handleImageOnLoad}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
