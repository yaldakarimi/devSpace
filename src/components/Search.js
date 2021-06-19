import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import SearchResults from '@/components/SearchResults';

export default function Search({}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const getResults = async () => {
    if (searchTerm === '') {
      setSearchResults([]);
    } else {
      const res = await fetch(`/api/search?q=${searchTerm}`);
      const { results } = await res.json();
      setSearchResults(results);
    }
  };

  useEffect(() => {
    getResults();
  }, [searchTerm]);

  return (
    <div className='relative bg-gray-600 p-4'>
      <div className='container mx-auto flex  items-center  justify-center md:justify-end '>
        <div className='relative text-gray-600 w-72'>
          <form>
            <input
              type='search'
              name='search'
              id='search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search Posts...'
              className='bg-white rounded-full h-10 px-5 pr-10 text-sm focus:outline-none w-full'
            />

            <FaSearch className='absolute top-0 right-0 text-black mt-3 mr-4' />
          </form>
        </div>
      </div>

      <SearchResults results={searchResults} />
    </div>
  );
}
