import { BookList } from "../features/BookList";
import { BookSearchBar, BookSearchBarValues } from "../features/BookSearchBar";
import { useSearchBooks } from "../hooks/useSearchBooks";
import { RenderingError } from "../types/RenderingError";

export const SearchPage = () => {
  const { data, error, isFetching, setValues, status, getValues } =
    useSearchBooks();

  const onSubmit = (values: BookSearchBarValues) => {
    const newValues = Object.entries(values).filter(([, value]) => !!value);
    setValues(newValues);
  };

  if (error) {
    throw new RenderingError("Failed to fetch data", 400);
  }

  const values = getValues();

  const initialValues = {
    title: values.title ?? "",
    author: values.author ?? "",
    year: values.year ? values.year.toString() : "",
  };

  return (
    <>
      <BookSearchBar
        initialValues={initialValues}
        status={status}
        onSubmit={onSubmit}
      ></BookSearchBar>

      <BookList data={data} isFetching={isFetching}></BookList>
    </>
  );
};
