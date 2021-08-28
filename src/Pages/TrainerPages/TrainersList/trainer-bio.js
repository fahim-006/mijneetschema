import React, { Component } from 'react';
import RatingStars from '../../../components/RatingStars';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../../Redux/Actions';
import { sendChatReq } from '../../../socket';
import { createNotification } from '../../../helpers';
class TrainerBio extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(this.props.match.params && this.props.match.params.id){
            this.setState({
                trainer_id: this.props.match.params.id
            }, () => {
                this.props.getProfile(this.state.trainer_id);
            });
        }
    }

    handleRequest = () => {
        let isLogin = localStorage.getItem('user_details') && JSON.parse(localStorage.getItem('user_details'))._id;
        if(isLogin){
            sendChatReq();
        }else{
            createNotification('info', 'You need to login first, to follow any trainer.')
        }
    }

    render(){
        const {profileData} = this.props;
        return(
            <div>
                <section className="diet_paln_items our-prod-main product-detail-main">
                    <div className="container">
                        <div className="row top-products all-products-sec">
                            <div className="col-md-5 col-lg-5 col-sm-12">
                                <div id="custCarousel" className="carousel slide trainer_images" data-ride="carousel" align="center">
								   {/* <!-- slides --> */}
								   <div className="carousel-inner">
                                        {
                                            profileData && profileData.profile_img.map((file, idx) => (
                                                <div key={idx} className={idx === 0 ? 'carousel-item active' : 'carousel-item'}> 
                                                    <img src={`/uploads/${file}`} alt={file} /> 
                                                </div>)
                                            )
                                        }
                                       
								   </div>
								   <ol className="carousel-indicators list-inline">
                                        {
                                            profileData && profileData.profile_img.map((file, idx) => (
                                                <li key={idx} className="list-inline-item active">
                                                    <a id={`carousel-selector-${idx}`} className={idx === 0 ? 'selected' : ''} data-slide-to={idx} data-target="#custCarousel">
                                                        <img src={`/uploads/${file}`} alt={file} className="img-fluid"/>
                                                    </a>
                                                </li>
                                            ))
                                        }
								   </ol>
								</div>			
                            </div>
                            <div className="col-md-7 col-lg-7 col-sm-12">
                                <div className="diet_item prod-con main-prod-details">
                                    <div className="prod-upper trainer_single_info">
                                        <div className="prod-title">{profileData && profileData.fullname}</div>
                                        <div className="prod-rating">

                                            <div className="star-rate">
                                                <RatingStars 
                                                    edit={false}
                                                    value={5}
                                                    activeColor={"#f35756"}
                                                />
                                                {/* <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <i className="fa fa-star-o"></i> */}
                                            </div>
                                            
                                        </div>
										
                                        <p className="product-desp">
                                            {profileData && profileData.bio}
                                        </p>
										<div className="trainer_single_qlty d-flex">
											<div className="tr_info_list">
												<div className="til_image">
                                                    <img src="/images/bodybuilding.png"/>
                                                </div>
												<div className="til_txt">Bodybuilding</div>
											</div>
											<div className="tr_info_list">
												<div className="til_image">
                                                    <img src="/images/contest_prep.png"/>
                                                </div>
												<div className="til_txt">Contest Prep</div>
											</div>
											<div className="tr_info_list">
												<div className="til_image">
                                                    <img src="/images/general-fitness.png"/>
                                                </div>
												<div className="til_txt">General Fitness</div>
											</div>
											<div className="tr_info_list">
												<div className="til_image">
                                                    <img src="/images/online-training.png"/>
                                                </div>
												<div className="til_txt">Online Training</div>
											</div>
										</div>
										<div className="trainer_single_foot_wrap d-flex align-items-center justify-content-between">
											<div className="trainer_social_links">
												<ul>
													<li>
                                                        <a href="#">
                                                            <i className="fa fa-facebook" aria-hidden="true"></i>
                                                        </a>
                                                    </li>
													<li>
                                                        <a href="#">
                                                            <i className="fa fa-twitter" aria-hidden="true"></i>
                                                        </a>
                                                    </li>
													<li>
                                                        <a href="#">
                                                            <i className="fa fa-linkedin" aria-hidden="true"></i>
                                                        </a>
                                                    </li>
												</ul>
											</div>
											<div className="click_btn text-right">
                                                <button
                                                    onClick={this.handleRequest}
                                                    type="button"
                                                >Send Request</button>
                                                <i className="fa fa-long-arrow-right"></i>
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
    profileData: state.Trainer.profileData,
    profileSuccess: state.Trainer.profileSuccess,
    profileError: state.Trainer.profileError,
    profile_err_msg: state.Trainer.profile_err_msg,
});

const mapActionToProps = dispatch => 
bindActionCreators({
    getProfile: Actions.profileDetails,
}, dispatch);

export default 
connect(
    mapStateToProps,
    mapActionToProps
)(TrainerBio);