import React, { Component } from "react";
import UserDashboardLayout from "../../layouts/UserDashboardLayout";
import ProductsLayout from "../../layouts/ProductsLayout";
import ShoppingBlock from "./shopping-block";
import CheckOutBlock from "./checkout-block";
import { createNotification } from "../../helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../Redux/Actions";
import Loader from "../../components/Loader/loader";
import { Link } from "react-router-dom";
const IMG_URL = process.env.REACT_APP_IMAGE_URL;

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartTab: 1,
      totalItems: "",
      totalPrice: "",
      cartProducts: [],
      coupon: "",
      isCuopanApplied: false,
      name: "",
      contact_no: "", // phone
      pincode: "",
      city: "",
      address: "",
      landmark: "",
      state: "",
      alternate_phone: "",
      email: "",
      total: "",
      product_description: "",
      amount_without_tax: "",
      amount_with_tax: "",
      payment_id: "",
      // password: '',
      errors: [],
      alternate_contact_no: "",
      userId: "",
      coupon_loading: false,
    };
  }

  componentDidMount() {
    if (
      localStorage.getItem("items_in_cart") &&
      localStorage.getItem("items_in_cart") !== undefined
    ) {
      let storageCart = JSON.parse(localStorage.getItem("items_in_cart"));
      this.setState(
        {
          cartProducts: storageCart,
        },
        () => {
          this.calculatePriceAndItems();
        }
      );
    }
    if (localStorage.getItem("user_details")) {
      let user_id = JSON.parse(localStorage.getItem("user_details"));
      this.setState({
        name: user_id.name,
        userId: user_id._id,
        email: user_id.email,
        contact_no: user_id.mobile_number,
      });
    }

    // handle email, if guest user try to checkout
    if (this.props.location && this.props.location.state) {
      this.setState(
        {
          email: this.props.location.state.email,
          cartTab: 2,
          coupon: this.props.location.state.coupon,
        },
        () => {
          this.props.applyCoupan({ coupon: this.state.coupon });
        }
      );
    }
  }

  handleCartTab = (tabNo) => {
    this.setState({
      cartTab: tabNo,
    });
  };

  handleCartUpdates = (updatedCart, message) => {
    this.setState(
      {
        cartProducts: updatedCart,
      },
      () => {
        const { cartProducts } = this.state;
        if (message.length) {
          createNotification("success", message);
        }
        this.calculatePriceAndItems();
        localStorage.setItem("items_in_cart", JSON.stringify(cartProducts));
        this.props.updateCartValue();
      }
    );
  };

  handleQuantityChange = (event, index) => {
    event.preventDefault();
    let stateCart = this.state.cartProducts;
    let currentItem = stateCart[index];
    currentItem.quantity =
      event.target.value === "NaN" ? 0 : parseInt(event.target.value);
    stateCart[index] = currentItem;
    this.handleCartUpdates(stateCart, "");
  };

  handleRemoveCartItem = (index) => {
    var stateCart = this.state.cartProducts;
    let newCart = stateCart.splice(index, 1);
    if (newCart.length !== stateCart) {
      this.handleCartUpdates(stateCart, "Item succesvol verwijderd uit winkelwagen");
    }
  };

  calculatePriceAndItems = () => {
    const { cartProducts } = this.state;
    let t_items = cartProducts.reduce(
      (count, item) => parseInt(count + item.quantity),
      0
    );
    let t_price = cartProducts.reduce(
      (price, item) => parseFloat(price + item.quantity * item.price),
      0.0
    );
    let with_tax = t_price + t_price * (21 / 100);
    this.setState({
      totalPrice: t_price,
      totalItems: t_items,
      amount_without_tax: t_price,
      amount_with_tax: with_tax,
    });
  };

  handleAddressChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCoupanCode = (e) => {
    this.setState({
      coupon: e.target.value,
    });
  };

  isAddressValid = () => {
    const {
      name,
      contact_no,
      pincode,
      city,
      address,
      landmark,
      state,
      userId,
      email,
    } = this.state;
    let error = {};
    let formIsValid = true;
    if (name === "") {
      formIsValid = false;
      error["name"] = "*Please enter your name.";
    }
    if (contact_no === "") {
      formIsValid = false;
      error["contact_no"] = "*Enter your contact number.";
    }
    if (pincode === "") {
      formIsValid = false;
      error["pincode"] = "*Enter your area PIN Code (Postal Code) number.";
    }
    if (city === "") {
      formIsValid = false;
      error["city"] = "*Enter your city name.";
    }
    if (address === "") {
      formIsValid = false;
      error["address"] = "*Enter the complete address.";
    }
    if (landmark === "") {
      formIsValid = false;
      error["landmark"] = "*Please enter a valid Landmark to reachout you.";
    }
    if (state === "") {
      formIsValid = false;
      error["state"] = "*Enter, In which state you are living.";
    }
    // if (userId === '' && password === '') {
    //     formIsValid = false;
    //     error['password'] = "*Enter your password and keep it safe, it will help you to login."
    // }
    if (userId === "" && email === "") {
      formIsValid = false;
      error["email"] =
        "*Enter email address (If you are already registered please login first).";
    }
    this.setState({ errors: error });
    return formIsValid;
  };

  handleDeliverProcess = () => {
    let user_details = JSON.parse(localStorage.getItem("user_details"));
    if (this.isAddressValid()) {
      let t_Items = [];
      let items = "";

      if (localStorage.getItem("items_in_cart") !== undefined) {
        items = JSON.parse(localStorage.getItem("items_in_cart"));
        t_Items = items.map((itm) => ({
          id: itm._id,
          product_type: itm.product_type,
          ingredientArr: itm.ingredientArr!=undefined?itm.ingredientArr:[],
        }));
      }
      const {
        userId,
        name,
        email,
        contact_no,
        address,
        city,
        pincode,
        landmark,
        state,
        alternate_phone,
        product_description,
        totalItems,
        totalPrice,
        amount_without_tax,
        amount_with_tax,
        coupon, // password,
      } = this.state;

      let requestBody = {
        name: name,
        user_id: userId,
        email: email,
        contact_no: contact_no,
        address: address,
        amount_without_tax: amount_without_tax, // amount_without_tax,
        amount_with_tax: amount_with_tax, // amount_with_tax,
        total: amount_without_tax,
        product_description: product_description, // We'll set it later
        products: t_Items,
        landmark: landmark,
        city: city,
        pincode: pincode,
        couponCode: coupon,
        state: state,
        alternate_phone: alternate_phone,
      };
      localStorage.setItem("prodPayDetails", JSON.stringify(requestBody));

      this.props.buyProduct({
        name: name,
        user_id: userId,
        email: email,
        contact_no: contact_no,
        address: address,
        total: amount_without_tax,
        product_description: "Product Purchase From Mijneet", // We'll set it later
        products: t_Items,
        couponCode: coupon,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.prod_payment_url !== this.props.prod_payment_url) {
      window.location = `${this.props.prod_payment_url}`;
    }
    if (this.props.buy_Prod_error_msg !== prevProps.buy_Prod_error_msg) {
      createNotification(
        "error",
        this.props.buy_Prod_error_msg + ". Please Login First"
      );
    }
    if (
      this.props.apply_success &&
      prevProps.apply_success !== this.props.apply_success
    ) {
      this.handleCouponDiscount();
      createNotification("success", "Coupon applied successfully.");
    }
    if (
      this.props.apply_error &&
      prevProps.apply_err_msg !== this.props.apply_err_msg
    ) {
      createNotification("error", this.props.apply_err_msg);
      this.setState({ coupon_loading: false });
    }
  }

  handleCouponDiscount = () => {
    const { totalPrice } = this.state;
    let discount = parseInt(this.props.discount) / 100;
    let vat_perc = 0.21;
    let ttl_price = totalPrice;
    let price_with_coupan =
      ttl_price - parseFloat(ttl_price * discount).toFixed(2);
    let with_tax = price_with_coupan + ttl_price * vat_perc;
    this.setState({
      amount_without_tax: price_with_coupan,
      amount_with_tax: with_tax.toFixed(2),
      isCuopanApplied: true,
      coupon_loading: false,
    });
  };

  applyCoupan = () => {
    const { coupon } = this.state;
    if (coupon) {
      this.props.applyCoupan({ coupon: coupon });
      this.setState({ coupon_loading: true });
    }
  };

  handleCheckout = (e) => {
    let user_details = JSON.parse(localStorage.getItem("user_details"));
    if (user_details) {
      this.setState({
        cartTab: 2,
      });
    } else if (this.state.totalItems === "") {
      createNotification(
        "info",
        "Your cart is empty. Please add items into cart to checkout."
      );
    } else {
      // window.location="/secure-checkout";
      this.props.history.push({
        pathname: "/secure-checkout",
        state: {
          coupon: this.state.coupon,
        },
      });
    }
  };
  render() {
    const {
      cartTab,
      cartProducts,
      totalItems,
      totalPrice,
      coupon,
      amount_with_tax,
      amount_without_tax,
      isCuopanApplied,
      coupon_loading,
    } = this.state;
    return (
      <ProductsLayout>
        <div className="banner_sec">
          <div className="container">
            <div className="col-12">
              <div className="steps_result">
                <div className="banner_txt d-flex">
                  <div className="banr_headng">
                    Jouw <br />
                    winkelwagen
                  </div>
                  <div className="banr_image">
                    <img src="/images/fitness_PNG181.png" className="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ************************************** */}

        {/* MAIN PAGE CONTENT AREA STARTS */}
        <div className="content-area homepage-content-main">
          {/* SHOPPING CART SECTION STARTS */}
          <section className="diet_paln_items our-prod-main all-products-sec complete-prod-dtl place-order-sec">
            <div className="container">
              <div className="row all-products-titles place-order-titles">
                <div className="col-md-12">
                  <ul className="nav nav-tabs">
                    <li>
                      <button
                        className="active"
                        onClick={(e) => this.handleCartTab(1)}
                      >
                        <i className="fa fa-check-circle"></i> Winkelwagen
                      </button>
                    </li>
                    <li>
                      <button onClick={(e) => this.handleCartTab(2)}>
                        <i className="fa fa-check-circle"></i> Afrekenen
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row tab-content-row place-order-row">
                <div className="tab-content">
                  <div id="Shopping-Cart" className="tab-pane fade in active">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="description-details all-details cart-details">
                          <div className="diet_item prod-con ">
                            {/* {cartTab === parseInt(1) ?
                                                            <ShoppingBlock/>
                                                            :
                                                            <CheckOutBlock/>
                                                        } */}
                            {cartTab === parseInt(1) ? (
                              <div className="block cart_table_wrapper">
                                <div className="heading-cart-row">
                                  <div className="heading-cart-col cart-image">
                                    product
                                  </div>
                                  <div className="heading-cart-col cart-name">
                                    Naam
                                  </div>
                                  <div className="heading-cart-col cart-price">
                                    prijs
                                  </div>
                                  <div className="heading-cart-col cart-qut">
                                    aantal
                                  </div>
                                  <div className="heading-cart-col cart-select">
                                    status
                                  </div>
                                </div>
                                {cartProducts && cartProducts.length ? (
                                  cartProducts.map((item, index) => (
                                    <div key={index}>
                                      <ShoppingBlock
                                        item={item}
                                        index={index}
                                        handleQuantityChange={
                                          this.handleQuantityChange
                                        }
                                        handleRemoveCartItem={
                                          this.handleRemoveCartItem
                                        }
                                      />
                                    </div>
                                  ))
                                ) : (
                                  <div className="heading-cart-row product-row-cart">
                                    <div style={{ alignItems: "center" }}>
                                      <p>Jouw winkelwagen is leeg</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <CheckOutBlock
                                {...this.state}
                                handleAddressChange={this.handleAddressChange}
                                handleDeliverProcess={this.handleDeliverProcess}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="description-details all-details cart-prod-details">
                          <div className="diet_item prod-con">
                            <div className="block">
                              <div className="heading-cart-row">
                                <div className="heading-cart-col price-details-heading">
                                  prijs details
                                </div>
                                <div className="heading-cart-col price-details-text">
                                  Prijs ({totalItems} items)
                                  <span className="price-cart">
                                    € {totalPrice}
                                  </span>
                                </div>
                                <div className="heading-cart-col price-details-text">
                                  Delivery Fee
                                  <span className="price-cart">€ 0</span>
                                </div>
                                <div className="heading-cart-col price-details-text">
                                  Producten 21% BTW 
                                  {/* <span className="price-cart">€ {parseFloat(totalPrice*(21/100)).toFixed(2)}</span> */}
                                </div>
                                <div className="heading-cart-col price-details-text">
                                  Maaltijden 9% BTW{" "}
                                </div>
                                {isCuopanApplied ? (
                                  <div className="heading-cart-col price-details-text">
                                    Coupon korting
                                    <span className="price-cart">
                                      - €{" "}
                                      {parseFloat(
                                        totalPrice *
                                          (parseInt(this.props.discount) / 100)
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                ) : null}
                                <div className="heading-cart-col final-price">
                                  Totaal
                                  <span className="price-cart">
                                    € {amount_without_tax}
                                  </span>
                                  {/* <span className="price-cart">€ {amount_with_tax}</span> */}
                                </div>

                                {totalItems && totalItems > 0 ? (
                                  <div className="heading-cart-col coupon-code-op">
                                    <i className="fa fa-tag"></i> Coupon Code
                                    <div className="heading-cart-col coupon-code-op-inner">
                                      <input
                                        type="text"
                                        value={coupon}
                                        name="coupon-code"
                                        className="no-of-qty"
                                        onChange={this.handleCoupanCode}
                                        placeholder="enter coupon code here..."
                                      />
                                    </div>
                                    {coupon && coupon.length >= 2 ? (
                                      <div className="click_btn">
                                        <button
                                          type="button"
                                          onClick={this.applyCoupan}
                                        >
                                          {coupon_loading ? (
                                            <Loader smaller={"small"} />
                                          ) : isCuopanApplied ? (
                                            "Try Another One"
                                          ) : (
                                            "Apply Coupan"
                                          )}
                                        </button>
                                        <i className="fa fa-long-arrow-right"></i>
                                      </div>
                                    ) : null}
                                  </div>
                                ) : null}

                                {/** Will do coupan part latar */}

                                {/* <div className="click_btn">
                                                                    <Link to="/secure-checkout">
                                                                        Proceed to checkout
                                                                    </Link>
                                                                    <i className="fa fa-long-arrow-right"></i>
                                                                </div> */}
                                <div className="click_btn">
                                  <button
                                    type="button"
                                    onClick={this.handleCheckout}
                                  >
                                    Doorgaan naar afrekenen {/* Place Order */}
                                  </button>
                                  <i className="fa fa-long-arrow-right"></i>
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
            </div>
          </section>
          {/* SHOPPING CART SECTION ENDS */}
        </div>
      </ProductsLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  buy_Prod_success: state.Products,
  buy_Prod_err: state.Products,
  buy_Prod_details: state.Products.buy_Prod_details,
  prod_payment_url: state.Products.prod_payment_url,
  apply_success: state.Coupan.apply_success,
  apply_err_msg: state.Coupan.apply_err_msg,
  apply_error: state.Coupan.apply_error,
  discount: state.Coupan.discount,
  buy_Prod_error_msg: state.Products.buy_Prod_error_msg,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      buyProduct: Actions.buyProduct,
      applyCoupan: Actions.applyCoupan,
      updateCartValue: Actions.updateCartValue,
    },
    dispatch
  );
export default connect(mapStateToProps, mapActionsToProps)(CartPage);
