import React, { Component } from "react";
import { Link } from 'react-router-dom';


  export default function PopupLayout({ children}) {

    return (
       <div className="popstart">   
          <div className="red-rectangle"></div>
           {children}
      </div>
     )
  }


