import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../Redux/Actions";
import { createNotification } from "../../helpers";
import Moment from "react-moment";
import RatingStars from '../../components/RatingStars';

class CompleteDetail extends Component {
  constructor(props) {
   
    super(props);
    this.state = {
      rating: null,
      reviews: "",
    };
    //alert("details props are" + this.props.ingredient[0].protien);
    //this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    //console.log("details props are" + this.props);
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
    //console.log("this is props: "+ prps.prevProps);
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
    //alert(prevState.Calculator)
  }



  handleReviewComment = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitReviews = () => {
    if (this.state.rating) {
      if (localStorage.getItem("user_details")) {
        let review = this.state;
        review["product_id"] = this.props._id;
        review["product_type"] = "Meals";
        this.props.addRating(review);
      } else {
        createNotification(
          "info",
          "Sorry, you need to login first to submit your reviews."
        );
      }
    } else {
      createNotification("info", "You need to select the rating star");
    }
  };

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
        <section className="diet_paln_items our-prod-main all-products-sec complete-prod-dtl">
          <div className="red-rectangle grey-bg" />
          <div className="container">
            <div className="row all-products-titles">
              <div className="col-md-12">
                <ul className="nav nav-tabs">
                  <li>
                    <a className="active" data-toggle="tab" href="#Description">
                      Beschrijving
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#Product-info">
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
                <div id="Description" className="tab-pane fade in active">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="description-details all-details">
                        <div className="diet_item prod-con">
                          <div className="block">
                            <div className="block-inner">
                              <h4>Beschrijving</h4>
                              <p>
                                {this.props.description &&
                                  this.props.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="Product-info" className="tab-pane fade">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="description-details all-details">
                        <div className="diet_item prod-con">
                          <div className="block">
                            <div className="block-inner">
                              <h4>Nutrition Feiten:</h4>

                             
                              <table style={{border: "2px solid black",  width: "100%", textAlign: "center"}}>
                                <thead style={{border: "1px solid black"}}>
                                  <th  style={{border: "1px solid black"}}>Ingredient</th>
                                  <th  style={{border: "1px solid black"}}>Protien</th>
                                  <th  style={{border: "1px solid black"}}>Carbs</th>
                                  <th  style={{border: "1px solid black"}}>Fat</th>
                                  <th  style={{border: "1px solid black"}}>Fiber</th>
                                  <th  style={{border: "1px solid black"}}>Quantity</th>
                                  <th  style={{border: "1px solid black"}}>Calories</th>
                                  <th  style={{border: "1px solid black"}}>Unit</th>
                                </thead>
                               
                                {this.props.ingredient.map((item) => (
                                  <tr>
                                    <td style={{border: "1px solid black"}}>{item.name}</td>
                                    <td style={{border: "1px solid black"}}>{item.protien}</td>
                                    <td style={{border: "1px solid black"}}>{item.carbs}</td>
                                    <td style={{border: "1px solid black"}}>{item.fat}</td>
                                    <td style={{border: "1px solid black"}}>{item.fiber}</td>
                                    <td style={{border: "1px solid black"}}>{item.quantity}</td>
                                    <td style={{border: "1px solid black"}}>{item.calories}</td>
                                    <td style={{border: "1px solid black"}}>{item.unit}</td>
                                  </tr>
                                ))}
                              
                              </table>
                             
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
                              </ul>
                            </div>

                            <div className="give-review">
                              <h4>
                                GEEF JOUW REVIEW{" "}
                                <span>
                                  - ( Jouw emailadres is niet zichtbaar
                                  )
                                </span>
                              </h4>
                              <div className="review-content">
                                <div className="review-name">
                                  Aantal sterren :
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
                                <div className="review-name">Jouw Review*</div>
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
                                      Versturen
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
        listRating: Actions.listRatingRequest
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(CompleteDetail);
