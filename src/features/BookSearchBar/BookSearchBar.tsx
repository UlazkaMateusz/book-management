import { QueryStatus } from "@reduxjs/toolkit/query";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";

export interface BookSearchBarParams {
  initialValues: BookSearchBarValues;
  status: QueryStatus;
  onSubmit: (values: BookSearchBarValues) => void;
}

export interface BookSearchBarValues {
  title?: string;
  author?: string;
  year?: string;
}

export const BookSearchBar = ({
  initialValues,
  status,
  onSubmit,
}: BookSearchBarParams) => {
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
            <Form.Label htmlFor="year">Year of publication</Form.Label>
            <Form.Control
              type="number"
              name="year"
              onChange={handleChange}
              value={values.year}
            />
          </Form.Group>

          <Button type="submit" disabled={status === "pending"}>
            Search
          </Button>
        </Form>
      )}
    </Formik>
  );
};
