import { FaSearch } from 'react-icons/fa';
import './searchEngine.css';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchEngine = () => {

    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
  
    // FIX: uncontrolled input - urlKeyword may be undefined
    const [keyword, setKeyword] = useState(urlKeyword || '');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
          navigate(`/search/${keyword.trim()}`);
          setKeyword('');
        } else {
          navigate('/');
        }
      };
  return (
    <>
      <section className='searchbox'>

        <form onSubmit={submitHandler} className='search'>
          <input
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            placeholder='Rechercher un produit...'
          />
          <button className=' btn-search' type='submit'> <FaSearch/></button>
        </form>
      </section>
    </>
  );
};

export default SearchEngine;
