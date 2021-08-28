import React, { Component } from "react";
import { Link } from 'react-router-dom';

class UserDashboardFooterComponent extends Component {


  render() {

    return (
        <footer className="sticky-footer dashboard-footer">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Mijneetschema 2020</span>
          </div>
        </div>
      </footer>
    )
  }

}



export default UserDashboardFooterComponent;

