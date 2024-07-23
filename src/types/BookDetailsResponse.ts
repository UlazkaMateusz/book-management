export interface BookDetails {
  records: [string: BookDetailsRecords];
}

export interface BookDetailsRecords {
  data: BookDetailsRecordsData;
}

export interface BookDetailsRecordsData {
  title: string;
  authors: { url: string; name: string }[];
  publish_date: string;
  key: string;
  cover: {
    small: string;
    medium: string;
    large: string;
  };
}
