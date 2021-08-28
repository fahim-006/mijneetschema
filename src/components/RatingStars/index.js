import React from 'react';
import ReactStars from "react-rating-stars-component";

export default function RatingStars (props){
    return(
        <ReactStars
            count={5}
            // onChange={this.props.handleRating}
            size={24}
            isHalf={true}
            emptyIcon={<i className="fa fa-star-o"></i>}
            halfIcon={<i className="fa fa-star-half-o"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor={props.activeColor ? props.activeColor : "#fec107"}
            value={props.value}
            edit={props.edit}
            // value={this.props.rating}
        />
    )
}