import { BookFilter } from "./BookFilter/BookFilter";
import { BookCardContainer } from "./BookCardContainer/BookCardContainer";

export const MyBooksPage = () => {
  return (
    <>
      <BookFilter />
      <div className="d-flex gap-3 mt-5 flex-wrap">
        <BookCardContainer />
      </div>
    </>
  );
};
