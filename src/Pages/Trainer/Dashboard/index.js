import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout'

class TrainerDashboardComponent extends Component {
constructor(props){
  super(props);
}

  render() {
    return (
      <div className="diet_plan-wrap">
        <DashboardLayout {...this.props}>
             <div className="dash_intro d-sm-flex align-items-center justify-content-between mb-4 mt-4">
               <h1 className="h3 mb-0 text-gray-800 page_head_dash d-flex justify-content-between align-items-center">
                 <span>Trainer Dashboard</span>
                 </h1>
              </div>
         </DashboardLayout>
      </div>
    )
  }

}



export default TrainerDashboardComponent;

