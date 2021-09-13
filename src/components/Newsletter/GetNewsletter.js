import React from "react";
import { useState, useEffect } from "react";
import { getNewsletter } from "../../Redux/API/apiNewsletter";

const GetNewsLetter = () => {
    const [newsletters, setNewsletter] = useState([]);

    useEffect(()=> {
        getNewsletter()
            .then(response => setNewsletter(response.data));
    },[])

    return(
        <>
        <div className="container-fluid" style={{backgroundColor: "#ffffff"}}>
            <div >
            <h1 style={{display:"flex", justifyContent:"center",alignItems:"center"}}>newsletters</h1>
        {newsletters && newsletters.map(newsletter => <p style={{color:"#000",display:"flex", justifyContent:"center",alignItems:"center"}}>{newsletter.email}</p>)}
            </div>
       
      
        </div>
           
        </>
    )
}



export default GetNewsLetter;