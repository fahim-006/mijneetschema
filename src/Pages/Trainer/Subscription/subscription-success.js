import React, { Component } from 'react';
import axios from 'axios';
import UserLayout from '../../../layouts/UserLayout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../../Redux/Actions';
var moment = require('moment');
const URL = process.env.REACT_APP_API_URL;
const headers = {
    "Content-Type": "application/json",
};
class SubscriptionSuccess extends Component {
    constructor() {
        super();
        this.state = {
            payment_id: '',
            user_id: '',
            plan_name: '',
            start_date: '',
            end_date: '',
            payment_amount: ''
        };
    }

    componentDidMount() {
        let subs_details = '';
        let pay_id = '';
        let userId = '';
        if (localStorage.getItem('trainer_data') !== 'undefined') {
            userId = JSON.parse(localStorage.getItem('trainer_data'))._id;
        }else if(localStorage.getItem('user_id')){
            userId = localStorage.getItem('user_id');
        }
        if (localStorage.getItem('subs_details') !== 'undefined') {
            subs_details = JSON.parse(localStorage.getItem('subs_details'));
        }
        if (localStorage.getItem('payment_id')) {
            pay_id = localStorage.getItem('payment_id');
        }

        let today = moment().format('YYYY-MM-DD');
        let endDate = moment().add().format('YYYY-MM-DD')
        if (
            subs_details &&
            pay_id &&
            userId
        ) {
            this.setState({
                payment_id: pay_id,
                user_id: userId,
                plan_name: subs_details.description,
                start_date: today,
                end_date: endDate,
                payment_amount: subs_details.price
            }, () => {
                this.props.subscriptionComplete(this.state);
            })
        }
    }

    componentDidUpdate() {
        if (this.props.subsSuccess && this.props.data) {
            localStorage.setItem('user_details', JSON.stringify(this.props.data));
            localStorage.setItem('user_role', this.props.data.role);
            this.props.history.push("/trainer-dashboard");
            // const { role, email, password } = this.props.data;
            // this.props.trainerLogin({ role, email, password });
        }
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
                    <div className="diet_paln_items">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="heading_dp_sec subscription_heading">
                                        Subscription Completed
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </UserLayout>
        )
    }
}

const mapStateToProps = state => ({
    subsSuccess: state.Subscription.subsSuccess,
    data: state.Subscription.data,
    err_message: state.Subscription.subsErrMessage,
    subsError: state.Subscription.subsError
});

const mapActionsToProps = dispatch =>
    bindActionCreators({
        subscriptionComplete: Actions.subscriptionComplete,
        trainerLogin: Actions.loginRequest,
    }, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(SubscriptionSuccess);