import React, { Component } from 'react';
import RatingStars from '../../../components/RatingStars';
import { createNotification } from '../../../helpers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../../Redux/Actions';
import Moment from 'react-moment';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
const API = process.env.REACT_APP_API_URL

class TrainerInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            rating: null,
            reviews: '',
            trainer_id: '',
            loading: true,
            description: '',
            facebookURL: '',
            twitterURL: '',
            linkedinURL: '',
            expertise: '',
            certificates: ''
        };

        axios.get(`${API}/users/fetch-trainer`)
        .then(response => {
            response.data.data.trainer_list.forEach((item, index)=> {
               
                if(item._id == this.props.match.params.id){
                       this.setState({
                            description: item.description,
                            facebookURL: item.facebookURL,
                            linkedinURL: item.linkedinURL,
                            twitterURL: item.twitterURL,
                            expertise: item.expertise,
                            certificates: item.certificates
                       });
                    
                }
               
            })
        })
    }

    componentDidMount(){
        window.scrollTo(0,0);
        if(this.props.match.params && this.props.match.params.id){
            this.setState({ 
                trainer_id: this.props.match.params.id
            },() =>{
                this.props.listRating({product_id: this.state.trainer_id});
            });
        }

    }

    componentDidUpdate(prevProps, prevState){
        let prps = this.props;
        if(
            prps.add_rating_success && 
            (prevProps.add_rating_success !== prps.add_rating_success)
        ){
            createNotification('success', prps.message)
            this.setState({
                rating: null,
                reviews: '',
                // loading: false
            })
        }

        if(prps.add_rating_error){
            createNotification('err', "Sorry something went wrong, please retry.");
            // this.props.listRating({product_id: this.state.trainer_id});
            // this.setState({loading: false});
        }
        if(prps.message){
            createNotification('err', "It seems your session has been expired. Please login again.");
            let store = ["user_role", "user_details"];
            store.forEach((item) => localStorage.removeItem(item));
        }

        // if(
        //     prps.ratingList &&
        //     prps.ratingList !== prevProps.ratingList
        // ){
        //     this.setState({loading: false});
        // }
    }

    ratingChanged = (newRating) => {
        this.setState({
            rating: newRating
        });
    };

    handleReviewComment = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitReviews=(event)=>{
        event.preventDefault();
        if(this.state.rating){
            if(localStorage.getItem("user_details")){
                const { rating, reviews} = this.state;
                let review = {
                    rating: rating,
                    reviews: reviews
                };
                review['product_id'] = this.state.trainer_id;
                review['product_type']="User";
                this.props.addRating(review);
            }else{
                createNotification('info', 'Sorry, you need to login first to submit your reviews.');
            }
        }else{
            createNotification('info', 'You need to select the rating star');
        }
    }

    render(){
        const { rating, reviews } = this.state;
        const { ratingList } = this.props;
        return(
            <div>
                <section className="diet_paln_items our-prod-main all-products-sec complete-prod-dtl">
                    <div className="red-rectangle grey-bg"></div>
                    <div className="container">
                        <div className="row all-products-titles">
                            <div className="col-md-12">
                                <ul className="nav nav-tabs">
                                    <li><a className="active" data-toggle="tab" href="#Description">Trainer info</a></li>
                                   
                                    <li><a data-toggle="tab" href="#Reviews">Reviews</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row tab-content-row">
                            <div className="tab-content">
                                <div id="Description" className="tab-pane fade in active">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="description-details all-details">
                                                <div className="diet_item prod-con">
                                                    <div className="block">
                                                        <div className="block-inner">
                                                            <h4>Description</h4>
                                                            <p>{this.state.description}</p>
                                                        </div>
                                                        <div className="block-inner">
                                                            <h4>Expertise</h4>
                                                            <ul>
                                                            {this.state.expertise.toString().split(",").map(item => 
                                                                    <li>{item}</li>
                                                                )}
                                                            </ul>
                                                            
                                                        </div>
                                                        <div className="block-inner">
                                                            <h4>certificates</h4>
                                                            
                                                            <ol>
                                                            {this.state.certificates.toString().split(",").map(item => 
                                                                    <li>{item}</li>
                                                                )}
                                                            </ol>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div id="Reviews" className="tab-pane fade reviews-tab">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="description-details all-details">
                                                <div className="diet_item prod-con">
                                                    <div className="block">
                                                        <div className="block-inner">
                                                            <h4>reviews</h4>
                                                        </div>
                                                        <div className="block-inner">
                                                            <ul className="reviews-list">
                                                            {ratingList && ratingList.length ?
                                                                ratingList.map((rate)=>(
                                                                    <li key={rate._id}>
                                                                        <div className="review-img">
                                                                            <img className="prod-img" src="images/reviews.png"/>
                                                                        </div>
                                                                        <div className="review-content">
                                                                            <div className="review-name">
                                                                                {rate.user_id.fullname} - <span>
                                                                                    <Moment format="MMM DD, YYYY">
                                                                                        {rate.created_at}
                                                                                    </Moment>
                                                                                </span>
                                                                            </div>
                                                                            <div className="prod-rating">
                                                                                <RatingStars
                                                                                    edit={false}
                                                                                    value={rate.rating}
                                                                                    activeColor={"#fec107"}
                                                                                />
                                                                            </div>
                                                                            <p>
                                                                                {rate.reviews}
                                                                            </p>
                                                                        </div>
                                                                    </li>
                                                                ))
                                                                :
                                                                <></>
                                                            } 
                                                            </ul>
                                                        </div>
                                                        <div className="give-review">
                                                            <h4>GEEF JOUW REVIEW  <span>- ( Jouw emailadres is niet zichtbaar )</span></h4>
                                                            <div className="review-content">
                                                                <div className="review-name">Aantal sterren :</div>
                                                                <div className="prod-rating">
                                                                    <div className="star-rate">
                                                                        <ReactStars
                                                                            count={5}
                                                                            onChange={this.ratingChanged}
                                                                            size={22}
                                                                            isHalf={true}
                                                                            emptyIcon={<i className="fa fa-star-o"></i>}
                                                                            halfIcon={<i className="fa fa-star-half-o"></i>}
                                                                            fullIcon={<i className="fa fa-star"></i>}
                                                                            activeColor="#fec107"
                                                                            value={rating}
                                                                        />
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="review-content your-reviews">
                                                                <div className="review-name">Jouw Review*</div>
                                                                <form onSubmit={this.submitReviews}>
                                                                    <textarea
                                                                        name="reviews"
                                                                        value={reviews}
                                                                        onChange={this.handleReviewComment}
                                                                    ></textarea>
                                                                    <span className="click_btn">
                                                                        <button
                                                                            type="submit"
                                                                        >Versturen</button>
                                                                        <i className="fa fa-long-arrow-right"></i>
                                                                    </span>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    add_rating_success: state.Products.add_rating_success,
    message: state.Products.message,
    add_rating_error: state.Products.add_rating_error,
    rating_success: state.Products.rating_success,
    ratingList: state.Products.rating,
});

const mapActionsToProps = dispatch =>
bindActionCreators({
    addRating: Actions.addRatingRequest,
    listRating: Actions.listRatingRequest
}, dispatch);

export default connect(
    mapStateToProps,
    mapActionsToProps
)(TrainerInfo);