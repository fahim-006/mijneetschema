import React, { Component } from "react";
import { Link } from "react-router-dom";
import DashboardSidebarComponent from "../../components/DashboardSidebarComponent";
import HeaderComponent from "../../components/TrainerHeaderComponent";
import FooterComponent from "../../components/FooterComponent";

export default function DashboardComponent(props) {
  return (
    <div>
      <HeaderComponent {...props} />
      <div className="banner_sec">
        <div className="container">
          <div className="col-12">
            <div className="steps_result">
              <div className="banner_txt d-flex">
                <div className="banr_headng trnr_head">
                  MIJN
                  <br />
                  EETSCHEMA
                </div>
                <div className="banr_image">
                  <img src="/images/fitness_PNG181.png" className="" />
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
                <DashboardSidebarComponent />
                {props.children}
              </div>
            </div>
          </div>
        </section>
        {/* PRODUCT DETAIL SECTION ENDS */}
        {/* MAIN PAGE CONTENT AREA ENDS */}
        {/*================diet_paln_items section ends================*/}
      </div>

      <FooterComponent />
    </div>
  );
}
