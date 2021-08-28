import React, { Component } from "react";
import ProductsLayout from "../../layouts/ProductsLayout";
const IMG_URL = process.env.REACT_APP_IMAGE_URL;

class ShoppingBlock extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     cartProducts: [],
    // };
  }

  // componentDidMount() {
  //     if (
  //         localStorage.getItem('items_in_cart') &&
  //         localStorage.getItem('items_in_cart') !== undefined
  //     ) {
  //         console.log('ShoppingBlock componentDidMount', JSON.parse(localStorage.getItem('items_in_cart')));
  //         let storageCart = JSON.parse(localStorage.getItem('items_in_cart'));
  //         this.setState({
  //             cartProducts: storageCart
  //         });
  //     }
  // }

  // componentDidUpdate() {
  //     console.log('this.componentDidUpdate called');
  // }
  // handleQuantityChange = (event, index) => {
  //     event.preventDefault();
  //     let stateCart = this.state.cartProducts;
  //     let currentItem = stateCart[index];
  //     currentItem.quantity = event.target.value;
  //     stateCart[index] = currentItem;
  //     this.setState({
  //         cartProducts: stateCart
  //     }, () => {
  //         console.log('check setState', this.state.cartProducts);
  //     });
  //     // const quant = event.target.value.slice(1);
  //     // console.log('quant', quant);
  //     // item.quantity = quant;
  //     // const newCart = new Map(this.state.cartProducts);
  //     // newCart.set(item)
  //     // console.log('updated quantity', newCart);
  //     // localStorage.items_in_cart = JSON.stringify(Array.from(newCart.entries()));
  //     // console.log('remove item', JSON.parse(localStorage.items_in_cart));
  //     // new Map(JSON.parse(localStorage.items_in_cart)).set(item[1]._id, item);
  // }

  // handleRemoveCartItem = (e) => {
  //     console.log('remove item', e.target.id);
  // }

  render() {
    const {
      item,
      index,
      handleQuantityChange,
      handleRemoveCartItem,
    } = this.props;
    return (
      <div className="heading-cart-row product-row-cart" key={item._id}>
        <div className="heading-cart-col cart-image">
          <div className="heading-cart-col-inner">
            {item.product_img != undefined && (
              <img
                className="product-row-cart-img"
                src={`${IMG_URL}${item.product_img}`}
              />
            )}
            {item.meal_img != undefined && (
              <img
                className="product-row-cart-img"
                src={`${IMG_URL}${item.meal_img}`}
              />
            )}
          </div>
        </div>
        <div className="heading-cart-col cart-name">
          <div className="heading-cart-col-inner">
            <span className="main-name">{item.name}</span>
            {item.category_id != undefined && (
              <span className="main-cetagory">{item.category_id.category}</span>
            )}
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
              onChange={(e) => handleQuantityChange(e, index)}
            />
          </div>
        </div>
        <div className="heading-cart-col cart-select">
          <div className="heading-cart-col-inner">
            <span className="delete-cart" id={item._id}>
              <i
                className="fa fa-times"
                onClick={(e) => handleRemoveCartItem(index)}
              ></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingBlock;
