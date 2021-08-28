import React, { Component } from "react";
import { createNotification } from "../../helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../Redux/Actions";
import ReactStars from "react-rating-stars-component";

const IMG_URL = process.env.REACT_APP_IMAGE_URL;

class ProductSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart_Array: [],
      quantity: 1,
    };
  }

  componentDidMount() {
    // Fetch Items from local storage and add into state cart named cart_Array
    if (
      localStorage.getItem("items_in_cart") &&
      localStorage.getItem("items_in_cart") !== undefined
    ) {
      let storageCart = JSON.parse(localStorage.getItem("items_in_cart"));
      let item_index = storageCart.findIndex((i) => i._id === this.props._id);
      let count = item_index === -1 ? 1 : storageCart[item_index].quantity;
      this.setState({
        cart_Array: storageCart,
        quantity: count,
      });
    }
  }

  // Functionality to add item in cart
  handleAddToCart = () => {
    let item = this.props;
    let isExist =
      this.state.cart_Array &&
      this.state.cart_Array.findIndex((prod) => prod._id === item._id);

    if (isExist === parseInt(-1)) {
      let stateCart = this.state.cart_Array && this.state.cart_Array;
      item = Object.assign({ quantity: this.state.quantity, product_type: 'Products' }, item);
      stateCart.push(item);
      this.setState(
        {
          cart_Array: stateCart,
        },
        () => {
          createNotification(
            "success",
            `Product ${item.name} is added in cart successfully.`
          );
          localStorage.setItem(
            "items_in_cart",
            JSON.stringify(this.state.cart_Array)
          );
          this.props.updateCartValue();
        }
      );
    } else {
      createNotification("info", "This item is already added in cart.");
    }
  };

  handleAddWish = (id) => {
    if (
      localStorage.getItem("user_role") &&
      localStorage.getItem("user_role") !== "undefined" &&
      localStorage.getItem("user_role") === "3"
    ) {
      this.props.addWish({ product_id: id, product_type: "Products"});
    } else {
      createNotification(
        "info",
        "To add in wishlist you have to login first !!"
      );
    }
  };

  handleCartUpdates = (updatedCart, message) => {
    this.setState(
      {
        cart_Array: updatedCart,
      },
      () => {
        const { cart_Array } = this.state;
        if (message.length) {
          createNotification("success", message);
        }
        // this.calculatePriceAndItems();
        localStorage.setItem("items_in_cart", JSON.stringify(cart_Array));
        this.props.updateCartValue();
      }
    );
  };

  handleQuantityChange = (event, item) => {
    event.preventDefault();
    let stateCart = this.state.cart_Array;
    // let item_ind = stateCart.map(e => {if(e._id === item._id){e.indexOf(item._id)}});
    let item_index = stateCart.findIndex((i) => i._id === item._id);
    let quant = event.target.value === "NaN" ? 0 : parseInt(event.target.value);
    if (item_index >= 0) {
      this.setState(
        {
          quantity: quant,
        },
        () => {
          let currentItem = stateCart[item_index];
          currentItem.quantity = quant;
          stateCart[item_index] = currentItem;
          this.handleCartUpdates(stateCart, "");
        }
      );
    } else {
      this.setState({
        quantity: quant,
      });
    }
  };

  render() {
    const { quantity } = this.state;
    return (
      <div>
        <section className="diet_paln_items our-prod-main product-detail-main">
          <div className="container">
            <div className="row top-products all-products-sec">
              <div className="col-md-5 col-lg-5 col-sm-6">
                <div className="diet_item prod-con main-prod-img">
                  <div className="prod-lower">
                    <div className="prod-img-con">
                      <img
                        className="prod-img"
                        src={`${IMG_URL}${
                          this.props.product_img && this.props.product_img
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-lg-7 col-sm-6">
                <div className="diet_item prod-con main-prod-details">
                  <div className="prod-upper">
                    <div className="prod-title">
                      {this.props.name && this.props.name}
                    </div>
                    <div className="prod-ceta">
                      {this.props.category_id.category &&
                        this.props.category_id.category}
                    </div>
                    <div className="prod-rating">
                      <div className="star-rate">
                        <ReactStars
                          count={5}
                          // onChange={this.ratingChanged}
                          size={20}
                          isHalf={true}
                          emptyIcon={<i className="fa fa-star-o"></i>}
                          halfIcon={<i className="fa fa-star-half-o"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#181818"
                          value={this.props.rating}
                          edit={false}
                        />
                        {/* <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <i className="fa fa-star-o"></i> */}
                      </div>
                      <div className="num-rate">
                        {this.props.rating.toFixed(1)} sterren, aantal reviews{" "}
                        <a href="#">(17)</a>
                      </div>
                    </div>
                    <div className="prod-price">
                      € {this.props.price && this.props.price}
                    </div>
                    <p className="product-desp">
                      {this.props.description && this.props.description}
                    </p>
                  </div>
                  <div className="prod-upper cart-options">
                    <div className="prod-ceta qty">
                      <span className="qty-details">
                        Qty:
                        <span className="input-value">
                          <input
                            type="number"
                            value={quantity}
                            name="fname"
                            className="no-of-qty"
                            placeholder="count"
                            onChange={(e) =>
                              this.handleQuantityChange(e, this.props)
                            }
                          />
                        </span>
                      </span>
                      <span className="click_btn">
                        <button type="button" onClick={this.handleAddToCart}>
                          <i className="fa fa-shopping-cart"></i> Voeg toe aan winkelwagen
                        </button>
                        <i className="fa fa-long-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                  <div className="in-stock-prod">Op voorraad</div>
                  <div className="add-wish-prod">
                    <button
                      onClick={() =>
                        this.handleAddWish(this.props._id && this.props._id)
                      }
                    >
                      <i className="fa fa-heart-o"></i> Voeg toe aan Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  add_wish_success: state.Products.add_wish_success,
  message: state.Products.message,
  add_wish_error: state.Products.add_wish_error,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      addWish: Actions.addWishRequest,
      updateCartValue: Actions.updateCartValue,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(ProductSummary);
