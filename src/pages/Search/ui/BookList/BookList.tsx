import { Table } from "react-bootstrap";
import { CenteredSpinner } from "../../../../shared/CenteredSpinner";
import { useNavigate } from "react-router-dom";
import { Book } from "../../../../api/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export const BookList = () => {
  const navigate = useNavigate();

  const { data, isFetching } = useSelector(
    (state: RootState) => state.bookSearch
  );

  if (isFetching) {
    return <CenteredSpinner></CenteredSpinner>;
  }

  if (!data) {
    return <div></div>;
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
            <tr
              key={book.key}
              onClick={() => handleOnClick(book)}
              style={{ cursor: "pointer" }}
            >
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
