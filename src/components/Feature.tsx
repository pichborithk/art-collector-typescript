import Searchable from './Searchable';
import { FeatureProps } from '../types/types';

const Feature = ({
  featuredResult,
  setIsLoading,
  setSearchResults,
}: FeatureProps) => {
  return (
    <main id='feature'>
      {featuredResult && (
        <div className='object-feature'>
          <header>
            <h3>{featuredResult.title}</h3>
            <h4>{featuredResult.dated}</h4>
          </header>
          <section className='facts'>
            <span className='title'>Culture</span>
            <Searchable
              searchTerm='culture'
              searchValue={featuredResult.culture}
              setIsLoading={setIsLoading}
              setSearchResults={setSearchResults}
            />
            <span className='title'>Medium</span>
            <Searchable
              searchTerm='medium'
              searchValue={featuredResult.medium}
              setIsLoading={setIsLoading}
              setSearchResults={setSearchResults}
            />
            <span className='title'>Dimensions</span>
            <span className='content'>{featuredResult.dimensions}</span>
            <span className='title'>Person</span>
            {featuredResult.people &&
              featuredResult.people!.map((person, index) => (
                <Searchable
                  key={index}
                  searchTerm='person'
                  searchValue={person.displayname}
                  setIsLoading={setIsLoading}
                  setSearchResults={setSearchResults}
                />
              ))}
            <span className='title'>Department</span>
            <span className='content'>{featuredResult.department}</span>
            <span className='title'>Division</span>
            <span className='content'>{featuredResult.division}</span>
            <span className='title'>Contact</span>
            <span className='content'>
              <a href={`mailto:${featuredResult.contact}`} target='_blank'>
                {featuredResult.contact}
              </a>
            </span>
            <span className='title'>Credit</span>
            <span className='content'>{featuredResult.creditline}</span>
          </section>
          <section className='photos'>
            {featuredResult.images &&
              featuredResult.images!.map((image, index) => (
                <img
                  src={image.baseimageurl}
                  alt={image.copyright}
                  key={index}
                />
              ))}
          </section>
        </div>
      )}
    </main>
  );
};

export default Feature;
