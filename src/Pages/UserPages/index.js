import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';
import UserLayout from '../../layouts/UserLayout';
import { render } from '@testing-library/react';

const SelectLoginType = (props) => {

    return (
        <UserLayout>
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
                                    <UserLogin {...props}/>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="ep_inner">
                                    <UserRegister {...props}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default SelectLoginType;