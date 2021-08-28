import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../Redux/Actions";
import { createNotification } from "../../helpers";
import Moment from "react-moment";
import RatingStars from "../../components/RatingStars";

class CompleteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      reviews: "",
    };
  }

  componentDidMount() {
    this.props.listRating({ product_id: this.props._id });
    window.scrollTo(0, 0);
  }

  ratingChanged = (newRating) => {
    this.setState({
      rating: newRating,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    let prps = this.props;
    if (
      prps.add_rating_success &&
      prevProps.add_rating_success !== prps.add_rating_success
    ) {
      createNotification("success", prps.message);
      this.setState({
        rating: null,
        reviews: "",
      });
    }

    if (prps.add_rating_error) {
      createNotification("err", "Sorry something went wrong, please retry.");
    }
  }

  handleReviewComment = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

    submitReviews=(event)=>{
        event.preventDefault();
        if(this.state.rating){
            if(localStorage.getItem("user_details")){
                let review = this.state;
                review['product_id'] = this.props._id;
                review['product_type']="Products";
                this.props.addRating(review);
            }else{
                createNotification('info', 'Sorry, you need to login first to submit your reviews.');
            }
        }else{
            createNotification('info', 'You need to select the rating star');
        }
    }


  ratingChanged = (newRating) => {
    this.setState({
      rating: newRating,
    });
  };

  render() {    
    const { rating, reviews } = this.state;
    const { ratingList } = this.props;
    return (
      <div>
        <section className="diet_paln_items our-prod-main all-products-sec complete-prod-dtl tab-details-wrapper">
          <div className="red-rectangle grey-bg"></div>
          <div className="container">
            <div className="row all-products-titles">
              <div className="col-md-12">
                <ul className="nav nav-tabs">
                  <li>
                    <a
                      className="active"
                      data-toggle="tab"
                      href="#Product-info"
                    >
                      Product info
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#Reviews">
                      Reviews
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row tab-content-row">
              <div className="tab-content">
                <div id="Product-info" className="tab-pane fade in active">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="description-details all-details">
                        <div className="diet_item prod-con">
                          <div className="block">
                            <div className="block-inner">
                              <h4>Product Description:</h4>
                              <p>
                                {this.props.description &&
                                  this.props.description}
                              </p>
                              <div class="table-responsive">
                                                        <table class="table table-striped table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Ingredient Name</th>
                                                                    <th> Protien</th>
                                                                    <th> Carbs</th>
                                                                    <th> Fat</th>
                                                                    <th> Fiber</th>
                                                                    <th> Quantity</th>
                                                                    <th> Calories</th>
                                                                    <th> Unit</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    
                                                                </tr>
                                                               
                                                            </tbody>
                                                        </table>
                                                    </div>
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
                                {ratingList && ratingList.length ? (
                                  ratingList.map((rate) => (
                                    <li key={rate._id}>
                                      <div className="review-img">
                                        <img
                                          className="prod-img"
                                          src="/images/reviews.png"
                                        />
                                      </div>
                                      <div className="review-content">
                                        <div className="review-name">
                                          {rate.user_id.fullname} -{" "}
                                          <span>
                                            <Moment format="MMM DD, YYYY">
                                              {rate.created_at}
                                            </Moment>
                                          </span>
                                        </div>
                                        <div className="prod-rating">
                                          <div className="star-rate">
                                            <RatingStars
                                              value={rate.rating}
                                              edit={false}
                                              activeColor={"#181818"}
                                            />
                                            {/* <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-half-o"></i>
                                            <i className="fa fa-star-o"></i> */}
                                          </div>
                                        </div>
                                        <p>{rate.reviews}</p>
                                      </div>
                                    </li>
                                  ))
                                ) : (
                                  <></>
                                )}
                              </ul>
                            </div>

                            <div className="give-review">
                              <h4>
                                GIVE YOUR REVIEW{" "}
                                <span>
                                  - ( Your Email Address Will Remain Unpublished
                                  )
                                </span>
                              </h4>
                              <div className="review-content">
                                <div className="review-name">
                                  Rate This Product :
                                </div>
                                <div className="prod-rating">
                                  <div className="star-rate">
                                    <ReactStars
                                      count={5}
                                      onChange={this.ratingChanged}
                                      size={18}
                                      isHalf={true}
                                      emptyIcon={
                                        <i className="fa fa-star-o"></i>
                                      }
                                      halfIcon={
                                        <i className="fa fa-star-half-o"></i>
                                      }
                                      fullIcon={<i className="fa fa-star"></i>}
                                      activeColor="#ffd700"
                                      value={rating}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="review-content your-reviews">
                                <div className="review-name">Your Review*</div>
                                <form action="/action_page.php">
                                  <textarea
                                    name="rateproduct"
                                    name="reviews"
                                    value={reviews}
                                    onChange={this.handleReviewComment}
                                  ></textarea>
                                  <span className="click_btn">
                                    <button
                                      type="button"
                                      onClick={this.submitReviews}
                                    >
                                      submit
                                    </button>
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
    );
  }
}


const mapStateToProps = (state) => ({
  add_rating_success: state.Products.add_rating_success,
  message: state.Products.message,
  add_rating_error: state.Products.add_rating_error,
  rating_success: state.Products.rating_success,
  ratingList: state.Products.rating,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      addRating: Actions.addRatingRequest,
      listRating: Actions.listRatingRequest,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(CompleteDetail);
