import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProductCard from '../../components/ProductsCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../Redux/Actions';
import { createNotification } from '../../helpers';
import { Redirect } from 'react-router';
import Loader from '../../components/Loader/loader';
import Pagination from "react-js-pagination";

class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page_no: '1',
            orderby: 'none',
            category: 'none',
            limit:5,
            cat_id:0,
            loader:true,
            products:[],
            activePage: 1,
            cat_id:'',
            cart_Array: [],
        }
    }

    componentDidMount() {
        if (this.props.match.params.id !== '') {
            this.setState({ cat_id: this.props.match.params.id })
            const { page_no, orderby } = this.state;
            this.props.getProductsByCategory({ page_no, orderby, category: this.props.match.params.id });
        } else {
            Redirect('/');
        }

        // Fetch Items from local storage and add into state cart named cart_Array
        if (
            localStorage.getItem('items_in_cart') &&
            localStorage.getItem('items_in_cart') !== undefined
        ) {
            let storageCart = JSON.parse(localStorage.getItem('items_in_cart'));
            this.setState({
                cart_Array: storageCart
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.all_products !== this.props.all_products
            && this.props.get_cat_prod_success
        ) {
            this.setState({ loader: false })
        }
        if (this.props.get_cat_prod_success &&
            this.props.all_products.length === parseInt(0)
        ) {
            createNotification('success', 'No product found in this category.');
            this.setState({ loader: false })
        }

        if (this.props.add_wish_success && (prevProps.add_wish_success !== this.props.add_wish_success)) {
            createNotification('info', this.props.message);
        }
        if (this.props.add_wish_error && (prevProps.add_wish_error !== this.props.add_wish_error)) {
            createNotification('error', this.props.message);
        }
    }

    
    getAllProductsPage = (pageNumber) => {
        const { orderby, cat_id } = this.state;
        this.props.getProductsByCategory({ page_no: pageNumber, orderby, category: cat_id });
        this.setState({ loader: true })
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber }, function () {
            this.getAllProductsPage(pageNumber)
        });
    }


    // Functionality to add item in cart
    handleAddToCart = (e) => {
        let isExist = this.state.cart_Array && this.state.cart_Array.findIndex(prod => prod._id === e._id);

        if (isExist === parseInt(-1)) {
            let stateCart = this.state.cart_Array && this.state.cart_Array;
            e = Object.assign({ 'quantity': 1, product_type: "Products" }, e)
            stateCart.push(e);
            this.setState({
                cart_Array: stateCart
            }, () => {
                createNotification('success', `Product ${e.name} is added in cart successfully.`);
                localStorage.setItem('items_in_cart', JSON.stringify(this.state.cart_Array));
            });
        } else {
            createNotification('info', 'This item is already added in cart.');
        }
    }

    handleAddWish = (e) => {
        if(localStorage.getItem("user_role") && localStorage.getItem("user_role") !== "undefined" && localStorage.getItem("user_role") ==='3')
        {
            
            this.props.addWish({ product_id:e._id });
        }else{
            createNotification('info', 'To add in wishlist you have to login first !!');
        }

     }

    render() {
        const { loader, products } = this.state;
        return (
            <div>
                {/* <!-- ALL PRODUCTS SECTION STARTS --> */}
                <section className="diet_paln_items our-prod-main all-products-sec">
                    <div className="red-rectangle grey-bg"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="sec-heading text-center">all
                                    <span className="black-txt">products</span>
                                </h2>
                            </div>
                        </div>
                        
                      {loader? <Loader /> :
                        <div className="row tab-content-row">
                            <div className="tab-content">
                                <div id="home" className="tab-pane fade in active">
                                    <div className="row">

                                        {this.props.all_products
                                            ?
                                            this.props.all_products.map((product) => {
                                                return (
                                                    <div className="col-md-6 col-lg-4 col-sm-6" key={product._id}>
                                                        <div className="diet_item prod-con">
                                                            <div key={product._id}>
                                                                <ProductCard {...product} handleAddToCart={this.handleAddToCart} handleAddWish={this.handleAddWish}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )
                                            :
                                            <></>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                        <div className="row pagination-row">
                            <div className="col-md-12">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={2}
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
        )
    }
}

const mapStateToProps = (state) => ({
    all_products: state.Products.all_products,
    count: state.Products.count,
    get_success: state.Products.success,
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

const mapActionsToProps = dispatch =>
    bindActionCreators({
        getAllProducts: Actions.getAllProducts,
        listCategoriesByLimit: Actions.listCategoryByLimitRequest,
        getProductsByCategory: Actions.getCatProduct,
        addWish: Actions.addWishRequest,
    }, dispatch);

export default
    connect(
        mapStateToProps,
        mapActionsToProps
    )(AllProducts);