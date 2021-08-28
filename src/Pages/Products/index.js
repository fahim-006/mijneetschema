import React, { Component } from 'react';
import AllProducts from './all-products';
import FeaturedProducts from './featured-products';
// import CategoryCard from './categoryCard';
import ProductsLayout from '../../layouts/ProductsLayout';

class ProductsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ProductsLayout>
                <div>
                    <div className="banner_sec">
                        <div className="container">
                            <div className="col-12">
                                <div className="steps_result">
                                    <div className="banner_txt d-flex">
                                        <div className="banr_headng">Onze<br />producten</div>
                                        <div className="banr_image">
                                            <img src="/images/fitness_PNG181.png" className="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* MAIN PAGE CONTENT AREA STARTS */}
                    {/* <!-- MAIN PAGE CONTENT AREA STARTS --> */}
                    <div className="content-area homepage-content-main">


                        {/**
                         * Top Section (Top Products Card)
                         **/}
                       {/** <CategoryCard />*/} 


                        {/**
                          * All Products Section
                          **/}
                        <AllProducts />


                        {/**
                           * Featured Products Section 
                           **/}
                        <FeaturedProducts />

                    </div>
                </div>
            </ProductsLayout>
        )
    }
}

export default ProductsPage;
