import { MouseEvent } from 'react';

import { SearchableProps } from '../types/types';
import { fetchTerm } from '../app/searchResultSlice';
import { useAppDispatch } from '../app/hooks';

const Searchable = (props: SearchableProps) => {
  const { searchTerm, searchValue } = props;
  const dispatch = useAppDispatch();

  async function handleSearch(
    event: MouseEvent<HTMLAnchorElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      const searchObj = { term: searchTerm, value: searchValue };
      dispatch(fetchTerm(searchObj));
    } catch (error) {
      console.error(error);
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
