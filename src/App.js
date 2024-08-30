// App.js
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch data from the Nutrition API
  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await axios.get(`https://api.edamam.com/api/food-database/v2/parser`, {
        params: {
          app_id: 'cd7c9e79', // Replace with your API app ID
          app_key: 'e8d874b1fff125071f18e692157d3b2f', // Replace with your API app key
          ingr: searchQuery,
        },
      });
      setResults(response.data.hints);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        
        <h1>Nutrition Tracker</h1>
      
      </header>
      <div className='image'>
        <a href="https://tracker-psi-six.vercel.app/" target="_blank"><h3>Click me for image based name search</h3></a>
        <p className='two'><i><u>upload images to find the name of the food</u></i></p>

      </div>
      <div className="input-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a food item..."
          className="input-field"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {loading && <p className='one'>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="results-container">
        {results.map((item, index) => (
          <div key={index} className="result-card">
            <h3 className="item-name">{item.food.label}</h3>
            <p>Category: {item.food.category}</p>
            <p>Calories: {item.food.nutrients.ENERC_KCAL} kcal</p>
            <p>Protein: {item.food.nutrients.PROCNT} g</p>
            <p>Fat: {item.food.nutrients.FAT} g</p>
            <p>Carbohydrates: {item.food.nutrients.CHOCDF} g</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;