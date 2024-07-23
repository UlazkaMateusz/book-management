export interface BookStorageType {
  notes: string;
  readingProgress: "Unread" | "Reading" | "Finished";
  rating: "1" | "2" | "3" | "4" | "5";
  key: string;
  isFavourite: boolean;
}
