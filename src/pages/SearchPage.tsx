import { useSearchBooksMutation } from "../api/BookApi";
import { BookList } from "../features/BookList";
import { BookSearchBar, BookSearchBarValues } from "../features/BookSearchBar";

const initialValues = {
  title: "",
  author: "",
  year: undefined,
} as BookSearchBarValues;

export const SearchPage = () => {
  const [fetchSearchData, { isLoading, data, error, status }] =
    useSearchBooksMutation();

  const onSubmit = (values: BookSearchBarValues) => {
    fetchSearchData({
      author: values.author,
      title: values.title,
      year: values.year ? parseInt(values.year, 10) : undefined,
    });
  };

  if (error) {
    console.log(error);
  }

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
