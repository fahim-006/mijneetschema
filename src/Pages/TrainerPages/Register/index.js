import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { Actions } from '../../../Redux/Actions';
import Loader from '../../../components/Loader/loader';
import LocationSearchInput from '../Address';
import { createNotification } from '../../../helpers';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 2,
            email: '',
            name: '',
            // image: '',
            mobile_number: '',
            job_role: '',
            latitude: '',
            longitude: '',
            address: '',
            password: '',
            cnfrmPassword: '',
            errors: {},
            regProtectionPolicy: false,
            loading: false,
        };
    }

    componentDidUpdate(prevProps , prevState) {
        if (this.props.success) {
            // this.handleLoading();
            let st= (prevState.loading? this.setState({loading: false}):null)
            createNotification('success','Register successfully , Now purchase the subscription','');
            createNotification('info','Now purchase the subscription to continue','');
            this.props.history.push('/trainer-subscription');
        }

        if (this.props.error) {
            this.handleLoading();
            createNotification('error',this.props.register.message,'');
           
        }
    }

    handleLoading = () => {
        let loading = this.state.loading;
        this.setState({
            loading: !loading
        })
    }
    isValid = () => {
        const {
            email, name, mobile_number, latitude,
            longitude, address, password, job_role,
            cnfrmPassword, regProtectionPolicy
        } = this.state;
        let error = {};
        let formIsValid = true;
        const regexTest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const mobPattern = /^[0-9\b]+$/
        if (email === '') {
            formIsValid = false;
            error['email'] = "*Please enter email.";
        }
        if (email && regexTest.test(email) === false) {
            formIsValid = false;
            error['email'] = "*Please enter a valid email address.";
        }
        if (name === '') {
            formIsValid = false;
            error['name'] = "*Please enter name.";
        }
        if (mobile_number === '') {
            formIsValid = false;
            error['mobile_number'] = "*Please enter mobile number.";
        }
        if (mobile_number && mobPattern.test(mobile_number) === false) {
            formIsValid = false;
            error['mobile_number'] = "*Please enter a valid mobile number.";
        }
        if (job_role === '') {
            formIsValid = false;
            error['job_role'] = "*Your role is missing. Please enter your role.";
        }
        if (latitude === '' || longitude === '') {
            formIsValid = false;
            error['location'] = "*Location is missing. Please add location.";
        }
        if (address === '') {
            formIsValid = false;
            error['address'] = "*Address is missing. Please enter address.";
        }
        if (password === '') {
            formIsValid = false;
            error['password'] = "*Please enter password.";
        }
        if (cnfrmPassword === '') {
            formIsValid = false;
            error['cnfrmPassword'] = "*Please re-enter your password.";
        }
        if (cnfrmPassword && cnfrmPassword !== password) {
            formIsValid = false;
            error['cnfrmPassword'] = "*Password and confirm password should be same.";
        }
        if (regProtectionPolicy === false) {
            formIsValid = false;
            error['regProtectionPolicy'] = "*Please read and accept the data protection policy."
        }

        this.setState({ errors: error });
        return formIsValid;
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCheckBox = (event) => {
        // event.preventDefault();
        this.setState({
            [event.target.name]: event.target.checked
        })
    }


    handleSubmit = () => {
        if (this.isValid()) {
            const {
                role, email, name, mobile_number, job_role,
                latitude, longitude, address, password,
            } = this.state;
            const requestbody = {
                role, email, name, mobile_number, job_role,
                latitude, longitude, address, password
            };
            this.props.trainerRegister(requestbody);
            this.handleLoading();
            // this.props.startLoading();
        }
    }

    handleAddressChange = address => {
        console.log(`handleAddressChange ${address}`);
        this.setState({ address });
    };

    handleSelect = async (address) => {
        this.setState({ address });
        let cords = await geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log(`latLng ${latLng}`);
                return latLng
            })
            .catch(error => error);
        this.setState({
            latitude: cords.lat,
            longitude: cords.lng
        });
    };

    render() {
        const {
            email, name, mobile_number,
            password, cnfrmPassword, image,
            errors, regProtectionPolicy, loading,
            job_role, address, latitude, longitude
        } = this.state;
        return (
            <div>
            
                <div className="ep_mail_icon register_icon">
                    <img src="/images/signup-2.png" />
                </div>
                <div className="heading_dp_sec">Trainer registratie</div>
                <p className="subheading_dp_sec">Maak een account aan</p>
                {loading ?
                    <Loader />
                    :
                    <div className="mail_input_epi">
                        <div className="form_group rltv_item">
                            <input
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Voor & achternaam"
                                onChange={this.handleChange}
                            />
                            <span className="full_name_">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </span>
                            <p className="error_mesage"> {errors.name} </p>
                        </div>
                        <div className="form_group rltv_item">
                            <input
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={this.handleChange}
                            />
                            <span className="email_">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                            <p className="error_mesage"> {errors.email} </p>
                        </div>
                        <div className="form_group rltv_item">
                            <input
                                type="tel"
                                name="mobile_number"
                                value={mobile_number}
                                placeholder="Telefoon nummer"
                                onChange={this.handleChange}
                                maxLength="10"
                                pattern="[789][0-9]\d"
                            />
                            <span className="cntct_number_">
                                <i className="fa fa-phone" aria-hidden="true"></i>
                            </span>
                            <p className="error_mesage"> {errors.mobile_number} </p>
                        </div>

                        {/*  */}
                        <div className="form_group rltv_item">
                            <input
                                name="job_role"
                                value={job_role}
                                placeholder="Functie titel"
                                onChange={this.handleChange}
                            />
                            <span className="location_">
                                <i className="fa fa-tasks" aria-hidden="true"></i>
                            </span>
                            <p className="error_mesage"> {errors.job_role} </p>
                        </div>
                        <div className="form_group rltv_item">
                            <LocationSearchInput
                                address={address}
                                handleSelect={this.handleSelect}
                                handleAddressChange={this.handleAddressChange}
                            />
                        </div>
                    

                        <div className="form_group rltv_item">
                            <input
                                type="password"
                                name="password"
                                placeholder="Wachtwoord"
                                value={password}
                                onChange={this.handleChange}
                                autoComplete="off"
                            />
                            <span className="location_">
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </span>
                            <p className="error_mesage"> {errors.password} </p>
                        </div>
                        <div className="form_group rltv_item">
                            <input
                                type="password"
                                name="cnfrmPassword"
                                placeholder="Bevestig wachtwoord"
                                value={cnfrmPassword}
                                onChange={this.handleChange}
                                autoComplete="off"
                            />
                            <span className="address_">
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </span>
                            <p className="error_mesage"> {errors.cnfrmPassword} </p>
                        </div>
                      
                        <div className="form_grp_checkbox">
                            <div className="custom-control custom-checkbox mr-sm-2">
                                <input
                                    type="checkbox"
                                    name="regProtectionPolicy"
                                    checked={regProtectionPolicy}
                                    onChange={this.handleCheckBox}
                                    className="custom-control-input"
                                    id="regProtectionPolicy"
                                />
                                <label className="custom-control-label" htmlFor="regProtectionPolicy">
                                    Ik heb de <a href="#">Algemene voorwaarden</a> en <a href="#">Privacyverklaring</a> van mijneetschema gelezen en begrepen
                                </label>
                                <p className="error_mesage">{errors.regProtectionPolicy}</p>
                            </div>
                        </div>
                        <div className="form_group_submit">
                            <button type="button" onClick={this.handleSubmit}>
                                Registreren
                            </button>
                        </div>
                    </div>
                }
              

                {/* <!--================diet_paln_items section ends================--></div> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    register: state.Register,
    success: state.Register.success,
    error: state.Register.error
    // loading: state.Loader.loading,
});

const mapActionsToProps = dispatch =>
    bindActionCreators(
        {
            trainerRegister: Actions.trainerRegisterRequest,
            // startLoading: Actions.startLoading,
        },
        dispatch
    );
export default connect(mapStateToProps, mapActionsToProps)(RegisterPage);