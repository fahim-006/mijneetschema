import React, {useState, useEffect} from "react";
import DashboardEditLayout from '../../../layouts/DashboardEditLayout'
import axios from "axios";
import { auto } from "async";
import {updateTrainerProfile} from '../../../Redux/API/apiUpdateProfile'
const API = process.env.REACT_APP_API_URL;


const EditProfile = () =>{
    const [values, setValues] = useState({
        email : JSON.parse(localStorage.getItem('jwt')),
        fullname: '',
        mobile_number:'',
        address: '',
        gender: '',
        doel: '',
        leeftijd: '',
        description: '',
        facebookURL: '',
        twitterURL: '',
        linkedinURL: '',
        expertise: '',
        certificates: ''
    });

    const [inputList, setInputList] = useState([{ expertise: ""}]);
    const [inputList1, setInputList1] = useState([{ certificates: ""}]);



    const [disabled, setDisabled] = useState(false);
    const [redirect, setRedirect] =  useState(false);
    const [selected, setSelected] = useState([]);
    const {
        email,
        fullname,
        mobile_number,
        address,
        gender,
        doel,
        leeftijd,
        description,
        facebookURL,
        twitterURL,
        linkedinURL,
        expertise,
        certificates
    } = values;

    useEffect(()=> {
        axios.get(`${API}/users/fetch-trainer/all`)
            .then(response => {
                response.data.forEach((item, index)=>{
                 
    if(item.email == values.email){
     setValues({
        email: item.email,
        fullname: item.fullname,
        mobile_number: item.mobile_number,
        address: item.address,
        gender: item.gender,
        doel: item.doel,
        leeftijd: item.leeftijd,
        description: item.description,
        facebookURL: item.facebookURL,
        twitterURL: item.twitterURL,
        linkedinURL: item.linkedinURL,
        expertise: item.expertise,
        certificates: item.certificates
     })
    }
   
  })})
  .catch(err=>{

  })
    },[]);

    const handleChange = (e) => {
       // alert(([e.target.name]))
       if(e.target.name == 'doel'){
            selected.push(e.target.value)
        }
       
        if(e.target.name == 'doel'){
            setValues({
                ...values,
                [e.target.name]: selected,
            })
        }
        else{
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }
    }


    const handleSubmit = () =>{
        updateTrainerProfile(values)
            .then(response => {
                if(response.status === 200) {
                    setRedirect(true);
                }
            })
            .catch(err => setDisabled(false));
    }

    // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);

    const Main = Object.values (inputList).map (expp => expp.expertise)
    setValues({
        ...values,
        [name]:Main
    })
  };

  const handleInputChange1 = (e, index) => {
    const { name1, value1 } = e.target;
    const list1 = [...inputList1];
    list1[index][name1] = value1;
    setInputList1(list1);

    const Main1 = Object.values (inputList1).map (cert => cert.certificates)
    setValues({
        ...values,
        [name1]:Main1
    })
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

    // handle click event of the Remove button
    const handleRemoveClick1 = index => {
        const list1 = [...inputList1];
        list1.splice(index, 1);
        setInputList1(list1);
      };

  // handle click event of the Add button
  const handleAddClick = () => {
    //inputList.concat(...inputList, ',')
    setInputList([...inputList, { expertise: "" }]);
  };

    // handle click event of the Add button
    const handleAddClick1 = () => {
        //inputList.concat(...inputList, ',')
        setInputList1([...inputList1, { certificates: "" }]);
      };
    const doels = [
       
        {value: 'MaSelecteer een doelle', label: 'MaSelecteer een doelle', name:'doel'},
        {value: 'Fat Burning - Afvallen voor vrouwen', label: 'Fat Burning - Afvallen voor vrouwen',name:'doel'},
        {value: 'Fat Ripping - Afvallen voor mannen', label: 'Fat Ripping - Afvallen voor mannen',name:'doel'},
        {value: 'Muscle Shaping - Spieropbouw voor vrouwen', label: 'Muscle Shaping - Spieropbouw voor vrouwen',name:'doel'},
        {value: 'Muscle Building - Spieropbouw voor mannen', label: 'Muscle Building - Spieropbouw voor mannen',name:'doel'},
        {value: 'Mommy - Verantwoord fit worden', label: 'Mommy - Verantwoord fit worden',name:'doel'},
        {value: 'Running - Verbeteren van hardloopprestaties', label: 'Running - Verbeteren van hardloopprestaties',name:'doel'},
        {value: 'Pregnancy - Verantwoord fit blijven', label: 'Pregnancy - Verantwoord fit blijven',name:'doel'},
        {value: 'Obstacle Running - Verbeteren van prestaties', label: 'Obstacle Running - Verbeteren van prestaties',name:'doel'},
    ]

    
    
    const profileForm = () => (
        <form style={{margin: "0 auto"}} onSubmit={handleSubmit} style={{width: "100%"}}>
            <label className="text-muted">Full Name: </label>
            <input className="form-control" name="fullname" value={fullname} onChange={handleChange}/>
            
            <label className="text-muted">Email: </label>
            <input className="form-control" name="email" value={email} onChange={handleChange} disabled/>
           
            <label className="text-muted">Mobile number: </label>
            <input className="form-control" name="mobile_number" value={mobile_number} onChange={handleChange}/>
           
            <label className="text-muted">Address </label>
            <input className="form-control" name="address" value={address} onChange={handleChange}/>
            
            <label className="text-muted">Gender</label>
           
            <select className="form-control" name="gender" value={gender} onChange={handleChange}>
                <option name="Male" value="Male">Male</option>
                <option name="Female" value="Female">Female</option>
                <option name="Others" Value="Others">Others</option>
            </select>           
            
             {/*,
      
       
        : ''*/}
            {/*description*/}
            <label className="text-muted">Description: </label>
            <textarea className="form-control" name="description" value={description} onChange={handleChange}/>
            {/*FBURL*/}
            <label className="text-muted">Facebook URL </label>
            <input className="form-control" name="facebookURL" value={facebookURL} onChange={handleChange}/>

            {/*twitterURL*/}
            <label className="text-muted">twitter URL </label>
            <input className="form-control" name="twitterURL" value={twitterURL} onChange={handleChange}/>

             {/*twitterURL*/}
             <label className="text-muted">linkedin URL </label>
            <input className="form-control" name="linkedinURL" value={linkedinURL} onChange={handleChange}/>

             {/*expertise*/}
             <label className="text-muted">Expertise: (separate using comma) </label>
             {inputList.map((x, i) => {
        return (
          <div className="box">
            <input
              name="expertise"
              placeholder="expertise"
              value={x.expertise}
              onChange={e => handleInputChange(e, i)}
            />
           &nbsp;
              {inputList.length !== 1 && <button className="btn btn-sm btn-danger"
                onClick={() => handleRemoveClick(i)}>Remove</button>}&nbsp;
              {inputList.length - 1 === i && <button className="btn btn-sm btn-info" onClick={handleAddClick}>Add</button>}
          
          </div>
        );
      })}
            <input className="form-control" name="expertise" value={expertise} onChange={handleChange}/>




            {/*certificates*/}
            <label className="text-muted">Certificates:(separate using comma) </label>
            {inputList1.map((x, i) => {
        return (
          <div className="box">
            <input
              name="certificates"
              placeholder="certificates"
              value="vrtsdlfkgh"
              onChange={e => handleInputChange1(e, i)}
            />
           &nbsp;
              {inputList1.length !== 1 && <button className="btn btn-sm btn-danger"
                onClick={() => handleRemoveClick1(i)}>Remove</button>}&nbsp;
              {inputList1.length - 1 === i && <button className="btn btn-sm btn-info" onClick={handleAddClick1}>Add</button>}
          
          </div>
        );
      })}
            <input className="form-control" name="certificates" value={certificates} onChange={handleChange}/>


            {/*doel Checkbok*/}
            <label className="text-muted">Doel: </label>
            
            <p>Selected DOEL: {`${doel},`}</p>
            {doels.map (doel => {
               return(
                   <>
                        <li>
                            <input
                                name="doel" 
                                onChange={handleChange}
                                value={doel.value}
                                type="checkbox"
                                className="form-check-input"
                            />
                            <label className="form-check-label">{doel.value}</label>
                        </li>
                   </>
               )
            })}
            <br/>
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

 {/*   <select className="form-control" name="doel" value={doel} onChange={handleChange} multiple>
        <option name="MaSelecteer een doelle" value="Selecteer een doel">Selecteer een doel</option>
        <option name="Fat Burning - Afvallen voor vrouwen" value="Fat Burning - Afvallen voor vrouwen">Fat Burning - Afvallen voor vrouwen</option>
        <option name="Fat Ripping - Afvallen voor mannen" Value="Fat Ripping - Afvallen voor mannen">Fat Ripping - Afvallen voor mannen</option>
        <option name="Muscle Shaping - Spieropbouw voor vrouwen" value="Muscle Shaping - Spieropbouw voor vrouwen">Muscle Shaping - Spieropbouw voor vrouwen</option>
        <option name="Muscle Building - Spieropbouw voor mannen" value="Muscle Building - Spieropbouw voor mannen">Muscle Building - Spieropbouw voor mannen</option>
        <option name="Mommy - Verantwoord fit worden" value="Mommy - Verantwoord fit worden">Mommy - Verantwoord fit worden</option>
        <option name="Pregnancy - Verantwoord fit blijven" value="Pregnancy - Verantwoord fit blijven">Pregnancy - Verantwoord fit blijven</option>
        <option name="Running - Verbeteren van hardloopprestaties" value="Running - Verbeteren van hardloopprestaties">Running - Verbeteren van hardloopprestaties</option>
        <option name="Obstacle Running - Verbeteren van prestaties" value="Obstacle Running - Verbeteren van prestaties">Obstacle Running - Verbeteren van prestaties</option>
    </select>*/}