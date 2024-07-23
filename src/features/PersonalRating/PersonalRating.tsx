import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useBookCollection } from "../../hooks/useBookCollection";

interface FormValues {
  notes: string;
  readingProgress: "Unread" | "Reading" | "Finished";
  rating: "1" | "2" | "3" | "4" | "5";
}

export interface PersonalRatingParams {
  bookKey?: string;
}

export const PersonalRating = ({ bookKey }: PersonalRatingParams) => {
  const [books, setBooks] = useBookCollection();

  console.log(bookKey);
  let initialValues: FormValues = {
    notes: "",
    readingProgress: "Unread",
    rating: "1",
  };

  const savedBook = books.find((b) => b.key == bookKey);
  if (savedBook) {
    initialValues = {
      ...savedBook,
    };
  }

  const onSubmit = (data: FormValues) => {
    if (!bookKey) {
      throw new Error("key is undefinded on sumbit");
    }

    let newBooks = books.filter((b) => b.key != bookKey);
    newBooks.push({
      key: bookKey,
      ...data,
    });

    setBooks(newBooks);
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, errors, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-2">
              <Form.Label>My notes</Form.Label>
              <Form.Control
                type="text"
                name="notes"
                onChange={handleChange}
                value={values.notes}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Reading progress</Form.Label>
              <Form.Select
                name="readingProgress"
                onChange={handleChange}
                value={values.readingProgress}
              >
                <option>Unread</option>
                <option>Reading</option>
                <option>Finished</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>My rating</Form.Label>
              <Form.Select
                name="rating"
                onChange={handleChange}
                value={values.rating}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Select>
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
