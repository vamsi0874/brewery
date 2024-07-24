import React, { useContext, useState } from 'react';
import api from '../services/api';
import BreweryList from './BreweryList';
import AuthContext from '../contexts/AuthContext';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [breweries, setBreweries] = useState([]);
  

  const {logout , user}  = useContext(AuthContext)

  const handleSearch = async (e) => {
    e.preventDefault();

    let endpoint = '/breweries/search?';
    if (searchTerm.startsWith('city:')) {
      const city = searchTerm.replace('city:', '').trim();
      endpoint += `by_city=${city}`;
    } else if (searchTerm.startsWith('name:')) {
      const name = searchTerm.replace('name:', '').trim();
      endpoint += `by_name=${name}`;
    } else if (searchTerm.startsWith('type:')) {
      const type = searchTerm.replace('type:', '').trim();
      endpoint += `by_type=${type}`;
    } else {
      endpoint += `by_name=${searchTerm.trim()}`;
    }

    const response = await api.get(endpoint);
    setBreweries(response.data);
  };

  return (
    <div>
      

      <form onSubmit={handleSearch}>
        <h2>Search Breweries</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by city, name, or type (e.g., city:New York)"
          required
        />
        <button type="submit">Search</button>
      </form>
      {breweries.length==0 ? (<p>No Breweries</p>)
      :<BreweryList breweries={breweries} /> }
      
    </div>
  );
};

export default SearchForm;



