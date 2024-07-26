import { NavLink, useParams } from "react-router-dom";
import { useBookDetailsQuery } from "../api/BookApi";
import { Button } from "react-bootstrap";
import { CenteredSpinner } from "../shared/CenteredSpinner";
import { BookDetails } from "../features/BookDetails";
import { PersonalRating } from "../features/PersonalRating/PersonalRating";
import { useGetAuthorsDetails } from "../hooks/useGetAuthorsDetails";
import { RenderingError } from "../types/RenderingError";
import { useEffect } from "react";

export const BookDetailPage = () => {
  const { bookKeyPart } = useParams();
  const {
    trigger,
    authors,
    isLoading: areAuthorsLoading,
  } = useGetAuthorsDetails();

  const bookKey = `/works/${bookKeyPart}`;
  const { data, error, isLoading } = useBookDetailsQuery(bookKey);

  useEffect(() => {
    if (data) {
      trigger(data);
    }
  }, [data, trigger]);

  if (isLoading) {
    return <CenteredSpinner></CenteredSpinner>;
  }

  if (error) {
    throw new RenderingError("Failed to fetch data", 404);
  }

  if (!data) {
    throw new RenderingError("Data is missing", 404);
  }

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
