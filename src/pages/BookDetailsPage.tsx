import { NavLink, useParams } from "react-router-dom";
import { useBookDetailsQuery } from "../api/BookApi";
import { Button } from "react-bootstrap";
import { CenteredSpinner } from "../shared/CenteredSpinner";
import { BookDetails } from "../features/BookDetails";
import { PersonalRating } from "../features/PersonalRating/PersonalRating";
import { useGetAuthorsDetails } from "../hooks/useGetAuthorsDetails";
import { RenderingError } from "../types/RenderingError";

export const BookDetailPage = () => {
  const { bookKeyPart } = useParams();
  const {
    trigger,
    authors,
    isLoading: areAuthorsLoading,
  } = useGetAuthorsDetails();

  if (!bookKeyPart) {
    throw new RenderingError("Invalid key", 404);
  }

  const bookKey = `/works/${bookKeyPart}`;
  const { data, error, isLoading } = useBookDetailsQuery(bookKey);

  if (isLoading) {
    return <CenteredSpinner></CenteredSpinner>;
  }

  if (error) {
    throw new RenderingError("Failed to fetch data", 404);
  }

  if (!data) {
    throw new RenderingError("Data is missing", 404);
  }

  trigger(data);

  return (
    <>
      <BookDetails
        bookDetailsResponse={data}
        areAuthorsLoading={areAuthorsLoading}
        authors={authors}
      ></BookDetails>
      <PersonalRating bookDetailsResponse={data}></PersonalRating>
      <Button variant="secondary">
        <NavLink to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
          Go to search
        </NavLink>
      </Button>
    </>
  );
};
