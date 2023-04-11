import { fetchQueryResultsFromURL } from '../api';
import { PreviewProps } from '../types/types';

const Preview = (props: PreviewProps) => {
  const { searchResults, setIsLoading, setSearchResults, setFeaturedResult } =
    props;

  async function fetchPage(pageUrl: string): Promise<void> {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      // console.log(results);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside id='preview'>
      <header className='pagination'>
        <button
          disabled={!searchResults.info.prev && true}
          className='previous'
          onClick={() => fetchPage(searchResults.info.prev!)}
        >
          Previous
        </button>
        <button
          disabled={!searchResults.info.next && true}
          className='next'
          onClick={() => fetchPage(searchResults.info.next!)}
        >
          Next
        </button>
      </header>
      <section className='results'>
        {searchResults.records.map((record, index) => {
          return (
            <div
              key={index}
              className='object-preview'
              onClick={(event) => {
                event.preventDefault();
                setFeaturedResult(record);
              }}
            >
              {record.primaryimageurl && (
                <img src={record.primaryimageurl} alt={record.description} />
              )}
              {record.title ? <h3>{record.title}</h3> : <h3>MISSING INFO</h3>}
            </div>
          );
        })}
      </section>
    </aside>
  );
};

export default Preview;
