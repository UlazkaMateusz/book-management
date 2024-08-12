import { useCallback, useState } from "react";
import { useLazyAuthorDetailsQuery } from "../../../../api/bookApi";
import {
  AuthorDetailsResponse,
  BookDetailsResponse,
} from "../../../../api/types";

export const useGetAuthorsDetails = () => {
  const [authors, setAuthors] = useState<AuthorDetailsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trigger] = useLazyAuthorDetailsQuery();

  const getAuthorDetailsTrigger = useCallback(
    async (bookDetailsResponse: BookDetailsResponse) => {
      const authorsDetails = [];
      for (const author of bookDetailsResponse.authors) {
        const { data, error } = await trigger(author.author.key, true);

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
