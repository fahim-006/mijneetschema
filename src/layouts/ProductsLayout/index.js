import React, { Component } from "react";
import { Link } from 'react-router-dom';
import HeaderComponent from '../../components/HeaderComponent'
import FooterComponent from '../../components/FooterComponent'


export default function ProductsLayout(props) {
    return (
        <div>
            <HeaderComponent />
                <div className="row">
                    <div className="col-12">
                        {props.children}
                    </div>
                </div>
            <FooterComponent />
        </div>
    )
}


