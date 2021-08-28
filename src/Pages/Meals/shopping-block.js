import React, { Component } from 'react';
const IMG_URL = process.env.REACT_APP_IMAGE_URL;

class ShoppingBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { item, index, handleQuantityChange, handleRemoveCartItem } = this.props;
        return (
            <div className="heading-cart-row product-row-cart" key={item._id}>
                <div className="heading-cart-col cart-image">
                    <div className="heading-cart-col-inner">
                        <img className="product-row-cart-img" src={`${IMG_URL}${item.product_img}`} />
                    </div>
                </div>
                <div className="heading-cart-col cart-name">
                    <div className="heading-cart-col-inner">
                        <span className="main-name">{item.name}</span>
                        <span className="main-cetagory">{item.category_id.category}</span>
                    </div>
                </div>
                <div className="heading-cart-col cart-price">
                    <div className="heading-cart-col-inner">
                        <span>{item.price}</span>
                    </div>
                </div>
                <div className="heading-cart-col cart-qut">
                    <div className="heading-cart-col-inner">
                        <input
                            type="number"
                            value={item.quantity}
                            name="cart-price-input"
                            className="no-of-qty"
                            onChange={e => handleQuantityChange(e, index)}
                        />
                    </div>
                </div>
                <div className="heading-cart-col cart-select">
                    <div className="heading-cart-col-inner">
                        <span className="delete-cart" id={item._id}>
                            <i className="fa fa-times" onClick={e => handleRemoveCartItem(index)}></i>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShoppingBlock;