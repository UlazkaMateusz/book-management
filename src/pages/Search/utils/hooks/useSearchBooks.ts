import { useCallback, useEffect } from "react";
import { useLazySearchBooksQuery } from "@/api/bookApi";
import { RenderingError } from "@/types/RenderingError";
import { useReduxSearchParams } from "@/hooks/useReduxSearchParams";
import { SearchParams } from "@/entities/bookSearch/types/SearchParams";
import { setSearchParams } from "@/entities/bookSearch/bookSearchSlice";

const searchBooksFromUrlParams = (urlParams: URLSearchParams): SearchParams => {
  const year = urlParams.get("year");
  return {
    author: urlParams.get("author") ?? undefined,
    title: urlParams.get("title") ?? undefined,
    year: year ? parseInt(year, 10) : undefined,
  };
};
export const useSearchBooks = () => {
  const [fetchSearchData, { data, error, status, isFetching }] =
    useLazySearchBooksQuery();

  const action = useCallback(
    (payload: SearchParams) => setSearchParams(payload),
    [],
  );

  const [params, setParams] = useReduxSearchParams(
    (state) => state.bookSearch.searchParams,
    action,
    searchBooksFromUrlParams,
  );

  useEffect(() => {
    if (params.author || params.title || params.year) {
      fetchSearchData(
        {
          author: params.author,
          title: params.title,
          year: params.year,
        },
        true,
      );
    }
  }, [params, fetchSearchData]);

  if (error) {
    throw new RenderingError("Failed to fetch data", 400);
  }

  return {
    searchParams: params,
    setValues: (v: SearchParams) => setParams(v),
    isFetching,
    data,
    error,
    status,
  };
};
