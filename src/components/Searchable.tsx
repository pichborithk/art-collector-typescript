import { MouseEvent } from 'react';

import { fetchQueryResultsFromTermAndValue } from '../api';
import { SearchableProps } from '../types/types';

const Searchable = ({
  setIsLoading,
  searchTerm,
  searchValue,
  setSearchResults,
}: SearchableProps) => {
  async function handleSearch(
    event: MouseEvent<HTMLAnchorElement>
  ): Promise<void> {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await fetchQueryResultsFromTermAndValue(
        searchTerm,
        searchValue
      );
      setSearchResults(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <span className='content'>
      <a href='#' onClick={handleSearch}>
        {searchValue}
      </a>
    </span>
  );
};

export default Searchable;
