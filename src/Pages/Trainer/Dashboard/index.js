import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout'
import {userInfo} from '../../../utils/auth'
import axios from "axios";
import EditProfile from './EditProfile'

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

 axios.get('http://localhost:4333/api/users/fetch-trainer')
  .then(response => {
    response.data.data.trainer_list.forEach((item, index)=>{
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
    return (
      <div className="diet_plan-wrap">
        <DashboardLayout {...this.props}>
             <div className="dash_intro d-sm-flex align-items-center justify-content-between mb-4 mt-4">
               <h1 className="h3 mb-0 text-gray-800 page_head_dash d-flex justify-content-between align-items-center">
                 <span>{`Welcome: ${this.state.name}`}
                <h5>Email: {this.state.email}</h5>
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

