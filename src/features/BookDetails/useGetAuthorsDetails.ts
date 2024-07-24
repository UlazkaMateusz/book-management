import { useEffect, useState } from "react";
import { BookDetailsResponse } from "../../types/BookDetailsResponse";
import { AuthorDetailsResponse } from "../../types/AuthorDetailsResponse";
import { useLazyAuthorDetailsQuery } from "../../api/BookApi";

export const useGetAuthorsDetails = (): [
  (bookDetails: BookDetailsResponse) => void,
  AuthorDetailsResponse[],
  boolean
] => {
  const [authors, setAuthors] = useState([] as AuthorDetailsResponse[]);
  const [isLoading, setIsLoading] = useState(true);
  const [request, setRequest] = useState(
    undefined as BookDetailsResponse | undefined
  );
  const [trigger] = useLazyAuthorDetailsQuery();

  useEffect(() => {
    const fetchAuthorsData = async () => {
      if (!request) {
        return;
      }

      let authorsDetails = [];
      for (const author of request.authors) {
        const { data, error } = await trigger(author.author.key);

        if (error) {
          console.error(error);
        }

        if (data) {
          authorsDetails.push(data);
        }
      }

      setAuthors(authorsDetails);
      setIsLoading(false);
    };

    fetchAuthorsData().catch(console.error);
  }, [request]);

  const dispatch = (bookDetailsResponse: BookDetailsResponse) => {
    if (!request) {
      setRequest(bookDetailsResponse);
    }
  };

  return [dispatch, authors, isLoading];
};
