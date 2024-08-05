import { useBookDetailsQuery } from "../../../../api/bookApi";
import { RenderingError } from "../../../../types/RenderingError";

export const useGetBookDetails = (bookKey: string) => {
  const { data, error, isLoading } = useBookDetailsQuery(bookKey);

  if (error) {
    throw new RenderingError("Failed to fetch data", 404);
  }

  if (!isLoading && !data) {
    throw new RenderingError("Data is missing", 404);
  }

  return { data, error, isLoading };
};
