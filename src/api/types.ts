export interface AuthorDetailsResponse {
  name: string;
}

export interface BookDetailsResponse {
  key: string;
  descrition: string;
  title: string;
  covers?: number[];
  first_publish_date: string;
  authors: {
    author: {
      key: string;
    };
  }[];
}

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
