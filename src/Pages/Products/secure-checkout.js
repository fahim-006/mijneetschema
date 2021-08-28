import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductsLayout from "../../layouts/ProductsLayout";
import { Actions } from "../../Redux/Actions";
import { createNotification } from "../../helpers";
import Loader from "../../components/Loader/loader";

class SecureCheckout extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            guest_email: '',
            loading: false,
            coupon: '',
        };
    }

    componentDidMount(){
        if(this.props.location && this.props.location.state){
            this.setState({
                coupon: this.props.location.state.coupon
            });
        }
    }

    componentDidUpdate(prevProps , prevState) {
        const login = this.props.login;
        if (login && login.success && login.token) {
            let st= (prevState.loading? this.setState({loading: false}):null)
            let email = JSON.parse(localStorage.getItem('user_details')).email;
            if( login.user.role === parseInt(3) && email){
                createNotification('success','Login successfully','');
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
    const regexTest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (email === "") {
      formIsValid = false;
      error["email"] = "*Please enter email.";
    }
    if (email && regexTest.test(email) === false) {
      formIsValid = false;
      error["email"] = "*Please enter a valid email address.";
    }
    if (password === "") {
      formIsValid = false;
      error["password"] = "*Please enter password.";
    }
    this.setState({ errors: error });
    return formIsValid;
  };
  handleOnChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  userCheckout = () => {
    const { email, password } = this.state;
    if (this.isLoginValid()) {
      this.props.userLogin({ email: email, password: password, role: 3 });
      this.setState({ loading: true });
    } else {
      createNotification(
        "info",
        "Please enter email and password to continue."
      );
    }
  };

  guestCheckout = () => {
    const { guest_email } = this.state;
    if(guest_email){
        this.props.history.push({
            pathname:"/shopping-cart",
            state: {
                email: guest_email,
                coupon: this.state.coupon
            }
        });
    }else{
        createNotification('info', 'Please enter a valid email address to checkout as a guest.');
    }
  };

  render() {
    const { email, password, guest_email, loading } = this.state;
    return (
      <ProductsLayout>
        <div className="banner_sec">
          <div className="container">
            <div className="col-12">
              <div className="steps_result">
                <div className="banner_txt d-flex">
                  <div className="banr_headng sc_ckout_head">
                    Secure <br />
                    Checkout
                  </div>
                  <div className="banr_image">
                    <img src="/images/fitness_PNG181.png" className="" />
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
                  <div
                    id="Shopping-Cart"
                    className="tab-pane fade in active scure_chkout_field_wrap"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="description-details all-details cart-details cart-address">
                          <div className="diet_item prod-con">
                            <div className="block">
                              <div className="heading-cart-row">
                                <div className="heading-cart-col cart-image">
                                  EXISTING CUSTOMER
                                </div>
                              </div>
                              <div className="heading-cart-row product-row-cart address-form-row">
                                {loading ? (
                                  <Loader />
                                ) : (
                                  <form>
                                    <div className="form-row">
                                      <div className="form-group col-md-12">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="email"
                                          name="email"
                                          value={email}
                                          placeholder="Email Address"
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
                                          placeholder="Password"
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
                                            Existing Customer
                                          </button>
                                          <i className="fa fa-long-arrow-right"></i>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                )}
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
                                <div className="heading-cart-col cart-image">
                                  New at mijneetschema
                                </div>
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
                                        <h3>
                                          Create an account after placing an
                                          order to take advantage of:
                                        </h3>
                                        <div className="gst_chk_list">
                                          <ul>
                                            <li>
                                              <i
                                                className="fa fa-check-square-o"
                                                aria-hidden="true"
                                              ></i>
                                              Checkout faster
                                            </li>
                                            <li>
                                              <i
                                                className="fa fa-check-square-o"
                                                aria-hidden="true"
                                              ></i>
                                              Easily reorder and track orders
                                            </li>
                                            <li>
                                              <i
                                                className="fa fa-check-square-o"
                                                aria-hidden="true"
                                              ></i>
                                              Easily store addresses
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
                                          checkout as a guest
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
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.Login,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      userLogin: Actions.loginRequest,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(SecureCheckout);
