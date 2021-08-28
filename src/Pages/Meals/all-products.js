import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductCard from "../../components/ProductsCard";
import MealCard from "../../components/MealsCard";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../Redux/Actions";
import { createNotification } from "../../helpers";
import Loader from "../../components/Loader/loader";
import Pagination from "react-js-pagination";

const IMG_URL = process.env.REACT_APP_IMAGE_URL;

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_no: "1",
      orderby: "none",
      category: "none",
      limit: 5,
      loader: true,
      activePage: 1,
      c_tab: "all",
      cat_id: "",
      cart_Array: [],
    };
  }

  componentDidMount() {
    const { page_no, orderby, limit } = this.state;
    // this.props.getAllProducts({ page_no, orderby });
    this.props.getAllMeals({ page_no, orderby });
    this.props.listCategoriesByLimit({ limit });

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
      prevProps.all_meals !== this.props.all_meals &&
      this.props.get_success
    ) {
      this.setState({ loader: false });
    }
    if (
      this.props.get_cat_prod_success &&
      this.props.all_meals.length === parseInt(0)
    ) {
      createNotification("success", "Geen producten gevonden in deze categorie.");
    }

    if (
      this.props.add_wish_error &&
      prevProps.add_wish_error !== this.props.add_wish_error
    ) {
      createNotification("error", this.props.message);
    }
  }

  handleProdByCat = (cat_id) => {
    this.setState({ c_tab: "cat",category:cat_id, loader: true });
    this.setState({activePage:1},()=>{
      const { activePage, orderby } = this.state;
      this.props.getProductsByCategory({
        page_no: activePage,
        orderby,
        category: cat_id,
      });
    })
  };

  getAllProducts = () => {
    this.setState({ c_tab: "all", loader: true });
    const { page_no, orderby } = this.state;
    this.props.getAllMeals({ page_no, orderby });
  };

  handleProdByCatPage = (pageNumber) => {
    this.setState({ c_tab: "cat", loader: true });
    const { orderby, category } = this.state;
    this.props.getProductsByCategory({
      page_no: pageNumber,
      orderby,
      category: category,
    });
  };

  getAllProductsPage = (pageNumber) => {
    this.setState({ c_tab: "all", loader: true });
    const { orderby } = this.state;
    this.props.getAllMeals({ page_no: pageNumber, orderby });
  };

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber, loader: true }, function () {
      this.state.c_tab === "all"
        ? this.getAllProductsPage(pageNumber)
        : this.handleProdByCatPage(pageNumber);
    });
  }

  handleSortChange = (e) => {
    this.setState({
        orderby: e.target.value,
        loader: true,
      },() => {
        const { page_no, orderby } = this.state;
        this.props.getAllMeals({ page_no, orderby });
      }
    );
  };

  // Functionality to add item in cart
  handleAddToCart = (e) => {
    let isExist =
      this.state.cart_Array &&
      this.state.cart_Array.findIndex((prod) => prod._id === e._id);

    if (isExist === parseInt(-1)) {
      let stateCart = this.state.cart_Array && this.state.cart_Array;
      e = Object.assign({ quantity: 1, product_type: "Meals" }, e);
      stateCart.push(e);
      this.setState(
        {
          cart_Array: stateCart,
        },
        () => {
          createNotification(
            "success",
            `Product ${e.name} is succesvol toegevoegd.`
          );
          localStorage.setItem(
            "items_in_cart",
            JSON.stringify(this.state.cart_Array)
          );
          this.props.updateCartValue();
        }
      );
    } else {
      createNotification("info", "Dit item is al toegevoed aan jouw winkelwagen");
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
        "Om toe te voegen aan jouw wensenlijst moet je eerst inloggen !!"
      );
    }
  };

  render() {
    const { orderby, loader } = this.state;
    return (
      <div>
        {/* <!-- ALL PRODUCTS SECTION STARTS --> */}
        <section className="diet_paln_items our-prod-main all-products-sec">
          <div className="container">

          <div className="row all-products-titles">
              <div className="col-md-12">
                <ul className="nav nav-tabs">
                  <li onClick={()=>this.getAllProducts()}>
                    <a data-toggle="tab" href="#menu3" className="active">
                      Alle maaltijden
                    </a>
                  </li>

                  {/* <li><a className="active" data-toggle="tab" href="#home">category 1</a></li> */}
                  {this.props.prod_cat_list && this.props.prod_cat_list ? (
                    this.props.prod_cat_list.map((listItem) => (
                      <li
                        key={listItem._id}
                        onClick={(e) => this.handleProdByCat(listItem._id)}
                      >
                        <a data-toggle="tab" href="#menu1">
                          {listItem.category}
                        </a>
                      </li>
                    ))
                  ) : (
                    <></>
                  )}
                  {/* <li><a data-toggle="tab" href="#menu2">category 3</a></li>
                                    <li><a data-toggle="tab" href="#menu3">category 4</a></li>
                                    <li><a data-toggle="tab" href="#menu4">category 5</a></li> */}
                </ul>
              </div>
            </div>
           

            <div className="row all-products-row sorting-product">
              <div className="col-md-6">
                <div className="sorting-left"></div>
              </div>
              <div className="col-md-6">
                <div className="custom-select" style={{ width: "200px" }}>
                  {/* <label>
                                        Select sort by: */}
                  <div className="select-selected">
                    <select value={orderby} onChange={this.handleSortChange}>
                      <option value="none">Default sorting</option>
                      <option value="name_asc">Naam A tot Z</option>
                      <option value="name_desc">Naam Z tot A</option>
                      <option value="price_asc">Prijs laag naar hoog</option>
                      <option value="price_desc">Prijs hoog naar laag</option>
                      {/* <option value="3">By cetagory</option> */}
                    </select>
                  </div>
                  {/* </label> */}
                </div>
              </div>
            </div>
            <div className="row tab-content-row">
              <div className="tab-content">
                <div id="home" className="tab-pane fade in active">
                  <div className="row">
                    {loader ? (
                      <Loader />
                    ) : this.props.all_meals ? (
                      this.props.all_meals.map((product) => {
                        return (
                          <div
                            className="col-md-6 col-lg-4 col-sm-6"
                            key={product._id}
                          >
                            <div className="diet_item prod-con">
                              <div key={product._id}>
                                <MealCard
                                  {...product}
                                  handleAddToCart={this.handleAddToCart}
                                  handleAddWish={this.handleAddWish}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row pagination-row">
              <div className="col-md-12">
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={6}
                  totalItemsCount={this.props.count ? this.props.count : 0}
                  pageRangeDisplayed={4}
                  firstPageText="<< first"
                  lastPageText="last >>"
                  prevPageText="< prev"
                  nextPageText="next >"
                  itemClassFirst="pag-nav first"
                  itemClassPrev="pag-nav"
                  itemClassNext="pag-nav"
                  itemClassLast="pag-nav last"
                  onChange={this.handlePageChange.bind(this)}
                />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- ALL PRODUCTS SECTION ENDS --> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  //----*meal------
  all_meals: state.Products.all_meals,
  //----*meal------

  all_products: state.Products.all_products,
  count: state.Products.count,
  get_success: state.Products.get_success,
  get_error: state.Products.get_error,
  get_error_msg: state.Products.get_error_msg,
  prod_cat_list: state.Products.categories,
  cat_success: state.Products.success,
  // cat_products: state.Products.cat_products,
  get_cat_prod_err: state.Products.get_cat_prod_err,
  get_cat_prod_success: state.Products.get_cat_prod_success,
  add_wish_success: state.Products.add_wish_success,
  message: state.Products.message,
  add_wish_error: state.Products.add_wish_error,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllMeals: Actions.getAllMeals,
      // getAllProducts: Actions.getAllProducts,
      listCategoriesByLimit: Actions.listMealCategoryRequest,
      getProductsByCategory: Actions.getCatMeal,
      // getMealsByCategory: Actions.getCatMeal,
      addWish: Actions.addWishRequest,
      updateCartValue: Actions.updateCartValue,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(AllProducts);
