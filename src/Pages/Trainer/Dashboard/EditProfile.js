import React, {useState, useEffect} from "react";
import DashboardEditLayout from '../../../layouts/DashboardEditLayout'
import axios from "axios";
import { auto } from "async";

const EditProfile = () =>{
    const [values, setValues] = useState({
        email : JSON.parse(localStorage.getItem('jwt')),
        fullname: '',
        mobile_number:'',
        address: '',
        gender: '',
        doel: '',
        leeftijd: ''
    });

    const [disabled, setDisabled] = useState(false);
    const [redirect, setRedirect] =  useState(false);

    const {
        email,
        fullname,
        mobile_number,
        address,
        gender,
        doel,
        leeftijd
    } = values;

    useEffect(()=> {
        axios.get('http://localhost:4333/api/users/fetch-trainer')
            .then(response => {
                response.data.data.trainer_list.forEach((item, index)=>{
                 
    if(item.email == values.email){
     setValues({
        fullname: item.fullname,
        mobile_number: item.mobile_number,
        address: item.address,
        gender: item.gender,
        doel: item.doel,
        leeftijd: item.leeftijd
     })
    }
   
  })})
  .catch(err=>{

  })
    },[]);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = () =>{

    }

    const profileForm = () => (
        <form style={{margin: "0 auto"}} onSubmit={handleSubmit}>
            <label className="text-muted">Full Name: </label>
            <input className="form-control" name="fullname" value={fullname} onChange={handleChange}/>
            
            <label className="text-muted">E-mail</label>
            <input className="form-control" name="email" value={email} onChange={handleChange}/>
           
            <label className="text-muted">Mobile number: </label>
            <input className="form-control" name="mobile_number" value={mobile_number} onChange={handleChange}/>
           
            <label className="text-muted">Address </label>
            <input className="form-control" name="address" value={address} onChange={handleChange}/>
            
            <label className="text-muted">Gender</label>
            <input className="form-control" name="gender" value={gender} onChange={handleChange}/>
            
            <label className="text-muted">DOEL</label>
            <input className="form-control" name="doel" value={doel} onChange={handleChange}/>
            
            <label className="text-muted">Leeftijd</label>
            <input className="form-control" name="leeftijd" value={leeftijd} onChange={handleChange}/>
            <br/>
            <button type="submit" className="btn btn-primary float-right" disabled={disabled}>Update My Profile</button>
        </form>
    )

   return(
       <div>
          <DashboardEditLayout>
                {profileForm()}
          </DashboardEditLayout>
       </div>
   )
}

export default EditProfile;