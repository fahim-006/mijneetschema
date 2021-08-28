import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class DashboardSidebarComponent extends Component {


  render() {

    return (
      <div className="trnr_nav_head">
      <div className="adprdct_head_iner">
        <ul>
          <li>
            <NavLink to="/trainer/add-products">
              Add Products
          </NavLink>
          </li>

          <li >
         <NavLink to="/trainer/list-products">
            List Products
         </NavLink>
       </li>
   
       <li >
         <NavLink to="/trainer/add-video">
          Add Videos
         </NavLink>
       </li>

       <li >
         <NavLink to="/trainer/list-video">
          List Videos
         </NavLink>
       </li>

       <li >
         <NavLink to="/trainer/chat">
          chat
         </NavLink>
       </li>


          {/* <li><a href="#">Add Product</a></li>
          <li><a href="#">Products Listing</a></li>
          <li><a href="#">Add Videos</a></li>
          <li><a href="#">Videos Listing</a></li>
          <li><a href="#">Chat</a></li> */}
        </ul>
      </div>
    </div>
   
  //        <ul className="dash_sidebar navbar-nav sidebar  accordion" id="accordionSidebar">
    
  //       {/**Sidebar - Brand */}
  //       <a className="dash_logo sidebar-brand d-flex align-items-center justify-content-center" href="#">
  //           <div className="sidebar-brand-icon">
  //           <img src="/img/logo_dash.png" className="img-fluid" alt="" />
  //           </div>
            
  //       </a>
  //        <div className="menu__sidebar">

      
  //      <li className="nav-item">
  //        <NavLink className="nav-link" to="/trainer/add-products">
  //           <i className="fas fa-carrot"></i>
  //           <span>Add Products</span>
  //        </NavLink>
  //      </li>
   
  //      <li className="nav-item">
  //        <NavLink className="nav-link" to="/trainer/list-products">
  //          <i className="fas fa-cart-arrow-down"></i>
  //          <span>List Products</span>
  //        </NavLink>
  //      </li>
   
  //      <li className="nav-item">
  //        <NavLink className="nav-link" to="/trainer/add-video">
  //          <i className="fas fa-play-circle"></i>
  //          <span>Add Videos</span>
  //        </NavLink>
  //      </li>
  //      <li className="nav-item">
  //        <NavLink className="nav-link" to="/trainer/list-video">
  //          <i className="fas fa-play-circle"></i>
  //          <span>List Videos</span>
  //        </NavLink>
  //      </li>
   
  //      <li className="nav-item">
  //        <a className="nav-link" href="#">
  //          <i className="fas fa-comments"></i>
  //          <span>Chat</span>
  //        </a>
  //      </li>
  //  </div>
  //    </ul>
    
    )
  }

}



export default DashboardSidebarComponent;

