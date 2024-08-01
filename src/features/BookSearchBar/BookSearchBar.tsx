import { QueryStatus } from "@reduxjs/toolkit/query";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { BookSearchSchema } from "./BookSearchSchema";

export interface BookSearchBarProps {
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
}: BookSearchBarProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={BookSearchSchema}
    >
      {({ values, errors, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              value={values.title}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="title">Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              onChange={handleChange}
              value={values.author}
              isInvalid={!!errors.author}
            />
            <Form.Control.Feedback type="invalid">
              {errors.author}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="year">Year of publication</Form.Label>
            <Form.Control
              type="number"
              name="year"
              onChange={handleChange}
              value={values.year}
              isInvalid={!!errors.year}
            />
            <Form.Control.Feedback type="invalid">
              {errors.year}
            </Form.Control.Feedback>
          </Form.Group>

          {errors.fieldsRequired && (
            <div
              className="mt-1"
              style={{ color: "var(--bs-form-invalid-color)" }}
            >
              {errors.fieldsRequired}
            </div>
          )}
          <Button
            type="submit"
            disabled={status === "pending"}
            className="mt-3"
          >
            Search
          </Button>
        </Form>
      )}
    </Formik>
  );
};
