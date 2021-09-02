import React , {useState} from 'react'
import {Link} from 'react-router-dom'
import {createNewsletter} from '../../Redux/API/apiNewsletter'
import Swal from 'sweetalert2'


const CreateNewsletter = () => {
    const [values, setValues] = useState({
        email: '',
    });

    const{email}= values;

    const handleSubmit = (e) => {
        e.preventDefault();
       Swal.fire({
           title: 'Success',
           type: 'success',
           text: 'Email was sent to admin!'
       })
        
        setValues({
            ...values
        });

        createNewsletter({email: email})
            .then(response => {
                setValues({
                    ...values,
                    email: ''
                })
            })
            .catch(err=>{

            })
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const newsletterForm = () => {
        return(
            <form onSubmit={handleSubmit}>
            <span className="nwsltr_input">
                <input 
                 type="text"
                 name="email"
                 placeholder="enter email"
                 onChange={handleChange}
                 value={email}
            />

            <button type="submit" className="btn btn-link"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
            </span>
            </form>
        )
    }

    return(
        <div>
            {newsletterForm()}
        </div>
    )
}

export default CreateNewsletter;