import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProductCard from '../../components/ProductsCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../Redux/Actions';
import { createNotification } from '../../helpers';
const IMG_URL = process.env.REACT_APP_IMAGE_URL;

class FeaturedProducts extends Component {
    constructor(props) {
        super(props);
        this.state={
            feature:[],
            feature_card:'',
            cart_Array: [],
        }
    }

    componentDidMount() {
        if (
            localStorage.getItem('items_in_cart') &&
            localStorage.getItem('items_in_cart') !== undefined
        ) {
            let storageCart = JSON.parse(localStorage.getItem('items_in_cart'));
            this.setState({
                cart_Array: storageCart
            });
        }
        this.props.getFeaturedProd();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.feat_prods !== this.props.feat_prods && this.props.feat_prods_success) {
            // createNotification('success', this.props.get_success_msg);
            this.setState({feature:this.props.feat_prods},function(){
                this.featuredProduct();
            })
        }

        if (this.props.add_wish_success && (prevProps.add_wish_success !== this.props.add_wish_success)) {
            createNotification('info', this.props.message);
        }
        if (this.props.add_wish_error && (prevProps.add_wish_error !== this.props.add_wish_error)) {
            createNotification('error', this.props.message);
        }
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

    featuredProduct = async() => {
        
      let v=   await   this.state.feature.map((product) => (
                <div className="wow fadeInUp item" key={product._id}>
                    <div className="team_membar carousel_team_blk">
                        <div className="diet_item prod-con">
                            <ProductCard {...product} handleAddToCart={this.handleAddToCart} handleAddWish={this.handleAddWish}/>
                        </div>
                    </div>
                </div>
            )
            )

      this.setState({feature_card:v});
          
        
    }

    render() {
        
        return (
            <div>
                {/*<!-- FEATURED PRODUCTS STARTS --> */}
                <section className="diet_paln_items our-prod-main all-products-sec feartured-prod-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="sec-heading text-center">Gerelateerde
                                        <span className="black-txt">producten</span>
                                </h2>
                            </div>
                        </div>
                        <div className="row all-products-titles ">
                    {this.state.feature_card !=='' &&
                          <OwlCarousel
                                className="owl-theme"
                                loop={false}
                                items={3}
                                nav={false}
                                dots={true}
                                margin={25}
                            >
                           {this.state.feature_card}
                          </OwlCarousel>
                            }
                        </div>
                    </div>
                </section>
                {/* <!-- FEATURED PRODUCTS STARTS -->*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    // all_products: state.Products.all_products,
    // get_success: state.Products.get_success,
    // get_error: state.Products.get_error,
    get_error_msg: state.Products.get_error_msg,
    feat_prods_success: state.Products.feat_prods_success,
    feat_prods_err: state.Products.feat_prods_err,
    feat_prods: state.Products.feat_prods,
    add_wish_success: state.Products.add_wish_success,
    message: state.Products.message,
    add_wish_error: state.Products.add_wish_error,
});

const mapActionsToProps = dispatch =>
    bindActionCreators({
        getAllProducts: Actions.getAllProducts,
        getFeaturedProd: Actions.getFeaturedProd,
        addWish: Actions.addWishRequest,
    }, dispatch);

export default
    connect(
        mapStateToProps,
        mapActionsToProps
    )(FeaturedProducts);