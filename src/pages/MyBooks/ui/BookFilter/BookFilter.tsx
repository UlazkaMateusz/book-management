import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setMyBooksFilters } from "../../../../entities/myBooksSearchFilters/myBookSearchFiltersSlice";

export interface BookFilterValues {
  title?: string;
  author?: string;
  readingProgress?: "all books" | "unfinished only" | "finished only";
}

const initialValues: BookFilterValues = {
  title: "",
  author: "",
  readingProgress: "all books",
};

export const BookFilter = () => {
  const dispatch = useDispatch();

  const onSubmit = (data: BookFilterValues) => {
    dispatch(setMyBooksFilters(data));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              value={values.title}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="title">Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              onChange={handleChange}
              value={values.author}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="readingProgress">Reading Progress</Form.Label>
            <Form.Select
              name="readingProgress"
              onChange={handleChange}
              value={values.readingProgress}
            >
              <option value="all books">All books</option>
              <option value="unfinished only">Unfinished only</option>
              <option value="finished only">Finished only</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="mt-3">
            Filter books
          </Button>
        </Form>
      )}
    </Formik>
  );
};
