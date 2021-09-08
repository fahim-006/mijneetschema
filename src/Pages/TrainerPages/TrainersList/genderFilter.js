import React from "react";
import { useEffect, useState } from "react"
import {getAllTrainer} from '../../../Redux/API/index'

const GenderFilter = () => {
    const [trainer, setTrainer] = useState([]);
    const [Gender, setGender] = useState([[]]);
    const [error, setError] = useState([]);
    var x;
    useEffect(()=> {
        getAllTrainer()
            .then(response => setGender(response.data.data.trainer_list))
            .catch(err => setError("failed"));
        
    }, [])

    /*
 response.data.data.trainer_list.foreach((item, index) =>{
                    alert("abc")
                })
    */

    const GenderArr = () =>{

        let arr= Gender.map((element) => element.gender);
        for(var i=0; i< arr.length; i++){
            if(arr[i]==undefined){
                arr.splice(i,1);
            }
        }

        let arrofUniqueGender = [...new Set(arr)]
        return(
            <>
        <select>
            <option>geslacht</option>
        {arrofUniqueGender.map((element) => (
            <option value={element}> {element}</option>)
        )}
        </select>
        </>      
            )
        
    }

    const showFilters = () => {
        return(
            <>
                
                        {/*this.props.tr_Cat_List && this.props.tr_Cat_List ?
                        this.props.tr_Cat_List.map((cat)=>(
                        <option key={cat._id} value={cat._id}>{cat.category}</option>
                        ))
                        :
                        <></>*/
                       
                        }
                        
                       {GenderArr()}
                    
            </>
        )
    }

 

    return(
        <>
            
            {showFilters()}
        </>
    )
}

export default GenderFilter;