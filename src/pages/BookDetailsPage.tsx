import { NavLink, useParams } from "react-router-dom";
import { useBookDetailsQuery } from "../api/BookApi";
import { Button } from "react-bootstrap";
import { CenteredSpinner } from "../shared/CenteredSpinner";
import { BookDetails } from "../features/BookDetails";
import { PersonalRating } from "../features/PersonalRating/PersonalRating";
import { useGetAuthorsDetails } from "../hooks/useGetAuthorsDetails";

export const BookDetailPage = () => {
  const { bookKeyPart } = useParams();
  const {
    trigger,
    authors,
    isLoading: areAuthorsLoading,
  } = useGetAuthorsDetails();

  if (!bookKeyPart) {
    return "Error: bookKeyPart is null";
  }

  const bookKey = `/works/${bookKeyPart}`;
  const { data, error, isLoading } = useBookDetailsQuery(bookKey);

  if (isLoading) {
    return <CenteredSpinner></CenteredSpinner>;
  }

  if (error) {
    return "Error: error wass returned";
  }
  if (!data) {
    return "Error: no data";
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
