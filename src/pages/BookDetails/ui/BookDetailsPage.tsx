import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CenteredSpinner } from "../../../shared/CenteredSpinner";
import { BookDetails } from "./BookDetails";
import { PersonalRating } from "./PersonalRating/PersonalRating";
import { useBookKeyParam } from "../utils/hooks/useBookKeyParam";
import { useGetBookDetails } from "../utils/hooks/useGetBookDetails";
import { BookDetailsResponse } from "../../../api/types";

export const BookDetailPage = () => {
  const bookKey = useBookKeyParam();

  const { data, isLoading } = useGetBookDetails(bookKey);

  if (!isDataLoaded(isLoading, data)) {
    return <CenteredSpinner></CenteredSpinner>;
  }

  return (
    <>
      <BookDetails bookDetailsResponse={data}></BookDetails>
      <PersonalRating bookDetailsResponse={data}></PersonalRating>
      <Button variant="secondary">
        <NavLink to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
          Go to search
        </NavLink>
      </Button>
    </>
  );
};

const isDataLoaded = (
  isLoading: boolean,
  _data: BookDetailsResponse | undefined,
): _data is BookDetailsResponse => {
  return !isLoading;
};
