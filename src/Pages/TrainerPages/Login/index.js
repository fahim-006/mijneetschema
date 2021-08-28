import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../../Redux/Actions';
import Loader from '../../../components/Loader/loader';
import { createNotification } from '../../../helpers';
import { socket } from '../../../socket';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 2,
            email: '',
            password: '',
            errors: {},
            loading: false,
        };
    }

    componentDidUpdate(prevProps , prevState) {
        const login = this.props.login;
        if( this.props.subscriptionError === true && this.props.isSubscribed === false){
            this.props.history.push("/trainer-subscription");
        }

        if (login && login.success && login.token) {
            let st= (prevState.loading? this.setState({loading: false}):null)
            // Function to start socket connection
            let startSocket = socket;
            if(login.user.role === parseInt(2)){
                createNotification('success','Login successfully','');
                this.props.history.push("/trainer-dashboard");
            }else if( login.user.role === parseInt(3)){
                createNotification('success','Login successfully','');
                this.props.history.push("/user-dashboard");
            }
        }else if(login && login.error && this.state.loading){
            this.handleLoading();
            createNotification('error',login.message,'');
        
        }
    }

    handleLoading = () => {
        let loading = this.state.loading;
        this.setState({
            loading: !loading
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    isValid = () => {
        const { email, password } = this.state;
        const regexTest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        let error = {};
        let formIsValid = true;
        if (email === '') {
            formIsValid = false;
            error['email'] = "*Please enter email.";
        }
        if (email && regexTest.test(email) === false) {
            formIsValid = false;
            error['email'] = "*Please enter a valid email address.";
        }
        if (password === '') {
            formIsValid = false;
            error['password'] = "*Please enter password.";
        }
        this.setState({ errors: error });
        return formIsValid;
    }

    handleSubmit = () => {
        if (this.isValid()) {
            const { role, email, password } = this.state;
            const requestbody = { role, email, password };
            this.props.trianerLogin(requestbody);
            this.setState({loading:true});
            // this.props.startLoading();
        }
    }

    render() {
        const { email, password, errors, loading } = this.state;
        return (
            <div>
                <div className="ep_mail_icon login_icon"><img src="./images/login-2.png" /></div>
                <div className="heading_dp_sec">Trainer Login</div>
                <p className="subheading_dp_sec">Vul jouw email en wachtwoord in om in te loggen</p>
                {loading ?
                    <Loader />
                    :
                    <div className="mail_input_epi">
                        <div className="form_group rltv_item">
                            <input
                                name="email"
                                type="text"
                                value={email}
                                onChange={this.handleChange}
                                placeholder="Email"
                            />
                            <span className="email_">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                            <p className="error_mesage"> {errors.email} </p>
                        </div>
                        <div className="form_group rltv_item">
                            <input
                                name="password"
                                type="password"
                                value={password}
                                onChange={this.handleChange}
                                placeholder="Wachtwoord"
                                autoComplete="off"
                            />
                            <span className="password_">
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </span>
                            <p className="error_mesage"> {errors.password} </p>
                        </div>
                        
                        <div className="form_group_submit">
                            <button type="button" onClick={this.handleSubmit}>
                                Inloggen
                            </button>
                        </div>
                    </div>
                }
                

            </div>
        )
    }
}

const mapStateToProps = state => ({
    login: state.Login,
    isSubscribed: state.Login.isSubscribed,
    subscriptionError: state.Login.subscriptionError,
    // loading: state.Loader.loaderOne,
});

const mapActionsToProps = dispatch =>
    bindActionCreators(
        {
            trianerLogin: Actions.loginRequest,
            // startLoading: Actions.startLoaderOne,
        },
        dispatch
    );
export default connect(mapStateToProps, mapActionsToProps)(LoginPage);