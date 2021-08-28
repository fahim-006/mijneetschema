import React, { Component } from 'react';
const IMG_URL = process.env.REACT_APP_IMAGE_URL;

class CategoryCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/* <!-- TOP PRODUCTS SECTION STARTS --> */}
                <section className="diet_paln_items our-prod-main">
                    <div className="container">
                        <div className="row top-products">
                            <div className="col-md-7">
                                <div className="product-block">
                                    <div className="prod-details">
                                        <div className="cms-banner-inner">
                                            <div className="cms-banner-img">
                                                <img src="/images/top-product1.png" alt="top product 1" />
                                            </div>
                                            <span className="static-wrapper">
                                                <span className="cms-text">
                                                    <span className="static-inner">
                                                        <span className="text1 static-text">category</span>
                                                        <span className="text2 static-text">Product title</span>
                                                    </span>
                                                    <span className="click_btn">
                                                        <button type="button">shop nu</button>
                                                        <i className="fa fa-long-arrow-right"></i>
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 right-side-prod">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="product-block">
                                            <div className="prod-details">
                                                <div className="cms-banner-inner">
                                                    <div className="cms-banner-img">
                                                        <img src="/images/top-product2.png" alt="top product 2" />
                                                    </div>
                                                    <span className="static-wrapper">
                                                        <span className="cms-text">
                                                            <span className="static-inner">
                                                                <span className="text1 static-text">category</span>
                                                                <span className="text2 static-text">Product title</span>
                                                            </span>
                                                            <span className="click_btn">
                                                                <button type="button">shop nu</button>
                                                                <i className="fa fa-long-arrow-right"></i>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-10">
                                    <div className="col-md-12">
                                        <div className="product-block">
                                            <div className="prod-details">
                                                <div className="cms-banner-inner">
                                                    <div className="cms-banner-img">
                                                        <a href="#" ><img src="/images/top-product3.png" alt="top product 3" /></a>
                                                    </div>
                                                    <span className="static-wrapper">
                                                        <span className="cms-text">
                                                            <span className="static-inner">
                                                                <span className="text1 static-text">category</span>
                                                                <span className="text2 static-text">Product title</span>
                                                            </span>
                                                            <span className="click_btn">
                                                                <button type="button">shop nu</button>
                                                                <i className="fa fa-long-arrow-right"></i>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-30 row top-products top-products-2">
                            <div className="col-md-5 right-side-prod">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="product-block">
                                            <div className="prod-details">
                                                <div className="cms-banner-inner">
                                                    <div className="cms-banner-img">
                                                        <img src="/images/top-product2.png" alt="top product 2" />
                                                    </div>
                                                    <span className="static-wrapper">
                                                        <span className="cms-text">
                                                            <span className="static-inner">
                                                                <span className="text1 static-text">category</span>
                                                                <span className="text2 static-text">Product title</span>
                                                            </span>
                                                            <span className="click_btn">
                                                                <button type="button">shop nu</button>
                                                                <i className="fa fa-long-arrow-right"></i>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-10">
                                    <div className="col-md-12">
                                        <div className="product-block">
                                            <div className="prod-details">
                                                <div className="cms-banner-inner">
                                                    <div className="cms-banner-img">
                                                        <a href="#" ><img src="/images/top-product3.png" alt="top product 3" /></a>
                                                    </div>
                                                    <span className="static-wrapper">
                                                        <span className="cms-text">
                                                            <span className="static-inner">
                                                                <span className="text1 static-text">category</span>
                                                                <span className="text2 static-text">Product title</span>
                                                            </span>
                                                            <span className="click_btn">
                                                                <button type="button">shop nu</button>
                                                                <i className="fa fa-long-arrow-right"></i>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="product-block">
                                    <div className="prod-details">
                                        <div className="cms-banner-inner">
                                            <div className="cms-banner-img">
                                                <img src="/images/top-product1.png" alt="top product 1" />
                                            </div>
                                            <span className="static-wrapper">
                                                <span className="cms-text">
                                                    <span className="static-inner">
                                                        <span className="text1 static-text">category</span>
                                                        <span className="text2 static-text">Product title</span>
                                                    </span>
                                                    <span className="click_btn">
                                                        <button type="button">shop nu</button>
                                                        <i className="fa fa-long-arrow-right"></i>
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- TOP PRODUCTS SECTION ENDS --> */}
            </div>
        )
    }
}

export default CategoryCard;