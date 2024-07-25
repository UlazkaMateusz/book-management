import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useSearchBooksMutation } from "../api/BookApi";
import { useEffect } from "react";

export const useSearchBooks = () => {
  const [fetchSearchData, { isLoading, data, error, status }] =
    useSearchBooksMutation();

  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchParamValues = () => {
    const author = searchParams.get("author") ?? undefined;
    const title = searchParams.get("title") ?? undefined;

    const year_param = searchParams.get("year");
    const year = year_param ? parseInt(year_param, 10) : undefined;

    return {
      author,
      title,
      year,
    };
  };

  useEffect(() => {
    const values = getSearchParamValues();

    if (values.author || values.title || values.year) {
      fetchSearchData({
        author: values.author,
        title: values.title,
        year: values.year,
      });
    }
  }, [searchParams]);

  return {
    getValues: getSearchParamValues,
    setValues: (v: URLSearchParamsInit) => setSearchParams(v),
    isLoading,
    data,
    error,
    status,
  };
};
