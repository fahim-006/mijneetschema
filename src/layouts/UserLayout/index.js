import React, { Component } from "react";
import { Link } from 'react-router-dom';
import HeaderComponent from '../../components/HeaderComponent'
import FooterComponent from '../../components/FooterComponent'


  export default function UserLayout(props) {
    return (
       <div>   
      <HeaderComponent {...props}/>
           {props.children}
      
      <FooterComponent/>
      </div>
     )
  }


