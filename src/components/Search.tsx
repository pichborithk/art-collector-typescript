import { FormEvent, useEffect, useState } from 'react';

import {
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults,
} from '../api';

import { Option, SearchProps } from '../types/types';

const Search = ({ setIsLoading, setSearchResults }: SearchProps) => {
  const [queryString, setQueryString] = useState('');

  const [century, setCentury] = useState('any');
  const [centuryList, setCenturyList] = useState<Option[]>([]);

  const [classification, setClassification] = useState('any');
  const [classificationList, setClassificationList] = useState<Option[]>([]);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      try {
        const newClassificationList = await fetchAllClassifications();
        const newCenturyList = await fetchAllCenturies();
        // console.log(newCenturyList);
        // console.log(newClassificationList);
        setCenturyList(newCenturyList);
        setClassificationList(newClassificationList);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newSearchResults = await fetchQueryResults({
        century,
        classification,
        queryString,
      });
      // console.log(newSearchResults);
      setSearchResults(newSearchResults);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form id='search' onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor='keywords'>Query</label>
        <input
          id='keywords'
          type='text'
          placeholder='Enter Keywords...'
          value={queryString}
          onChange={(event) => setQueryString(event.target.value)}
        />
      </fieldset>
      <fieldset>
        <label htmlFor='select-classification'>
          Classification{' '}
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
          Century <span className='century-count'>({centuryList.length})</span>
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
