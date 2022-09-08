import Weather from "./Weather";
import React from "react";

const Countries = ({ searchfilter, handleAddFilter }) => {
    if (searchfilter.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (searchfilter.length === 1) {
        const country = searchfilter[0];
        const languages = Object.keys(country.languages)
        //console.log('languages',languages)
        //const languages = country.languages
        console.log('languages', languages)
        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>capital {country.capital}</div>
                <div>area {country.area}</div>
                <h2>languages:</h2>
                <ul>
                    {languages.map(language =>
                        <li key={language}>{country.languages[language]}</li>)}
                </ul>
                <img src={country.flags.png} width="200" alt={country.name.common} />
                {/* country={country} weather={weatherapi} */}
                <Weather countryInfo={country.capital} />
            </div>
        )
    }
    return (
        searchfilter.map(country =>
            <li key={country.name.common}> {country.name.common}
                <button value={country.name.common} onClick={handleAddFilter}>show</button> </li>
        )
    )
}
export default Countries;