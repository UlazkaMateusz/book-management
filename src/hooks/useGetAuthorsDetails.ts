import { useCallback, useState } from "react";
import { BookDetailsResponse } from "../types/BookDetailsResponse";
import { AuthorDetailsResponse } from "../types/AuthorDetailsResponse";
import { useLazyAuthorDetailsQuery } from "../api/BookApi";

export const useGetAuthorsDetails = () => {
  const [authors, setAuthors] = useState([] as AuthorDetailsResponse[]);
  const [isLoading, setIsLoading] = useState(true);
  const [trigger] = useLazyAuthorDetailsQuery();

  const getAuthorDetailsTrigger = useCallback(
    async (bookDetailsResponse: BookDetailsResponse) => {
      const authorsDetails = [];
      for (const author of bookDetailsResponse.authors) {
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
    },
    [trigger]
  );

  return { trigger: getAuthorDetailsTrigger, authors, isLoading };
};
