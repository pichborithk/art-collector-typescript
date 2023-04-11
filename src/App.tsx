import { Feature, Loading, Preview, Search, Title } from './components';
import { useAppSelector } from './app/hooks';

function App() {
  const isLoading = useAppSelector((state) => state.searchResult.loading);

  return (
    <>
      <Title />
      <Search />
      <Preview />
      <Feature />
      {isLoading && <Loading />}
    </>
  );
}

export default App;
