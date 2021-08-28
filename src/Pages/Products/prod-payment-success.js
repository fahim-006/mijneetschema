import React, { Component } from "react";
import { Actions } from "../../Redux/Actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductsLayout from "../../layouts/ProductsLayout";
import { createNotification } from "../../helpers";


class ProdPaymentSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {            // USER_ID
            payment_id: '',
        }
    }

    // "user_id": "",
    // "name": "",
    // "email": "",
    // "contact_no": "",
    // "address": "",
    // "amount_without_tax": "Total field is required",
    // "amount_with_tax": "Total field is required",
    // "total": "",
    // "payment_id": "",
    // "landmark": "",
    // "pincode": ""
    componentDidMount() {
        let payment_id = '';
        let user_id = '';
        if (localStorage.getItem('prod_purchs_id')) {
            payment_id = localStorage.getItem('prod_purchs_id');
        }
        if (localStorage.getItem('user_details')) {
            user_id = JSON.parse(localStorage.getItem('user_details'))._id;
        }
        if (localStorage.getItem('prodPayDetails')) {
            let details = JSON.parse(localStorage.getItem('prodPayDetails'));
            let reqBody = {
                user_id: user_id,
                name: details.name,
                email: details.email,
                contact_no: details.contact_no,
                address: details.address,
                amount_without_tax: details.amount_without_tax,
                amount_with_tax: details.amount_with_tax,
                total: details.total,
                payment_id: payment_id,
                landmark: details.landmark,
                pincode: details.pincode,
                alternate_contact_no: '',
                state: details.state,
                city: details.city,
                products: details.products,
                couponCode: details.couponCode
            }
            
            this.props.prodPayment(reqBody);
        }

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('prevProps',  this.props.prod_pay_success);
        if (
            this.props.prod_pay_success &&
            prevProps.prod_pay_success !== this.props.prod_pay_success
        ) {
            createNotification('success', "Congratulations! Your order is placed successfully.")
            let store = ["items_in_cart", "prodPayDetails", "prod_purchs_id"];
            store.forEach((item) => localStorage.removeItem(item));
            this.props.updateCartValue();
        }
        if (
            this.props.prod_pay_error_msg && this.props.prod_pay_err &&
            prevProps.prod_pay_error_msg !== this.props.prod_pay_error_msg
        ) {
            createNotification('error', this.props.prod_pay_error_msg);
        }
    }

    render() {
        return (
            <div>
                <ProductsLayout>
                    <div className="diet_paln_items">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    {this.props.prod_pay_success ?
                                        <div className="heading_dp_sec subscription_heading">
                                            Congratulations! Your order is placed successfully.
                                        </div>
                                        :
                                        this.props.prod_pay_err ?
                                        <div className="heading_dp_sec subscription_heading">
                                            Sorry! Your order is not placed. It seems your payment was not complete.
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-area homepage-content-main">
                        <section className="diet_paln_items our-prod-main all-products-sec complete-prod-dtl place-order-sec">
                            <div className="container">
                                <div className="row all-products-titles place-order-titles">
                                    <div className="col-md-12">
                                        <ul className="nav nav-tabs">
                                            <li>
                                                <a className="active" href="/products">
                                                    <i className="fa fa-check-circle"></i> Shopping Continue
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/">
                                                    <i className="fa fa-check-circle"></i> Go to Home
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </ProductsLayout>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    prod_pay_error_msg: state.Products.prod_pay_error_msg,
    prod_pay_success: state.Products.prod_pay_success,
    prod_pay_err: state.Products.prod_pay_err,
})

const mapActionsToProps = dispatch =>
    bindActionCreators({
        prodPayment: Actions.prodPayment,
        updateCartValue: Actions.updateCartValue
    }, dispatch);

export default
    connect(
        mapStateToProps,
        mapActionsToProps
    )(ProdPaymentSuccess);