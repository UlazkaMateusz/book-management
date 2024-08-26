import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CenteredSpinner } from "@/shared/CenteredSpinner";
import { BookDetails } from "@/pages/BookDetails/ui/BookDetails";
import { PersonalRating } from "@/pages/BookDetails/ui/PersonalRating/PersonalRating";
import { useBookKeyParam } from "@/pages/BookDetails/utils/hooks/useBookKeyParam";
import { useGetBookDetails } from "@/pages/BookDetails/utils/hooks/useGetBookDetails";
import { BookDetailsResponse } from "@/api/types";

export const BookDetailPage = () => {
  const bookKey = useBookKeyParam();

  const { data, isLoading } = useGetBookDetails(bookKey);

  if (!isDataLoaded(isLoading, data)) {
    return <CenteredSpinner />;
  }

  return (
    <>
      <BookDetails bookDetailsResponse={data} />
      <PersonalRating bookDetailsResponse={data} />
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
