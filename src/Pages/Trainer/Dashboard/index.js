import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout'
import {userInfo} from '../../../utils/auth'
import axios from "axios";
import EditProfile from './EditProfile'
const API = process.env.REACT_APP_API_URL;

class TrainerDashboardComponent extends Component {
constructor(props){
 super(props);
 
 this.state={
  email : JSON.parse(localStorage.getItem('jwt')),
  name: '',
  mobile_number:'',
  location: '',
  gender: ''
 }

  axios.get(`${API}/users/fetch-trainer/all`)
  .then(response => {
    response.data.forEach((item, index)=>{
      if(item.email == this.state.email){
       this.setState({
          name: item.fullname,
          mobile_number: item.mobile_number,
          location: item.location,
          gender: item.gender
       })
      }
     
    })
  })
 }

  render() {
    var trainerSubscription = localStorage.getItem('subs_details');
    var description = trainerSubscription.toString().split(',');
    var trainerPlan = description[1].split(':');
    trainerPlan = trainerPlan[1];

    return (
      <div className="diet_plan-wrap">
        <DashboardLayout {...this.props}>
             <div className="dash_intro d-sm-flex align-items-center justify-content-between mb-4 mt-4">
               <h1 className="h3 mb-0 text-gray-800 page_head_dash d-flex justify-content-between align-items-center">
                 <span>{`Welcome: ${this.state.name}`}
                <h5>Email: {this.state.email}</h5>
                <h5>Your Plan: {trainerPlan}</h5>
                <Link to='/edit-profile-trainer'>
                  Edit Your Profile
                </Link>
              </span>
                </h1>
              </div>
         </DashboardLayout>
      </div>
    )
  }

}



export default TrainerDashboardComponent;

