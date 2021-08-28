import React, { Component } from "react";
import ProductsLayout from "../../layouts/ProductsLayout";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductSummary from "./product-summary";
import CompleteDetail from "./complete-detail";
import { connect } from "react-redux";
import { Actions } from "../../Redux/Actions";
import { bindActionCreators } from "redux";
import { createNotification } from "../../helpers";
import { Redirect } from "react-router";
import Loader from "../../components/Loader/loader";
// import ProductCard from "../../components/ProductsCard";
import ProductCard from "../../components/MealsCard";

const IMG_URL = process.env.REACT_APP_IMAGE_URL;

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      like_products: [],
      like_card: "",
      cart_Array: [],
    };
  }

  componentDidMount() {
    window.scrollTo({ top: 0 });
    if (this.props.match.params.id !== "") {
      this.props.listSingleProduct({ product_id: this.props.match.params.id });
    } else {
      Redirect("/");
    }

    // Fetch Items from local storage and add into state cart named cart_Array
    if (
      localStorage.getItem("items_in_cart") &&
      localStorage.getItem("items_in_cart") !== undefined
    ) {
      let storageCart = JSON.parse(localStorage.getItem("items_in_cart"));
      this.setState({
        cart_Array: storageCart,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.single_product !== this.props.single_product &&
      this.props.get_success
    ) {
      this.setState(
        { like_products: this.props.like_products, loader: false },
        function () {
          this.likeProduct();
        }
      );
    }
    if (this.props.get_error) {
      createNotification("error", "Something went wrong");
    }

    if (
      this.props.add_wish_success &&
      prevProps.add_wish_success !== this.props.add_wish_success
    ) {
      createNotification("info", this.props.message);
    }
    if (
      this.props.add_wish_error &&
      prevProps.add_wish_error !== this.props.add_wish_error
    ) {
      createNotification("error", this.props.message);
    }
  }

  likeProduct = async () => {
      if(this.state.like_products!=""){
          let v = await this.state.like_products.map((product) => (
            <div className="wow fadeInUp item" key={product._id}>
              <div className="team_membar carousel_team_blk">
                <div className="diet_item prod-con">
                  <ProductCard
                    {...product}
                    handleAddWish={this.handleAddWish}
                    handleAddToCart={this.handleAddToCart}
                  />
                </div>
              </div>
            </div>
          ));
        this.setState({ like_card: v });
      }
  };

  // Functionality to add item in cart
  handleAddToCart = (e) => {
    let isExist =
      this.state.cart_Array &&
      this.state.cart_Array.findIndex((prod) => prod._id === e._id);

    if (isExist === parseInt(-1)) {
      let stateCart = this.state.cart_Array && this.state.cart_Array;
      e = Object.assign({ quantity: 1, product_type: 'Meals' }, e);
      stateCart.push(e);
      this.setState(
        {
          cart_Array: stateCart,
        },
        () => {
          createNotification(
            "success",
            `Product ${e.name} is added in cart successfully.`
          );
          localStorage.setItem(
            "items_in_cart",
            JSON.stringify(this.state.cart_Array)
          );
        }
      );
    } else {
      createNotification("info", "This item is already added in cart.");
    }
  };

  handleAddWish = (e) => {
    if (
      localStorage.getItem("user_role") &&
      localStorage.getItem("user_role") !== "undefined" &&
      localStorage.getItem("user_role") === "3"
    ) {
      this.props.addWish({ product_id: e._id });
    } else {
      createNotification(
        "info",
        "To add in wishlist you have to login first !!"
      );
    }
  };

  render() {
    const { loader, like_card } = this.state;
    return (
      <ProductsLayout>
        {/**
         * BANNER SECTION
         **/}
        <div className="banner_sec">
          <div className="container">
            <div className="col-12">
              <div className="steps_result">
                <div className="banner_txt d-flex">
                  <div className="banr_headng">
                    Meal <br />
                    detail
                  </div>
                  <div className="banr_image">
                    <img src="/images/fitness_PNG181.png" className="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/**
         * BANNER SECTION END
         **/}

        <div className="content-area homepage-content-main">
          {/* *********************************************** */}

          {/**
           *
           *    PRODUCT DETAIL SECTION STARTS
           *
           **/}
          {loader ? (
            <Loader />
          ) : (
            this.props.single_product && (
              <ProductSummary {...this.props.single_product} />
            )
          )}
          {/**
           *
           *    PRODUCT DETAIL SECTION ENDS
           *
           **/}

          {/* *********************************************** */}

          {/**
           *
           *    COMPLETE DETAILS SECTION STARTS
           *
           * */}
          {this.props.single_product && (
            <CompleteDetail {...this.props.single_product} />
          )}

          {/**
           *
           *    COMPLETE DETAILS SECTION ENDS
           *
           **/}

          {/* *********************************************** */}

          {/* FEATURED PRODUCTS STARTS */}
          <section className="diet_paln_items our-prod-main all-products-sec feartured-prod-sec">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2 className="sec-heading text-center">
                    Waarschijnlijk vind je <span className="black-txt">dit ook leuk</span>
                  </h2>
                </div>
              </div>
              <div className="row all-products-titles">
                {like_card !== "" && (
                  <OwlCarousel
                    className="owl-theme"
                    loop={false}
                    items={3}
                    dots={true}
                    margin={25}
                  >
                    {like_card}
                  </OwlCarousel>
                )}
              </div>
            </div>
          </section>
       
        </div>
      </ProductsLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  single_product: state.Products.single_product,
  like_products: state.Products.like_products,
  get_success: state.Products.single_product_success,
  add_wish_success: state.Products.add_wish_success,
  message: state.Products.message,
  add_wish_error: state.Products.add_wish_error,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      listSingleProduct: Actions.listSingleMealRequest,
      addWish: Actions.addWishRequest,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(ProductDetail);
