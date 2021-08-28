import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProductsLayout from '../../layouts/ProductsLayout';
import { Actions } from '../../Redux/Actions';
import { createNotification } from '../../helpers';
import Loader from '../../components/Loader/loader';

class SecureCheckout extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            guest_email: '',
            loading: false
        };
    }

    componentDidUpdate(prevProps , prevState) {
        const login = this.props.login;
        if (login && login.success && login.token) {
            let st= (prevState.loading? this.setState({loading: false}):null)
            let email = JSON.parse(localStorage.getItem('user_details')).email;
            if( login.user.role === parseInt(3) && email){
                createNotification('success','Succesvol ingelogd','');
                this.props.history.push({
                    pathname:"/shopping-cart",
                    state: {
                        email: email,
                    }
                });
            }
        }else if(login && login.error && this.state.loading){
            createNotification('error',login.message);
            this.setState({loading: false});
        }
    }

    isLoginValid = () => {
        const { email, password } = this.state;
        let error = {};
        let formIsValid = true;
        const regexTest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (email === '') {
            formIsValid = false;
            error['email'] = "*Vul jouw email in";
        }
        if (email && regexTest.test(email) === false) {
            formIsValid = false;
            error['email'] = "*Vul een geldige email in";
        }
        if (password === '') {
            formIsValid = false;
            error['password'] = "*Vul jouw wachtwoord in";
        }
        this.setState({ errors: error });
        return formIsValid;
    }
    handleOnChange = (event) =>{
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    userCheckout = () => {
        const {email, password} = this.state;
        if(this.isLoginValid()){
            this.props.userLogin({email: email,  password: password, role: 3});
            this.setState({loading: true});
        }else{
            createNotification('info', 'Vul jouw email en wachtwoord in om verder te gaan')
        }
    }

    guestCheckout = () => {
        const { guest_email } = this.state;
        if(guest_email){
            this.props.history.push({
                pathname:"/shopping-cart",
                state: {
                    email: guest_email,
                }
            });
        }else{
            createNotification('info', 'Vul een geldige email in om af te rekenen als gast');
        }
    }
    
    render(){
        const{ email, password, guest_email, loading } = this.state;
        return(
            <ProductsLayout>
                <div className="banner_sec">
                    <div className="container">
                        <div className="col-12">
                            <div className="steps_result">
                                <div className="banner_txt d-flex">
                                    <div className="banr_headng sc_ckout_head">Afrekenen</div>
                                    <div className="banr_image">
                                        <img src="/images/fitness_PNG181.png" className=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-area homepage-content-main">
                <section className="diet_paln_items our-prod-main all-products-sec complete-prod-dtl place-order-sec">
                    <div className="container"> 
                        <div className="row tab-content-row place-order-row">
                            <div className="tab-content">
                                <div id="Shopping-Cart" className="tab-pane fade in active scure_chkout_field_wrap">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="description-details all-details cart-details cart-address">
                                                <div className="diet_item prod-con">
                                                    <div className="block">
                                                        <div className="heading-cart-row">
                                                            <div className="heading-cart-col cart-image">Bestaande klant</div>
                                                        </div>
                                                        <div className="heading-cart-row product-row-cart address-form-row">
                                                        {loading ?
                                                            <Loader />
                                                            :<form>
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-12">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="email"
                                                                            name="email"
                                                                            value={email}
                                                                            placeholder="Email adres"
                                                                            onChange={this.handleOnChange}
                                                                        />
                                                                    </div>
                                                                    <div className="form-group col-md-12">
                                                                        <input
                                                                            type="password"
                                                                            className="form-control"
                                                                            id="password"
                                                                            name="password"
                                                                            value={password}
                                                                            placeholder="Wachtwoord"
                                                                            onChange={this.handleOnChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="form-row proceed-btn">
                                                                    <div className="form-group col-md-12">
                                                                        <div className="click_btn text-right">
                                                                            <button
                                                                                type="button"
                                                                                onClick={this.userCheckout}
                                                                            >
                                                                                Inloggen bestaande klant
                                                                            </button>
                                                                            <i className="fa fa-long-arrow-right"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="description-details all-details cart-details cart-address">
                                                <div className="diet_item prod-con">
                                                    <div className="block">
                                                        <div className="heading-cart-row">
                                                            <div className="heading-cart-col cart-image">Nieuwe klant bij mijneetschema</div>
                                                        </div>
                                                        <div className="heading-cart-row product-row-cart address-form-row">
                                                            <form>
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-12">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="guest_email"
                                                                            name="guest_email"
                                                                            value={guest_email}
                                                                            placeholder="Email Address"
                                                                            onChange={this.handleOnChange}
                                                                        />
                                                                    </div>
                                                                </div>
																<div className="form-row">
																	<div className="form-group col-md-12">
																		<div className="guest_check_list_wrap">
																			<h3>Maak een account met als voordeel:</h3>
																			<div className="gst_chk_list">
																				<ul>
																					<li>
                                                                                        <i className="fa fa-check-square-o" aria-hidden="true"></i>
                                                                                        Sneller afrekenen
                                                                                    </li>
																					<li>
                                                                                        <i className="fa fa-check-square-o" aria-hidden="true"></i>
                                                                                        Gemakkelijk opnieuw bestellen en bestellingen te volgen
                                                                                    </li>
																					<li>
                                                                                        <i className="fa fa-check-square-o" aria-hidden="true"></i>
                                                                                        Bewaar gemakkelijk adressen
                                                                                    </li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
																
                                                                <div className="form-row proceed-btn">
                                                                    <div className="form-group col-md-12">
                                                                        <div className="click_btn text-right">
                                                                            <button
                                                                                type="button"
                                                                                onClick={this.guestCheckout}
                                                                            >
                                                                                Afrekenen als een gast
                                                                            </button>
                                                                            <i className="fa fa-long-arrow-right"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
            </ProductsLayout>
        )
    }
}

const mapStateToProps = state => ({
    login: state.Login,
});

const mapActionsToProps = dispatch => 
    bindActionCreators({
        userLogin: Actions.loginRequest,
    }, dispatch);

export default 
    connect(
        mapStateToProps,
        mapActionsToProps
    )(SecureCheckout);