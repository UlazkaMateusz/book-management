import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useBooksCollection } from "../../hooks/useBooksCollection";
import { BookDetailsResponse } from "../../types/BookDetailsResponse";
import { PersonalRatingSchema } from "./PersonalRatingSchema";

interface FormValues {
  notes: string;
  readingProgress: "Unread" | "Reading" | "Finished";
  rating: "" | "1" | "2" | "3" | "4" | "5";
}

export interface PersonalRatingParams {
  bookDetailsResponse: BookDetailsResponse;
}

export const PersonalRating = ({
  bookDetailsResponse,
}: PersonalRatingParams) => {
  const [books, setBooks] = useBooksCollection();

  const savedBook = books.find((b) => b.key == bookDetailsResponse.key);
  const initialValues: FormValues = savedBook
    ? savedBook
    : {
        notes: "",
        readingProgress: "Unread",
        rating: "",
      };

  const onSubmit = (data: FormValues) => {
    if (!bookDetailsResponse.key) {
      throw new Error("key is undefinded on sumbit");
    }

    const newBooks = books.filter((b) => b.key != bookDetailsResponse.key);
    newBooks.push({
      key: bookDetailsResponse.key,
      ...data,
    });

    setBooks(newBooks);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={PersonalRatingSchema}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-2">
              <Form.Label>My notes</Form.Label>
              <Form.Control
                type="text"
                name="notes"
                onChange={handleChange}
                value={values.notes}
                isInvalid={!!errors.notes}
              />
              <Form.Control.Feedback type="invalid">
                {errors.notes}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Reading progress</Form.Label>
              <Form.Select
                name="readingProgress"
                onChange={handleChange}
                value={values.readingProgress}
                isInvalid={!!errors.readingProgress}
              >
                <option>Unread</option>
                <option>Reading</option>
                <option>Finished</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.readingProgress}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>My rating</Form.Label>
              <Form.Select
                name="rating"
                onChange={handleChange}
                value={values.rating}
                isInvalid={!!errors.rating}
              >
                <option value="" disabled hidden>
                  Choose rating
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.rating}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end mt-3">
              <Button type="submit" className="ml-auto">
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
