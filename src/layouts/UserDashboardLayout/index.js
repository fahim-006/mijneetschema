import React, { Component } from "react";
import { Link } from 'react-router-dom';
import UserDashboardSidebarComponent from '../../components/UserDashboardSidebarComponent'
import HeaderComponent from '../../components/HeaderComponent'
import FooterComponent from '../../components/FooterComponent'


  export default function UserDashboardComponent(props) {
    return (
      <div>   
        <HeaderComponent/>
        <div className="banner_sec">
          <div className="container">
              <div className="col-12">
                  <div className="steps_result">
                      <div className="banner_txt d-flex">
                          <div className="banr_headng">
                            Gebruikers<br/>
                            Dashboard
                          </div>
                          <div className="banr_image">
                            <img src="/images/fitness_PNG181.png"/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>

        <div className="content-area homepage-content-main">
          <section className="diet_paln_items trnr_adprdct_wrap">
            <div className="container">
              <div className="tr_adprdct_wrap">
                <div className="tr_adprdct_inner">
                  <UserDashboardSidebarComponent />
                  {props.children}
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* <div className="row">
          <div className="col-12"> 
              <div className="container-fluid container-dash">              
                  <div className="row">
                    <div className="col-3"> 
                      <UserDashboardSidebarComponent />
                    </div>
                    <div className="col-9"> 
                    {props.children}
                    </div>
                </div>
              </div>
          </div>
        </div> */}
        <FooterComponent/>
      </div>
   
      
    )
  }


