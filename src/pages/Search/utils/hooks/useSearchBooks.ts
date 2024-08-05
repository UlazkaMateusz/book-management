import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useLazySearchBooksQuery } from "../../../../api/bookApi";
import { RenderingError } from "../../../../types/RenderingError";

export const useSearchBooks = () => {
  const [fetchSearchData, { data, error, status, isFetching }] =
    useLazySearchBooksQuery();

  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchParamValues = useCallback(() => {
    const author = searchParams.get("author") ?? undefined;
    const title = searchParams.get("title") ?? undefined;

    const year_param = searchParams.get("year");
    const year = year_param ? parseInt(year_param, 10) : undefined;

    return {
      author,
      title,
      year,
    };
  }, [searchParams]);

  useEffect(() => {
    const values = getSearchParamValues();

    if (values.author || values.title || values.year) {
      fetchSearchData({
        author: values.author,
        title: values.title,
        year: values.year,
      });
    }
  }, [searchParams, fetchSearchData, getSearchParamValues]);

  if (error) {
    throw new RenderingError("Failed to fetch data", 400);
  }

  return {
    getValues: getSearchParamValues,
    setValues: (v: URLSearchParamsInit) => setSearchParams(v),
    isFetching,
    data,
    error,
    status,
  };
};
