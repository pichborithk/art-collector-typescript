import { Option, fetchQueryResultsProps } from '../types/types';

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

export async function fetchAllCenturies() {
  if (localStorage.getItem('centuries')) {
    return JSON.parse(localStorage.getItem('centuries')!);
  }

  const url = `${BASE_URL}/century?${KEY}&size=100&sort=temporalorder`;

  const response = await fetch(url);
  const { records } = await response.json();

  localStorage.setItem('centuries', JSON.stringify(records));

  return records;
}

export async function fetchQueryResults({
  century,
  classification,
  queryString,
}: fetchQueryResultsProps) {
  const url = `${BASE_URL}/object?${KEY}&classification=${classification}&century=${century}&keyword=${queryString}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}
