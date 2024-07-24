import { Table } from "react-bootstrap";
import {
  Book,
  BookSearchResponse,
  getBookIdentifier,
} from "../../types/BookSearchResponse";
import { useNavigate } from "react-router-dom";
import { CenteredSpinner } from "../../shared/CenteredSpinner";

export interface BookListParams {
  isLoading: boolean;
  data?: BookSearchResponse;
}

export const BookList = ({ isLoading, data }: BookListParams) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <CenteredSpinner></CenteredSpinner>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const handleOnClick = (book: Book) => {
    navigate(book.key);
  };

  return (
    <>
      <div>Found: {data.numFound} books</div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Author Name</th>
            <th>Title</th>
            <th>First Publish Year</th>
            <th>Number Of Pages</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.docs.map((book, i) => (
            <tr key={book.key} onClick={() => handleOnClick(book)}>
              <td>{i + 1}</td>
              <td>{book.author_name}</td>
              <td>{book.title}</td>
              <td>{book.first_publish_year}</td>
              <td>
                {book.number_of_pages_median
                  ? book.number_of_pages_median
                  : "-"}
              </td>
              <td>
                {book.ratings_average ? book.ratings_average.toFixed(2) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
