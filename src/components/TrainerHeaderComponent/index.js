import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import history from "../../history";
import { NotificationContainer } from "react-notifications";
import { createNotification } from "../../helpers";

import HomeCalculator from "../HomePage";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../Redux/Actions";

class HeaderComponent extends Component {
  constructor() {
    super();
    this.state = {
      role: "",
      showDrop: false,
      open: false,
      showNotifications: false,
    };
  }

  toggleDropDown = () => {
    if (this.state.showDrop === true) {
      this.setState({ showDrop: false });
    } else {
      this.setState({ showDrop: true });
    }
  };

  componentDidMount() {
    const storage = localStorage.getItem("user_details");
    if (storage && storage !== "undefined") {
      const user = JSON.parse(storage);
      this.setState({
        role: user.role,
      });
      this.props.getNumOfCartItems();
    }
  }

  handleLogout = () => {
    let store = ["user_role", "user_details"];
    store.forEach((item) => localStorage.removeItem(item));
    createNotification("success", "You logged out successfully");
    window.location.href = "/";
    //history.push("/");
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  toggleNotifications = () => {
    this.setState({
      showNotifications: !this.state.showNotifications
    });
  }
  
  render() {
    const { role, open, showNotifications } = this.state;
    const { items_in_cart } = this.props;
    return (
      <div>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          className="modal_pop"
        >
          <HomeCalculator />
        </Modal>
        <header>
          {/**header start */}
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="navbar navbar-expand-lg">
                  <div className="logo_wrap">
                    <Link className="navbar-brand" to="/">
                      <img
                        src="/images/logo_header.png"
                        className="img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>

                  <div className="menu_wrap ml-auto">
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon">
                        <i className="fa fa-bars" aria-hidden="true"></i>
                      </span>
                    </button>
                    <div className="topbar d-flex">
                      <div className="phone_info">
                        <a href="#">
                          <img
                            src="/images/head_call.png"
                            className="img-fluid"
                            alt=""
                          />{" "}
                          +31 10 846 02 41{" "}
                        </a>
                      </div>
                      <div className="mail_info">
                        <a href="#">
                          <img
                            src="/images/head_mail.png"
                            className="img-fluid"
                            alt=""
                          />{" "}
                          info@mijneetschema.nl
                        </a>
                      </div>
                      <div className="social_icon d-flex align-items-center">
                        <a href="#">
                          <img
                            src="/images/social_1.png"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <a href="#">
                          <img
                            src="/images/social_2.png"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <a href="#">
                          <img
                            src="/images/social_3.png"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <a href="#">
                          <img
                            src="/images/social_4.png"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <a href="#">
                          <img
                            src="/images/social_5.png"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>

                    <div
                      className="collapse navbar-collapse"
                      id="navbarSupportedContent"
                    >
                      <ul className="navbar-nav ">
                        <li className="nav-item menu_icons d-flex align-items-center">
                          <Link className="nav-link no-deco" to="/shopping-cart">
                            <img src="/images/cart.png" className="img-fluid" />
                            {items_in_cart ? (
                              <span className="cart_badge">
                                {items_in_cart}
                              </span>
                            ) : (
                              <></>
                            )}
                          </Link>
                          
                          
                          <div className="dropdown show">
                            <button
                              className="btn btn-secondary"
                              type="button"
                              onClick={this.toggleDropDown}
                            >
                              <img src="/images/user.png" className="img-fluid"/>
                            </button>
                            {this.state.showDrop ? (
                              <div className="dropdown-menu">
                                {role ? (
                                  <>
                                    <Link to="/trainer-dashboard" className="nav-link" > Mijn Dashboard </Link>
                                    <div className="nav-link" onClick={this.handleLogout}>
                                      <Link className="nav-link" to="#"> Uitloggen </Link>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <Link className="nav-link" to="/trainer-login"> Trainer </Link>
                                    <Link className="nav-link" to="/user-login"> Gebruiker </Link>
                                  </>
                                )}
                              </div>
                            ) : null}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <NotificationContainer />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items_in_cart: state.Loader.itemsInCart,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getNumOfCartItems: Actions.updateCartValue,
    },
    dispatch
  );
export default connect(mapStateToProps, mapActionsToProps)(HeaderComponent);
