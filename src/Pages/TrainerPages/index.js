import React from 'react';
// import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import UserLayout from '../../layouts/UserLayout';

const SelectRegisterType = (props) => {
    return (
        <UserLayout {...props}>
            <div>
                <div className="banner_sec">
                    <div className="container">
                        <div className="col-12">
                            <div className="steps_result">
                                <div className="banner_txt d-flex">
                                    <div className="banr_headng">Mijn<br />Eetschema</div>
                                    <div className="banr_image">
                                        <img src="images/fitness_PNG181.png" className="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="email_paln_items login_screen">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <div className="ep_inner">
                                    <Login {...props}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="ep_inner">
                                    <Register {...props}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default SelectRegisterType;