import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../../Redux/Actions';
import Loader from '../../../components/Loader/loader';
import { createNotification } from '../../../helpers';

class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 3,
            email: '',
            name: '',
            // image: '',
            mobile_number: '',
            password: '',
            cnfrmPassword: '',
            errors: {},
            regProtectionPolicy: false,
            loading: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // const login = this.props.login;
        if (this.props.isRegister === true && this.props.registerMsg !== prevProps.registerMsg) {
            createNotification('success', this.props.registerMsg);
            // this.handleLoading();
            let st = (prevState.loading ? this.setState({ loading: false }) : null)
            this.props.history.push("/user-dashboard");
        }
        if (this.props.error !== prevProps.error) {
            createNotification('error', this.props.errMessage, '');
            this.handleLoading();
        }
    }

    handleLoading = () => {
        let loading = this.state.loading;
        this.setState({
            loading: !loading
        })
    }

    isValid = () => {
        const { email, name, mobile_number, password, cnfrmPassword, regProtectionPolicy } = this.state;
        let error = {};
        let formIsValid = true;
        const regexTest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const mobPattern = /^[0-9\b]+$/  /*new RegExp(/^[0-9\b]+$/) */
        if (email === '') {
            formIsValid = false;
            error['email'] = "*Vul jouw email in";
        }
        if (email && regexTest.test(email) === false) {
            formIsValid = false;
            error['email'] = "*Vul een geldige email in";
        }
        if (name === '') {
            formIsValid = false;
            error['name'] = "*Vul jouw naam in";
        }
        if (mobile_number === '') {
            formIsValid = false;
            error['mobile_number'] = "*Vul jouw telefoonnummer in";
        }
        if (mobile_number && mobPattern.test(mobile_number) === false) {
            formIsValid = false;
            error['mobile_number'] = "*Vul een geldige telefoonnummer in";
        }
        if (password === '') {
            formIsValid = false;
            error['password'] = "*Vul jouw wachtwoord in";
        }
        if (cnfrmPassword === '') {
            formIsValid = false;
            error['cnfrmPassword'] = "*Bevestig jouw wachtwoord";
        }
        if (cnfrmPassword !== password) {
            formIsValid = false;
            error['cnfrmPassword'] = "*Jouw wachtwoorden komen niet overeen";
        }
        if (regProtectionPolicy === false) {
            formIsValid = false;
            error['regProtectionPolicy'] = "*Accepteer de algemene voorwaarden en privacyverklaring"
        }
        this.setState({ errors: error });
        return formIsValid;
    }

    handleChange = (event) => {
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
            const { role, email, name, mobile_number, password } = this.state;
            const requestbody = { role, email, name, mobile_number, password };
            this.props.userRegister(requestbody);
            this.handleLoading();
            // this.props.startLoading();
        }
    }

    render() {
        const {
            email, name, mobile_number,
            password, cnfrmPassword, image,
            errors, regProtectionPolicy, loading
        } = this.state;
        return (
            <div>
                <div className="ep_mail_icon register_icon">
                    <img src="./images/signup-2.png" />
                </div>
                <div className="heading_dp_sec">Registratie</div>
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
                                placeholder="Voor & Achternaam"
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
                                placeholder="Telefoonnummer"
                                onChange={this.handleChange}
                                max="10"
                                pattern="[789][0-9]{9}"
                            />
                            <span className="cntct_number_">
                                <i className="fa fa-phone" aria-hidden="true"></i>
                            </span>
                            <p className="error_mesage"> {errors.mobile_number} </p>
                        </div>
                        <div className="form_group rltv_item">
                            <input
                                type="password"
                                // placeholder="Location"
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
                                // placeholder="Address"
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
                {/* </div>
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>
        )
    }
}

const mapStateToProps = state => ({
    isRegister: state.Register.isRegister,
    error: state.Register.registerErr,
    errMessage: state.Register.errMessage,
    registerMsg: state.Register.registerMsg,
    // loading: state.Loader.loading,
});

const mapActionsToProps = dispatch =>
    bindActionCreators(
        {
            userRegister: Actions.userRegisterRequest,
            // startLoading: Actions.startLoading,
        },
        dispatch
    );
export default connect(mapStateToProps, mapActionsToProps)(UserRegister);