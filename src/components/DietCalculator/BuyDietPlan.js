import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../Redux/Actions';
import { createNotification } from '../../helpers';
import history from '../../history';
import PurchaseSuccess from './PurchaseSuccess';

class BuyDietPLan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gotoPayment: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.payment_url && (prevProps.payment_url !== this.props.payment_url)) {
            window.location= `${this.props.payment_url}`;
        }
    }

    handlePurchase = () => {
        const user_id = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details'))._id : null;
        // here we will check for user login
        const price = '12.00';
        const description = 'Buying Diet Plan';
        let pay_details = {
            price: price,
            description: description,
            method_name: this.props.method_name
        };
        localStorage.setItem('pay_details', JSON.stringify(pay_details));

        if (localStorage.getItem('user_details')) {
            let user = JSON.parse(localStorage.getItem('user_details'));
            let dietData = this.props.data;
            console.log('if 1 props.dietData', dietData);
            dietData=Object.assign({
                userName: user.name,
                userEmail: user.email,
                userId: user._id,
                dailyPerfect: this.props.dailyPerfect,
                basalMetabolic: this.props.basalMetabolic
            }, dietData);
            console.log('if 2 props.dietData', dietData);
            localStorage.setItem('dietData', JSON.stringify(dietData));
            // this.setState({ gotoPayment: true });
            this.props.buyDietPlan({ price: price, description: description });
            // this.props.calculateDiet(dietData);
        } else {
            let dietData = this.props.data;
            console.log('else 1 props.dietData', dietData);
            dietData=Object.assign({
                userName: dietData.personal_mesurement.name,
                userEmail: dietData.personal_mesurement.email,
                userId: "",
                dailyPerfect: this.props.dailyPerfect ? this.props.dailyPerfect : '',
                basalMetabolic: this.props.basalMetabolic
            }, dietData);
            console.log('else 1 props.dietData', dietData);
            localStorage.setItem('dietData', JSON.stringify(dietData));
            // this.setState({ gotoPayment: true });
            this.props.buyDietPlan({ price: price, description: description });
        }

    }

    handleReCalculate = () => {
        this.props.reCalculateDiet();
    }
    render() {
        const { gotoPayment } = this.state;
        return (
            <div className="buy_btn_div">
                {/* {!gotoPayment ? */}
                <button type="button" onClick={this.handlePurchase}>
                    Bestel jouw eetschema
                </button>

                <button type="button" onClick={this.handleReCalculate}>
                    Opnieuw berekenen
                </button>
                    {/* :
                    <PurchaseSuccess {...this.props}/>
                } */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    payment_url: state.Subscription.payment_url,
    purchaseError: state.Subscription.purchaseError,
    purchaseErrMsg: state.Subscription.purchaseErrMsg,
    purchaseSuccess: state.Subscription.purchaseSuccess,
});

const mapActionsToProps = dispatch =>
    bindActionCreators({
        buyDietPlan: Actions.dietPurchase,
        calculateDiet: Actions.calculatorRequest,
        reCalculateDiet: Actions.reCalculateDiet,
    }, dispatch);

export default
    connect(
        mapStateToProps,
        mapActionsToProps
    )(BuyDietPLan);