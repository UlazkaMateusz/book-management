export interface BookDetailsResponse {
  key: string;
  descrition: string;
  title: string;
  covers: number[];
  first_publish_date: string;
  authors: {
    author: {
      key: string;
    };
  }[];
}
