import React from "react";
import { useEffect, useState } from "react"
import {getAllTrainer} from '../../../Redux/API/index'

const DoelFilter= ({doels, handleFilters}) => {
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
                    Doel
        </option>
            <option value={"MaSelecteer een doelle"}
                    type = "checkbox"
                    className="form-check-input">
                    MaSelecteer een doelle    
            </option>

            <option value={"Fat Burning - Afvallen voor vrouwen"}
                    type = "checkbox"
                    className="form-check-input">
                    Fat Burning - Afvallen voor vrouwen    
            </option>

            <option value={"Fat Ripping - Afvallen voor mannen"}
                    type = "checkbox"
                    className="form-check-input">
                    Fat Ripping - Afvallen voor mannen    
            </option>

            <option value={"Mommy - Verantwoord fit worden"}
                    type = "checkbox"
                    className="form-check-input">
                    Mommy - Verantwoord fit worden   
            </option>

            <option value={"Muscle Shaping - Spieropbouw voor vrouwen"}
                    type = "checkbox"
                    className="form-check-input">
                    Muscle Shaping - Spieropbouw voor vrouwen    
            </option>

            <option value={"Muscle Building - Spieropbouw voor mannen"}
                    type = "checkbox"
                    className="form-check-input">
                    Muscle Building - Spieropbouw voor mannen    
            </option>

            <option value={"Running - Verbeteren van hardloopprestaties"}
                    type = "checkbox"
                    className="form-check-input">
                    Running - Verbeteren van hardloopprestaties   
            </option>

            <option value={"Obstacle Running - Verbeteren van prestaties"}
                    type = "checkbox"
                    className="form-check-input">
                    Obstacle Running - Verbeteren van prestaties   
            </option>

            <option value={"Pregnancy - Verantwoord fit blijven"}
                    type = "checkbox"
                    className="form-check-input">
                    Pregnancy - Verantwoord fit blijven   
            </option>

        </select>
        </>
    )
  }

export default DoelFilter;