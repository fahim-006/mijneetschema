import React, { Component } from "react";
import { createNotification } from "../../helpers";
import { connect } from "react-redux";
import { Actions } from "../../Redux/Actions";
import { bindActionCreators } from "redux";

class PurchaseSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',               // USER_ID
            payment_id: '',            // Payment_Id
            r1: '',                    // Diet start date
            r2: '',                    // Diet duration
            r3: '',                    // Starting weight
            r4: '',                    // Start Lean Bodymass
            r5: '',                    // Start body fat
            r6: '',                    // BasalMetabolic
            r7: '',                    // Maintenance DailyIntake
            r8: '',                    // Result
            method_name: '',           // Method Name
            // dietData: '',
            email: '',
        }
    }

    componentDidMount() {
        let payment_id = '';
        let user_id = '';
        let method_name = '';
        let userEmail = '';
        if (localStorage.getItem('diet_payment_id') !== 'undefined') {
            payment_id = localStorage.getItem('diet_payment_id');
        }
        if (localStorage.getItem('user_details') && localStorage.getItem('user_details') !== 'undefined') {
            user_id = JSON.parse(localStorage.getItem('user_details'))._id;
        }
        if (localStorage.getItem('pay_details') !== 'undefined') {
            method_name = JSON.parse(localStorage.getItem('pay_details')).method_name
        }
        if (localStorage.getItem('dietData') !== 'undefined') {
            userEmail = JSON.parse(localStorage.getItem('dietData')).userEmail;
        }
        if (payment_id && method_name && (user_id || userEmail)) {
            this.setState({
                payment_id: payment_id,
                user_id: user_id,
                method_name: method_name,
                email: userEmail,
                r1: '',
                r2: '',
                r3: '',
                r4: '',
                r5: '',
                r6: '',
                r7: '',
                r8: ''
            }, () => {
                this.props.dietPurchaseComplete(this.state);
            });
        }
        // this.props.dietPurchaseComplete(this.state);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('PurchaseSuccess 2 componentDidUpdate', this.props);
        if (prevProps.pur_comp_success !== this.props.pur_comp_success) {
            console.log('localStorage dietData', localStorage.getItem('dietData'));
            if (localStorage.getItem('dietData') !== 'undefined') {
                let user_dietData = JSON.parse(localStorage.getItem('dietData'));
                this.props.calculateDiet(user_dietData);
            }
            // window.location.href = "/user/diet-plan";
        }
        if(prevProps.success !== this.props.success){
            if(localStorage.getItem('user_details') === 'undefined'){
                createNotification('success', "Congratulations! Your order is placed successfully.");
                window.location.href = "/";
            }else{
                window.location.href = "/user/diet-plan";
            }
        }
    }

    render() {
        return (
            <div>
                {/* ===== banner section start ===== */}
                {/* <div className="banner_sec">
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
                </div> */}
                {/* ===== banner section ends ===== */}
                <div className="diet_paln_items">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="heading_dp_sec subscription_heading">
                                    Diet plan purchase Completed
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    paymentData: state.Subscription.paymentData,
    pur_comp_error: state.Subscription.pur_comp_error,
    pur_comp_success: state.Subscription.pur_comp_success,
    pur_comp_err_msg: state.Subscription.pur_comp_err_msg,

    success: state.Calculator.success,
    error: state.Calculator.error,
});

const mapActionsToProps = dispatch =>
    bindActionCreators({
        dietPurchaseComplete: Actions.dietPurchaseComplete,
        calculateDiet: Actions.calculatorRequest,
    }, dispatch);

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PurchaseSuccess);