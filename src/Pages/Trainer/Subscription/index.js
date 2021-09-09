import React, { Component } from 'react';
import UserLayout from '../../../layouts/UserLayout';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../../Redux/Actions';
import { createNotification } from '../../../helpers';
var moment = require('moment');

class SubscriptionPage extends Component {
    constructor() {
        super();
        this.state = {
            price: '',
            description: 'Test Plan',
            start_date: '',
            end_date: ''
        };
    }

    componentDidUpdate() {
        if (this.props.checkout_url) {
            window.location = `${this.props.checkout_url}`;
            createNotification('success', 'Your subscription request is added successfully. Please complete the payment process.')
            // localStorage.setItem('payment_id')
        } else if(this.props.error && this.props.err_message){
            createNotification('error', this.props.err_message);
        }
    }

    handleClick = (price, description) => {
        // const {price, description} = this.state;
        // const formData = new FormData();
        // formData.append('price', this.state.price);
        // formData.append('description', this.state.description);
        const startDate = moment().format('YYYY-MM-DD');
        let endDate = '';
        if (description === "Basic Plan") {
            endDate = moment().add(1, 'months').format('YYYY-MM-DD');
            this.setDates(price, description, startDate, endDate);
        }
        if (description === "Golden Plan") {
            endDate = moment().add(3, 'months').format('YYYY-MM-DD');
            this.setDates(price, description, startDate, endDate);
        }
        if (description === "Diamond Plan") {
            endDate = moment().add(6, 'months').format('YYYY-MM-DD');
            this.setDates(price, description, startDate, endDate);
        }
        // this.setState({
        //     price: price,
        //     description: description
        // });
        // localStorage.setItem('subs_details', JSON.stringify(this.state));
        // this.props.getSubscription({ price: price, description: description });
    }

    setDates = (price, description, startDate, endDate) => {
        this.setState({
            price: price,
            description: description,
            start_date: startDate,
            end_date: endDate
        }, () => {
            localStorage.setItem('subs_details', JSON.stringify(this.state));
            this.props.getSubscription({ price: price, description: description });
        });
    }

    render() {
        
        return (
            <UserLayout>
                <div>
                    {/* ===== banner section start ===== */}
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
                    {/* ===== banner section ends ===== */}

                    {/* ===== diet_paln_items section start ===== */}

                    <div className="diet_paln_items">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="heading_dp_sec subscription_heading">
                                        Kies jouw gewenste lidmaatschap
                                       
                                        </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-4">
                                    <div className="subscription_item">
                                        <div className="sbscrb_head">Basic Plan</div>
                                        <div className="subscription_cntnt">
                                            <div className="sbscrb_price">
                                                <b>€65</b>
                                                <span>Per maand</span>
                                            </div>
                                            <div className="sbscrb_list">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            </div>
                                            <div className="sbscrb_btn">
                                                <button
                                                    onClick={(e) => this.handleClick('9.99', 'Basic Plan')}
                                                    type="button"
                                                > Selecteren </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="subscription_item">
                                        <div className="sbscrb_head">Premium Plan</div>
                                        <div className="subscription_cntnt">
                                            <div className="sbscrb_price">
                                                <b>€90</b>
                                                <span>Per maand</span>
                                            </div>
                                            <div className="sbscrb_list">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            </div>
                                            <div className="sbscrb_btn">
                                                <button
                                                    onClick={(e) => this.handleClick('19.99', 'Golden Plan')}
                                                    type="button"
                                                >Selecteren</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="subscription_item">
                                        <div className="sbscrb_head">Ultimate Plan</div>
                                        <div className="subscription_cntnt">
                                            <div className="sbscrb_price">
                                                <b>€95</b>
                                                <span>Per maand</span>
                                            </div>
                                            <div className="sbscrb_list">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            </div>
                                            <div className="sbscrb_btn">
                                                <button
                                                    onClick={(e) => this.handleClick('29.99', 'Diamond Plan')}
                                                    type="button"
                                                >Selecteren</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*===== diet_paln_items section ends =====*/}

                </div>
            </UserLayout>
        )
    }
}

const mapStateToProps = state => ({
    checkout_url: state.Subscription.checkout_url,
    err_message: state.Subscription.message,
    error: state.Subscription.error,
})

const mapActionsToProps = dispatch =>
    bindActionCreators({
        getSubscription: Actions.getSubscription
    }, dispatch);
export default connect(mapStateToProps, mapActionsToProps)(SubscriptionPage);