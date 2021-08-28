import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProductCard from '../../components/ProductsCard';
import MealCard from '../../components/MealsCard';
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
            const { page_no } = this.state;
            this.props.listWishProducts({ page_no });
        

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
        let prps = this.props;
        if (
            prevProps.wish_products !== prps.wish_products
            
        ) {
            this.setState({ loader: false })
        }
     

        if (prps.remove_wish_success && (prevProps.remove_wish_success !== prps.remove_wish_success)) {
            createNotification('info', prps.message);
        }
        if (prps.remove_wish_error && (prevProps.remove_wish_error !== prps.remove_wish_error)) {
            createNotification('error', prps.message);
        }

        if(prps.wish_error && (prps.wish_error !== prevProps.wish_error)){
            this.setState({ loader: false });
        }
    }

    
    
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber }, function () {
            this.props.listWishProducts({page_no : pageNumber })
        });
    }


    // Functionality to add item in cart
    handleAddToCart = (e) => {
        let isExist = this.state.cart_Array && this.state.cart_Array.findIndex(prod => prod._id === e._id);

        if (isExist === parseInt(-1)) {
            let stateCart = this.state.cart_Array && this.state.cart_Array;
            e = Object.assign({ 'quantity': 1 }, e)
            stateCart.push(e);
            this.setState({
                cart_Array: stateCart
            }, () => {
                createNotification('success', `Product ${e.name} is added in cart successfully.`);
                localStorage.setItem('items_in_cart', JSON.stringify(this.state.cart_Array));
                this.props.updateCartValue();
            });
        } else {
            createNotification('info', 'This item is already added in cart.');
        }
    }

    handleRemoveWish = (e) => {
        if(localStorage.getItem("user_role") && localStorage.getItem("user_role") !== "undefined" && localStorage.getItem("user_role") ==='3')
        {
            
            this.props.removeWish({ product_id:e._id,page_no: this.state.activePage });
        }else{
            createNotification('info', 'To delete in wishlist you have to login first !!');
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
                       
                        
                      {loader? <Loader /> :
                        <div className="row tab-content-row">
                            <div className="tab-content">
                                <div id="home" className="tab-pane fade in active">
                                    <div className="row">

                                        {this.props.wish_products
                                            ?
                                            this.props.wish_products.map((product) => {
                                                if(product.product_id){
                                                    return (
                                                        <div className="col-md-6 col-lg-4 col-sm-6" key={product._id}>
                                                            <div className="diet_item prod-con">
                                                                <div key={product._id}>
                                                                    {
                                                                      product.onModel=="Meals" == true 
                                                                      ?
                                                                      <MealCard {...product.product_id} handleAddToCart={this.handleAddToCart} handleRemoveWish={this.handleRemoveWish}/>
                                                                      :
                                                                      <ProductCard {...product.product_id} handleAddToCart={this.handleAddToCart} handleRemoveWish={this.handleRemoveWish}/>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
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
                                totalItemsCount={this.props.wish_count ? this.props.wish_count : 0}
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
    wish_products: state.Products.wish_products,
    wish_count: state.Products.wish_count,
    wish_success: state.Products.wish_success,
    remove_wish_success: state.Products.remove_wish_success,
    message: state.Products.message,
    remove_wish_error: state.Products.remove_wish_error,
    wish_error: state.Products.wish_error,
});

const mapActionsToProps = dispatch =>
    bindActionCreators({
        listWishProducts: Actions.listWishRequest,
        removeWish: Actions.removeWishRequest,
        updateCartValue: Actions.updateCartValue
    }, dispatch);

export default
    connect(
        mapStateToProps,
        mapActionsToProps
    )(AllProducts);