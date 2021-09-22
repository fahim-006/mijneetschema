import React from "react";
const FullnameFiltering = ({address, handleFilters}) =>{
    const handleChange = e => {
       
        handleFilters(e.target.value);
    }
    return(
        <div className="trainer_select_wrap">
            <div className="form_group_row">
                <div className="form_group">
                   
                        <input type="text"
                            placeholder="Name"  
                            name="fullname"
                            onChange={handleChange}
                         />
                    
                </div>
            </div>
        </div>
    )

}

export default FullnameFiltering;