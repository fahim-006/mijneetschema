import React from "react";
import { useState } from "react"

const GenderFilter = ({genders, handleFilters}) => {
  const [checked, setChecked] = useState([]);
  const checkedIds = [...checked];


  const handleToggle1 = e  => {

    handleFilters(e.target.value);
}
 
  const handleToggle = id => () => {
      const foundId = checked.indexOf(id);

      if(foundId === -1){
          checkedIds.push(id);
      }else{
          checkedIds.splice(foundId, 1);
      }
      setChecked(checkedIds);
      handleFilters(checkedIds);
  }

  return(
      <>
    <select onChange={handleToggle1}>

        <option 
                value=""
                type = "checkbox"
                className="form-check-input">
                    Gender
        </option>
        <option 
                value="Male"
                type = "checkbox"
                className="form-check-input">
                    Male
        </option>

        <option 
                value="Female"
                type = "checkbox"
                className="form-check-input">
                    Female
        </option>
    </select>

      </>
  )
}

export default GenderFilter;