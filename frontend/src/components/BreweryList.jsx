import React from 'react';
import { Link } from 'react-router-dom';

const BreweryList = ({ breweries }) => {
  return (
    <div>
     { breweries.length !== 0 && <h2>Brewery List</h2>}
      <ul>
        {breweries.map((brewery) => (
          <li key={brewery.id}>
            <h3>{brewery.name}</h3>
            {/* <p>Address: {brewery.address}</p> */}
            {/* <p>Phone: {brewery.phone}</p> */}
            <p>Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
            {/* <p>Country: {brewery.country}</p> */}
            {/* <p>City: {brewery.city}</p> */}
            {/* <p>Current Rating: {brewery.current_rating || 'No rating yet'}</p> */}
            <Link to={`/breweries/${brewery.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreweryList;

