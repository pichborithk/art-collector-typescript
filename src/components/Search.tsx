import { FormEvent, useEffect, useState } from 'react';

import {
  fetchAllCenturies,
  fetchAllClassifications,
  fetchAllCultures,
  fetchQueryResults,
} from '../api';

import { Option, Record, SearchProps } from '../types/types';

const Search = (props: SearchProps) => {
  const { setIsLoading, setSearchResults, setFeaturedResult } = props;

  const [isSearching, setIsSearching] = useState(false);
  const [tempResults, setTempResults] = useState<Record[]>([]);
  const [queryString, setQueryString] = useState('');

  const [culture, setCulture] = useState('any');
  const [cultureList, setCultureList] = useState<Option[]>([]);

  const [century, setCentury] = useState('any');
  const [centuryList, setCenturyList] = useState<Option[]>([]);

  const [classification, setClassification] = useState('any');
  const [classificationList, setClassificationList] = useState<Option[]>([]);

  async function getData() {
    setIsLoading(true);

    try {
      const newCultureList = await fetchAllCultures();
      const newClassificationList = await fetchAllClassifications();
      const newCenturyList = await fetchAllCenturies();
      // console.log(newCenturyList);
      // console.log(newClassificationList);
      setCultureList(newCultureList);
      setCenturyList(newCenturyList);
      setClassificationList(newClassificationList);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const searchObj = { century, classification, culture, queryString };
      const result = await fetchQueryResults(searchObj);
      // console.log(newSearchResults);
      setSearchResults(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  }

  async function getSuggestion() {
    if (!queryString) return setTempResults([]);

    try {
      const searchObj = { century, classification, culture, queryString };
      const result = await fetchQueryResults(searchObj);
      // console.log(result);
      setTempResults(result.records);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSuggestion();
  }, [queryString]);

  return (
    <form id='search' onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor='keywords'>Query</label>
        <input
          id='keywords'
          type='text'
          placeholder='Enter Keywords...'
          value={queryString}
          onChange={(event) => {
            setIsSearching(true);
            setQueryString(event.target.value);
          }}
        />
        {tempResults.length > 0 && isSearching && (
          <ul>
            {tempResults.map((record, index) => (
              <li
                key={index}
                onClick={() => {
                  setQueryString(record.title);
                  setFeaturedResult(record);
                  setIsSearching(false);
                }}
              >
                {record.title}
              </li>
            ))}
          </ul>
        )}
      </fieldset>
      <fieldset>
        <label htmlFor='select-culture'>
          Culture
          <span className='culture-count'>({cultureList.length})</span>
        </label>
        <select
          name='culture'
          id='select-culture'
          value={culture}
          onChange={(event) => {
            setCulture(event.target.value);
          }}
        >
          <option value='any'>Any</option>
          {cultureList.map((c) => (
            <option value={c.name} key={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor='select-classification'>
          Classification
          <span className='classification-count'>
            ({classificationList.length})
          </span>
        </label>
        <select
          name='classification'
          id='select-classification'
          value={classification}
          onChange={(event) => {
            setClassification(event.target.value);
          }}
        >
          <option value='any'>Any</option>
          {classificationList.map((c) => (
            <option value={c.name} key={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor='select-century'>
          Century<span className='century-count'>({centuryList.length})</span>
        </label>
        <select
          name='century'
          id='select-century'
          value={century}
          onChange={(event) => setCentury(event.target.value)}
        >
          <option value='any'>Any</option>
          {centuryList.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </fieldset>
      <button>SEARCH</button>
    </form>
  );
};

export default Search;
