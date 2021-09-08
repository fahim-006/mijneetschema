import React from "react";
const AgeFiltering = () =>{

    return(
        <div className="trainer_select_wrap">
            <div className="form_group_row">
                <div className="form_group">
                    <div className="trainer__slctr">
                        <select name="category">
                            <option value=''>Leeftijd</option>
                            <option>0 to 25</option>
                            <option>26 to 35</option>
                            <option>36 to 45</option>
                            <option>46 to 50</option>
                            <option>50+</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AgeFiltering;