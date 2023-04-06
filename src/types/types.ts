import { Dispatch, SetStateAction } from 'react';

export type SearchResults = {
  info: Info | {};
  records: Record[] | [];
};

export type Info = {
  next: string;
  prev?: string;
};

export type Record = {
  century: string;
  contact: string;
  creditline: string;
  department: string;
  dimensions: string;
  division: string;
  imagecount: number;
  images?: Image[];
  medium: string;
  people?: { displayname: string }[];
  peoplecount: number;
  primaryimageurl?: string;
};

export type Image = {
  baseimageurl: string;
  copyright: string;
};

export type Option = {
  id: number;
  name: string;
};

export type fetchQueryResultsProps = {
  century: string;
  classification: string;
  queryString: string;
};

export type SearchProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSearchResults: Dispatch<SetStateAction<SearchResults>>;
};
