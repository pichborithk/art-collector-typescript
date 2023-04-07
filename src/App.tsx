import { useState } from 'react';

import { Feature, Loading, Preview, Search, Title } from './components';
import { Record, SearchResults } from './types/types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults>({
    info: {},
    records: [],
  });
  const [featuredResult, setFeaturedResult] = useState<Record | null>(null);

  return (
    <>
      <Title />
      <Search
        setIsLoading={setIsLoading}
        setSearchResults={setSearchResults}
        setFeaturedResult={setFeaturedResult}
      />
      <Preview
        searchResults={searchResults}
        setIsLoading={setIsLoading}
        setSearchResults={setSearchResults}
        setFeaturedResult={setFeaturedResult}
      />
      <Feature
        featuredResult={featuredResult}
        setIsLoading={setIsLoading}
        setSearchResults={setSearchResults}
      />
      {isLoading && <Loading />}
    </>
  );
}

export default App;
