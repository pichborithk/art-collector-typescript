import { Dispatch, SetStateAction } from 'react';

export type SearchResults = {
  info: Info;
  records: Record[];
};

export type Info = {
  next?: string;
  prev?: string;
};

export type Record = {
  century: string;
  contact: string;
  culture: string;
  creditline: string;
  dated: string;
  department: string;
  description: string;
  dimensions: string;
  division: string;
  imagecount: number;
  images?: Image[];
  medium: string;
  people?: { displayname: string }[];
  peoplecount: number;
  primaryimageurl?: string;
  title: string;
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

export type PreviewProps = {
  searchResults: SearchResults;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSearchResults: Dispatch<SetStateAction<SearchResults>>;
  setFeaturedResult: Dispatch<SetStateAction<Record | null>>;
};

export type FeatureProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSearchResults: Dispatch<SetStateAction<SearchResults>>;
  featuredResult: Record | null;
};

export type SearchableProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSearchResults: Dispatch<SetStateAction<SearchResults>>;
  searchTerm: string;
  searchValue: string;
};
