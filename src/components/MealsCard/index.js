import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
const IMG_URL = process.env.REACT_APP_IMAGE_URL;


const ProductCard = (props) => {
   // alert("from mealcard"+props._id);
    return (
        <div>
            <div className="prod-lower">
                <div className="prod-img-con">
                    {props.handleAddWish ?
                    <button 
                    onClick={e => props.handleAddWish(props)}
                    ><i className="fa fa-heart"></i></button> 
                    :
                 <button 
                    onClick={e => props.handleRemoveWish(props)}
                    ><i className="fa fa-trash"></i></button> 
                  }
                    <img className="prod-img" src={`${IMG_URL}${props.meal_img}`} />
                </div>
            </div>
            <div className="buttons">
                <div className="cart-btn">
                         <button
                            onClick={e => props.handleAddToCart(props)}
                         >
                            <i className="fa fa-shopping-cart"></i>
                            Voeg toe aan winkelwagen
                        </button>
                </div>
                <div className="quick-view-btn">
                    <Link to={`/meal-detail/${props._id}`}>
                        <i className="fa fa-eye"></i>
                    </Link>
                </div>
            </div>
            <div className="prod-upper">
                <div className="prod-ceta">{props.category_id.category}</div>
                <div className="prod-title">{props.name}</div>
                <div className="prod-price">€ {props.price}</div>
                <div className="prod-rating">
                    <div className="star-rate">
                    <ReactStars
                        count={5}
                        // onChange={this.ratingChanged}
                        size={20}
                        isHalf={true}
                        emptyIcon={<i className="fa fa-star-o"></i>}
                        halfIcon={<i className="fa fa-star-half-o"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#181818"
                        value={props.rating}
                        edit={false}
                    />
                        {/* <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-o"></i>
                        <i className="fa fa-star-o"></i> */}
                    </div>
                    <div className="num-rate"><a href="#">(1355)</a></div>
                </div>


                <div className="click_btn">
                     <Link to={`/meal-detail/${props._id}`}>
                       shop nu
                     </Link>
                   
                    <i className="fa fa-long-arrow-right"></i>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
