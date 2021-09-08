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
            {newsletters && newsletters.map(newsletter => <h1>{newsletter}</h1>)}
        </>
    )
}



export default GetNewsLetter;