import React from "react";
const AgeFiltering = ({leeftijds, handleFilters}) =>{


    const handleChange = e => {
        handleFilters(e.target.value)
    }


    return(
        <>
         <select onChange={handleChange}>
            {leeftijds.map (leeftijd => (
                <option value={leeftijd.id}
                        name="leeftijd_filter"
                        className="mr-2">{leeftijd.name}
                </option>
            ))}
            </select>
        </>
    ) 
}

export default AgeFiltering;