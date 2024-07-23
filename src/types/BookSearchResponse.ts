export interface BookSearchResponse {
  numFound: number;
  docs: Book[];
}

export interface Book {
  author_name: string[];
  first_publish_year: number;
  number_of_pages_median: number;
  title: string;
  ratings_average?: number;
  key: string;
  isbn?: string[];
  lccn?: string[];
  olid?: string[];
  oclc?: string[];
}

export interface BookIdentifier {
  idType: string;
  id: string;
}

export const getBookIdentifier = (book: Book): BookIdentifier => {
  if (book.isbn) {
    return {
      idType: "isbn",
      id: book.isbn[0],
    };
  }

  if (book.lccn) {
    return {
      idType: "lccn",
      id: book.lccn[0],
    };
  }

  if (book.olid) {
    return {
      idType: "olid",
      id: book.olid[0],
    };
  }

  if (book.oclc) {
    return {
      idType: "oclc",
      id: book.oclc[0],
    };
  }

  throw new Error("book does not have id");
};
