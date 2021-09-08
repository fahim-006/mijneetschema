import React from "react";
import { useEffect, useState } from "react"
import {getAllTrainer} from '../../../Redux/API/index'

const DoelFilter = () => {
    const [trainer, setTrainer] = useState([]);
    const [doel, setDoel] = useState([[]]);
    const [error, setError] = useState([]);
    var x;
    useEffect(()=> {
        getAllTrainer()
            .then(response => setDoel(response.data.data.trainer_list))
            .catch(err => setError("failed"));
        
    }, [])

    /*
 response.data.data.trainer_list.foreach((item, index) =>{
                    alert("abc")
                })
    */

    const doelArr = () =>{

        let arr= doel.map((element) => element.doel);
        for(var i=0; i< arr.length; i++){
            if(arr[i]==undefined){
                arr.splice(i,1);
            }
        }

        let arrofUniqueDoel = [...new Set(arr)]
        return(
            <>
        <select>
        <option>Doel</option>
        {arrofUniqueDoel.map((element) => (
            <option> {element}</option>)
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
                        
                       {doelArr()}
                    
            </>
        )
    }

 

    return(
        <>
            
            {showFilters()}
        </>
    )
}

export default DoelFilter;