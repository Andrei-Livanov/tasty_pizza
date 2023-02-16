export enum SortPropertyEnum {
  RATING_ASC = 'rating',
  RATING_DESC = '-rating',
  PRICE_ASC = 'price',
  PRICE_DESC = '-price',
  TITLE_ASC = 'title',
  TITLE_DESC = '-title',
}

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: SortType;
}
