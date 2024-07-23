import { QueryStatus } from "@reduxjs/toolkit/query";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";

export interface BookFilterParams {
  initialValues: BookFilterValues;
  onSubmit: (values: BookFilterValues) => void;
}

export interface BookFilterValues {
  title?: string;
  author?: string;
  readingProgress: "all books" | "unfinished only" | "finished only";
}

export const BookFilter = ({ initialValues, onSubmit }: BookFilterParams) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, errors, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              value={values.title}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="title">Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              onChange={handleChange}
              value={values.author}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="readingProgress">
              Year of publication
            </Form.Label>
            <Form.Select
              name="year"
              onChange={handleChange}
              value={values.readingProgress}
            >
              <option value="all books">All books</option>
              <option value="unfinished only">Unfinished only</option>
              <option value="finished only">Finished only</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" disabled={status === "pending"}>
            Filter books
          </Button>
        </Form>
      )}
    </Formik>
  );
};
