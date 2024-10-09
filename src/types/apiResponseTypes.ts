export type GetResponseType<T> = {
  results: T[];
  pageNumber: number;
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
};
