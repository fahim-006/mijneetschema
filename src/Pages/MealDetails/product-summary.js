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
      orignal_price: props.price,
      new_price: props.price,
      customize_array: [],
      showIngredient: false,
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
      let newItem = JSON.parse(JSON.stringify(item));
      newItem.price = this.state.new_price;
      item = Object.assign(
        {
          quantity: this.state.quantity,
          product_type: "Meals",
          ingredientArr: this.state.customize_array,
        },
        newItem
      );
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
      this.props.addWish({ product_id: id, product_type: "Meals" });
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

  handleIngredientChange = (event, ingredientId, price) => {
    event.preventDefault();
    let customize_array_temp = this.state.customize_array;
    if (customize_array_temp.length > 0) {
      let item_index = customize_array_temp.findIndex(
        (i) => i === ingredientId
      );
      if (item_index == -1) {
        this.setState({
            new_price: this.state.new_price + parseInt(price),
            [event.target.id]: true,
            customize_array: this.state.customize_array.concat([ingredientId]),
          });
      } else {
        customize_array_temp.splice(item_index, 1);
        this.setState({
            new_price: this.state.new_price - parseInt(price),
            [event.target.id]: false,
            customize_array: customize_array_temp,
          });
      }
    } else {
      this.setState({
          new_price: this.state.new_price + parseInt(price),
          [event.target.id]: true,
          customize_array: this.state.customize_array.concat([ingredientId]),
        });
    }
  };

  render() {
    const { quantity } = this.state;
    return (
      <section className="diet_paln_items our-prod-main product-detail-main">
        <div className="container">
          <div className="row top-products all-products-sec">
            <div className="col-md-5 col-lg-5 col-sm-6">
              <div className="diet_item prod-con main-prod-img">
                <div className="prod-lower">
                  <div className="prod-img-con">
                    <a href="#">
                      <i className="fa fa-search-plus" />
                    </a>
                    <img
                      className="prod-img"
                      src={`${IMG_URL}${
                        this.props.meal_img && this.props.meal_img
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
                    {this.props.category_id && this.props.category_id.category}
                  </div>
                  <div className="prod-rating">
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

                    {/* <div className="star-rate">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-half-o" />
                        <i className="fa fa-star-o" />
                      </div> */}

                    <div className="num-rate">
                      {this.props.rating.toFixed(1)} sterren, aantal reviews{" "}
                      <a href="#">(13)</a>
                    </div>
                  </div>
                  <div className="prod-price">
                    € {this.state.new_price && this.state.new_price}
                  </div>
                  <p className="product-desp">
                    {this.props.description &&
                      this.props.description.slice(0, 100)}
                    ...
                  </p>
                  <div className="meal_customiz_wrap">
                    <div className="accordion" id="accordionExample">
                      <div className="card">
                        <div className="card-header" id="headingOne">
                          <h2 className="mb-0">
                            <button
                              className={`btn btn-link ${
                                this.state.showIngredient == false
                                  ? "collapsed"
                                  : ""
                              }`}
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                              onClick={() => {
                                this.setState({
                                  showIngredient: !this.state.showIngredient,
                                });
                              }}
                            >
                              Customize jouw maaltijd
                            </button>
                          </h2>
                        </div>
                        <div
                          id="collapseOne-rmv"
                          className={`collapse ${
                            this.state.showIngredient == true ? "show" : ""
                          }`}
                          aria-labelledby="headingOne"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <h3>Ingredienten toevoegen</h3>
                            <div className="check_multiple d-flex justify-content-between">
                              {this.props.ingredient.map(
                                (ingredient, index) => {
                                  return (
                                    <div className="select_item">
                                      <div className="inputGroup">
                                        <input
                                          id={`check${index + 1}`}
                                          name="check"
                                          type="checkbox"
                                          onClick={(e) =>
                                            this.handleIngredientChange(
                                              e,
                                              ingredient._id,
                                              this.props.ingredient_price[
                                                index
                                              ],
                                              index
                                            )
                                          }
                                        />
                                        <label
                                          className={`d-flex justify-content-between ${
                                            this.state[`check${index + 1}`]
                                          }`}
                                          htmlFor={`check${index + 1}`}
                                        >
                                          {ingredient.name}{" "}
                                          <span className="price">
                                            €{" "}
                                            {this.props.ingredient_price[index]}
                                          </span>
                                        </label>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                              {/* <div className="select_item">
                          <div className="inputGroup">
                            <input id="check1" name="check" type="checkbox" />
                            <label className="d-flex justify-content-between" htmlFor="check1">Broccoli <span className="price">€5</span></label>
                          </div>
                        </div>
                        <div className="select_item">
                          <div className="inputGroup">
                            <input id="check2" name="check" type="checkbox" />
                            <label className="d-flex justify-content-between" htmlFor="check2">Spinach <span className="price">€5</span></label>
                          </div>
                        </div>
                        <div className="select_item">
                          <div className="inputGroup">
                            <input id="check3" name="check" type="checkbox" />
                            <label className="d-flex justify-content-between" htmlFor="check3">Cucumber <span className="price">€5</span></label>
                          </div>
                        </div>
                        <div className="select_item">
                          <div className="inputGroup">
                            <input id="check4" name="check" type="checkbox" />
                            <label className="d-flex justify-content-between" htmlFor="check4">Onion <span className="price">€5</span></label>
                          </div>
                        </div>
                        <div className="select_item">
                          <div className="inputGroup">
                            <input id="check5" name="check" type="checkbox" />
                            <label className="d-flex justify-content-between" htmlFor="check5">Cabbage <span className="price">€5</span></label>
                          </div>
                        </div>
                        <div className="select_item">
                          <div className="inputGroup">
                            <input id="check6" name="check" type="checkbox" />
                            <label className="d-flex justify-content-between" htmlFor="check6">Tomato <span className="price">€5</span></label>
                          </div>
                        </div>
                       */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="prod-upper cart-options">
                  <div className="prod-ceta qty">
                    <span className="qty-details">
                      Aantal:
                      <span className="input-value">
                        <input
                          type="text"
                          defaultValue={1}
                          name="fname"
                          className="no-of-qty"
                          onChange={(e) =>
                            this.handleQuantityChange(e, this.props)
                          }
                        />
                      </span>
                    </span>
                    <span className="click_btn">
                      <button
                        type="button"
                        onClick={() => {
                          this.handleAddToCart();
                        }}
                      >
                        <i className="fa fa-shopping-cart" /> Voeg toe aan winkelwagen
                      </button>
                      <i className="fa fa-long-arrow-right" />
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
                  {/* 
                  <a 
                  href="#"
                  onClick={() => this.handleAddWish(this.props._id && this.props._id)}
                  >
                    <i className="fa fa-heart-o" /> Add to Wishlist
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
