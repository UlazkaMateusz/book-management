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
