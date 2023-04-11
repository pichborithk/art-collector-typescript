import {
  FetchQueryResultsFromTermAndValueArgs,
  Option,
  SearchResults,
  fetchQueryResultsArgs,
} from '../types/types';

export const BASE_URL = 'https://api.harvardartmuseums.org';
export const KEY = `apikey=${import.meta.env.VITE_API_KEY}`;

export async function fetchAllClassifications(): Promise<Option[]> {
  if (localStorage.getItem('classifications')) {
    return JSON.parse(localStorage.getItem('classifications')!);
  }

  const url = `${BASE_URL}/classification?${KEY}&size=100&sort=name`;

  const response = await fetch(url);
  const { records } = await response.json();

  localStorage.setItem('classifications', JSON.stringify(records));

  return records;
}

export async function fetchAllCenturies(): Promise<Option[]> {
  if (localStorage.getItem('centuries')) {
    return JSON.parse(localStorage.getItem('centuries')!);
  }

  const url = `${BASE_URL}/century?${KEY}&size=100&sort=temporalorder`;

  const response = await fetch(url);
  const { records } = await response.json();

  localStorage.setItem('centuries', JSON.stringify(records));

  return records;
}

export async function fetchAllCultures(): Promise<Option[]> {
  if (localStorage.getItem('cultures')) {
    return JSON.parse(localStorage.getItem('cultures')!);
  }

  const url = `${BASE_URL}/culture?${KEY}&size=300&sort=name`;

  const response = await fetch(url);
  const { records } = await response.json();

  localStorage.setItem('cultures', JSON.stringify(records));

  return records;
}

export async function fetchQueryResults(
  searchObj: fetchQueryResultsArgs
): Promise<SearchResults> {
  const { century, classification, culture, queryString } = searchObj;

  const url = `${BASE_URL}/object?${KEY}&classification=${classification}&century=${century}&culture=${culture}&keyword=${queryString}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export async function fetchQueryResultsFromURL(
  url: string
): Promise<SearchResults> {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export async function fetchQueryResultsFromTermAndValue({
  term,
  value,
}: FetchQueryResultsFromTermAndValueArgs): Promise<SearchResults> {
  const response = await fetch(
    `${BASE_URL}/object?${KEY}&${term}=${encodeURI(value.split('-').join('|'))}`
  );
  const data = await response.json();

  return data;
}
