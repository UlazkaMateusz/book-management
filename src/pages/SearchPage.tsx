import { BookList } from "../features/BookList";
import { BookSearchBar, BookSearchBarValues } from "../features/BookSearchBar";
import { useSearchBooks } from "../hooks/useSearchBooks";

export const SearchPage = () => {
  const { data, error, isLoading, setValues, status, getValues } =
    useSearchBooks();

  const onSubmit = (values: BookSearchBarValues) => {
    let newValues = Object.entries(values).filter(([, value]) => !!value) as [
      string,
      string
    ][];
    setValues(newValues);
  };

  if (error) {
    console.error(error);
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

      <BookList data={data} isLoading={isLoading}></BookList>
    </>
  );
};
