import React, { Component } from "react";
import { Link,NavLink } from 'react-router-dom';

class UserDashboardSidebarComponent extends Component {


  render() {

    return (
      <div className="trnr_nav_head">
        <div className="adprdct_head_iner">
          <ul>
            <li>
              <div className="sidebar-brand-icon">
                <img src="/img/logo_dash.png" className="img-fluid" alt="" />
              </div>            
            </li>
            <li>
              <NavLink to="/user/diet-plan">
                <i className="fas fa-carrot"></i>
                <span>  Mijn Eetschema</span>
              </NavLink>
              </li>
            <li>
              <NavLink to="/user/orders">
              <i className="fa fa-cart-arrow-down"></i>
              <span> Mijn bestellingen</span>
            </NavLink>
            </li>
            {/* <li><NavLink to="#">Videos</NavLink></li> */}
            <li>
              <NavLink to="/user/chat">
              <i className="fa fa-comments"></i>
              <span> Chat </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    //  <ul className="dash_sidebar navbar-nav sidebar  accordion" id="accordionSidebar">
    //     <a className="dash_logo sidebar-brand d-flex align-items-center justify-content-center" href="#">
    //         <div className="sidebar-brand-icon">
    //         <img src="./img/logo_dash.png" className="img-fluid" alt="" />
    //         </div>
            
    //     </a>
    //     <div className="menu__sidebar">

    //       <li className="nav-item">
    //         <a className="nav-link" href="#">
    //             <i className="fas fa-carrot"></i>
    //             <span>Diet Plan</span>
    //           </a>
    //       </li>
      
    //       <li className="nav-item">
    //         <a className="nav-link" href="#">
    //           <i className="fas fa-cart-arrow-down"></i>
    //           <span>Orders</span>
    //         </a>
    //       </li>
      
    //       *
    //        * Keep it commented for now
    //        *

    //       <li className="nav-item">
    //         <a className="nav-link" href="#">
    //           <i className="fas fa-play-circle"></i>
    //           <span>Videos</span>
    //         </a>
    //       </li>
      
    //       <li >
    //         <NavLink to="/user/chat" className="nav-link">
    //         <i className="fas fa-comments"></i>
    //           <span>Chat</span>
    //         </NavLink>
    //       </li>
    //   </div>
    //  </ul>
    )
  }

}



export default UserDashboardSidebarComponent;

