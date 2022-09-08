import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Countries";
import Filter from "./components/Filter";
function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFilter] = useState('');

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])
  const handleAddFilter = (event) => {
    setFilter(event.target.value);
  }
  const filtereddata = countries.filter((item) =>
    item.name.common.toLowerCase().includes(filtered.toLowerCase()));

  const searchfilter = !filtered
    ? countries
    : filtereddata;
  return (
    <div>
      <Filter value={filtered} onChange={handleAddFilter} />
      <Country countries={countries} searchfilter={searchfilter} handleAddFilter={handleAddFilter} />
    </div>
  );
}

export default App;
