import { BookSearchResponse } from "../../../api/types";
import { SearchParams } from "./SearchParams";

export interface BookSearchState {
  isFetching: boolean;
  data?: BookSearchResponse;
  searchParams: SearchParams;
}
