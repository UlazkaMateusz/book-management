import { useEffect, useState } from "react";
import { BookDetailsResponse } from "../../types/BookDetailsResponse";
import { AuthorDetailsResponse } from "../../types/AuthorDetailsResponse";
import { useLazyAuthorDetailsQuery } from "../../api/BookApi";

export const useGetAuthorsDetails = (
  bookDetailsResponse: BookDetailsResponse
) => {
  const [authors, setAuthors] = useState([] as AuthorDetailsResponse[]);
  const [trigger] = useLazyAuthorDetailsQuery();

  useEffect(() => {
    const fetchAuthorsData = async () => {
      let authorsDetails = [];
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
    };

    fetchAuthorsData().catch(console.error);
  }, []);

  return authors;
};
