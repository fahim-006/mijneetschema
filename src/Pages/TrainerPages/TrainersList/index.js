import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../../Redux/Actions';
import UserLayout from '../../../layouts/UserLayout';
import RatingStars from '../../../components/RatingStars';
import Loader from '../../../components/Loader/loader';
import Pagination from "react-js-pagination";
import AgeFiltering from './ageFiltering';
import LocationFiltering from './LocationFiltering';
import { createNotification } from '../../../helpers';
import DoelFilter from './doelFilter'
import { getFilteredTrainer } from '../../../Redux/API/apiFiltering';

class TrainersList extends Component{
    constructor(props){
        super(props);
        this.state={
            page_no: 1,
            total_pages: '',
            current_page: 1,
            loading: true,
            category: '',
            gender: '',
            selectedOption: 'select',
            filters :{
                gender: []
            }
        }
    }

    componentDidMount(){
        //console.log("getTrainersListtt  ::  "+  this.props.getTrainersList())
        this.props.getTrainersList({page_no: this.state.current_page});
        this.props.getTrainerCat();
    }

    componentDidUpdate(prevProps, prevState){
        let prps = this.props;
        if(
            (prps.get_trnr_success || prps.get_trnr_failure) &&
            (
                prevProps.get_trnr_success !== prps.get_trnr_success 
                // prevProps.get_trnr_failure !== prps.get_trnr_failure
            )
        ){
            this.setState({loading: false});
        }

        if(
            prps.get_trnr_err_msg &&
            prps.get_trnr_err_msg !== prevProps.get_trnr_err_msg
        ){
            createNotification('info', prps.get_trnr_err_msg);
            this.setState({loading: false})
        }
    }

    handleCategoryChange = (event) => {
       
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            const {category, current_page} = this.state;
            let filterQuery = {
                page_no: current_page,
                category_id: category,
            };
            
            this.props.getTrainersList(filterQuery);
            this.setState({
                loading: true
            });
        })
    }



    handleSearch = (event) => {
        if(event.target.value.length > 2){
            const {category, page_no} = this.state;
            let searchQuery = {
                page_no: page_no,
                category_id: category,
                search: event.target.value
            };
            
          
            alert(this.props.getTrainersList(searchQuery.category_id))
            this.props.getTrainersList(searchQuery);
            //alert(( (searchQuery.search)));
            this.setState({
                loading: true
            });
        }else{
            this.props.getTrainersList({page_no: this.state.current_page});
            this.setState({ loading: true });
        }
    }


    handlePageChange(pageNumber) {
        this.setState({ 
            current_page: pageNumber,
            loader: true
        }, function () {
            this.state.category === '' ? 
            this.props.getTrainersList({page_no: pageNumber}) : 
            this.props.getTrainersList({page_no: pageNumber, category_id: this.state.category})
        });
    }

    handleFilters = (event) => {
        this.setState({selectedOption : event.target.value})

        alert(`myfilters= ${this.state.selectedOption}`);
        
        const newFilters = {...this.state.filters};

        newFilters["gender"]=this.state.selectedOption;

        //if(filterBy == "gender"){
            //newFilters[filterBy] = myfilters;
        //}
        
       //this.setState({filters: newFilters})
        //{trainerList.trainer_list : response.data}
        getFilteredTrainer(newFilters)
           .then(response => (console.log("this" + response.data)))
         .catch(err=> console.log("failed to load"))
    }

    render(){
        const { trainerList } = this.props;
        const { loading } = this.state;
        return(
            <UserLayout>
                <div className="banner_sec">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="quiz_wrap steps_result trainer_bnr_wrap">
                                <div className="banner_txt d-flex">
                                    <div className="banr_headng text-uppercase ">Trainers &<br/>Coaches
                                        <div className="slogan">Kies de begeleiding die bij jouw past</div>
                                    </div>
                                    <div className="banr_image">
                                        <img src="/images/about-image-1.png"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-area homepage-content-main">
                    <section className="content-area trianer_icons">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="trainers_qlty d-flex align-items-center justify-content-between">
                                        <div className="trainers_qlty_list">
                                            <div className="trainers_qlty_icon">
                                                <img src="/images/Group 49.png" className="img-fluid"/>
                                            </div>
                                            <div className="trainers_qlty_txt">
                                                <h3>Geverifieerde Trainers</h3>
                                            </div>
                                        </div>
                                        <div className="trainers_qlty_list">
                                            <div className="trainers_qlty_icon">
                                                <img src="/images/Group 50.png" className="img-fluid"/>
                                            </div>
                                            <div className="trainers_qlty_txt">
                                                <h3>Top rated trainers</h3>
                                            </div>
                                        </div>
                                        <div className="trainers_qlty_list">
                                            <div className="trainers_qlty_icon">
                                                <img src="/images/Group 51.png" className="img-fluid"/>
                                            </div>
                                            <div className="trainers_qlty_txt">
                                                <h3>Veelzijdige trainers</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="content-area trianers_listing">
                        <div className="red-rectangle grey-bg"></div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12"> 
                                          {/*For gender Filtering*/}
                                          <div className="trainer_select_wrap">
                                                <div className="form_group_row">
                                                    <div className="form_group">
                                                        <div className="trainer__slctr">
                                                        {/*<GenderFilter 
                                                            handleFilters={myfilters => this.handleFilters(myfilters, "gender")} 
                                                        />*/}

                                                        <select name="gender" onChange={this.handleFilters} value={this.state.selectedOption}>
                                                                <option>geslacht</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                            <div className="trainer_select_wrap">
                                                <div className="form_group_row">
                                                    <div className="form_group">
                                                        <div className="trainer__slctr" onChange={this.handleCategoryChange}>
                                                            <select name="category">
                                                                <option value=''>Alle categorieën</option>
                                                                {this.props.tr_Cat_List && this.props.tr_Cat_List ?
                                                                    this.props.tr_Cat_List.map((cat)=>(
                                                                        <option key={cat._id} value={cat._id}>{cat.category}</option>
                                                                    ))
                                                                    :
                                                                    <></>
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    {/*Doel*/}
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12"> 
                                          {/*For gender Filtering*/}
                                          <div className="trainer_select_wrap">
                                                <div className="form_group_row">
                                                    <div className="form_group">
                                                        <div className="trainer__slctr" onChange={this.handleCategoryChange}>
                                                           <DoelFilter/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>   
                                         {/* Age Filtering*/}
                                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                            <AgeFiltering/>
                                        </div>
                                        {/* plaates Filtering*/}
                                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                            <LocationFiltering  onChange={this.handleSearch}/>
                                        </div>

                                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                            <div className="trainer_select_wrap">
                                                <div className="form_group_row">
                                                    <div className="form_group">
                                                        <div className="trainer_srch_outer">
                                                            <input
                                                                type="text"
                                                                name="trainer_search"
                                                                onChange={this.handleSearch}
                                                                placeholder="Zoek trainer hier"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {loading ?
                                        <Loader/>
                                        :
                                        <div className="row tr_lst_out_row">

                                            { trainerList && trainerList.trainer_list && trainerList.trainer_list.length ?
                                                trainerList.trainer_list.map((trainer)=>(
                                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 tr_lst_out" key={trainer._id}>
                                                    <div className="trainers__list">
                                                        <div style={{cursor: "pointer"}}  onClick={e => {
                                                                            this.props.history.push({
                                                                                pathname:`/trainer-profile/${trainer._id}`
                                                                            })
                                                                        }} className="trainers__list_img">
                                                            <img src={`/uploads/${trainer.profile_img[0]}`} alt={trainer.fullname} className="img-fluid"/>
                                                        </div>
                                                        <div className="trainer_list_content">
                                                            <h2 style={{textTransform: "uppercase"}}>{trainer.fullname}</h2>
                                                            <div className="rating_trnr_sec d-flex justify-content-between align-items-center">
                                                                <div className="rating_tr d-flex align-items-center">
                                                                    <RatingStars
                                                                        edit={false}
                                                                        value={5}
                                                                    />
                                                                    
                                                                </div>
                                                                <div className="see_btn_tr click_btn">
                                                                    <button
                                                                       
                                                                    >Lees meer</button>
                                                                </div>
                                                            </div>
                                                            <div className="trainer_list_text">
                                                                <p>{trainer.bio}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                ))
                                                :
                                                <div>
                                                    <p>
                                                        Geen trainer of coach gevonden. Probeer een andere categorie
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    }
                                    <div className="row pagination-row">
                                        <div className="col-12">
                                            <Pagination
                                                activePage={this.state.current_page}
                                                itemsCountPerPage={9}
                                                totalItemsCount={this.props.total_pages ? (this.props.total_pages * 9) : 0}
                                                pageRangeDisplayed={4}
                                                firstPageText="<< first"
                                                lastPageText="last >>"
                                                prevPageText="< prev"
                                                nextPageText="next >"
                                                itemClassFirst="pag-nav first"
                                                itemClassPrev="pag-nav"
                                                itemClassNext="pag-nav"
                                                itemClassLast="pag-nav last"
                                                onChange={this.handlePageChange.bind(this)}
                                            />
                                            {/* <div className="trainer_pagination">
                                                <ul>
                                                    <li className="prev">
                                                        <img src="/images/right 2.png"/>
                                                    </li>
                                                    <li ><a href="#">1</a></li>
                                                    <li className="active"><a href="#">2</a></li>
                                                    <li><a href="#">3</a></li>
                                                    <li><a href="#">4</a></li>
                                                    <li className="next">
                                                        <img src="/images/right 1.png"/>
                                                    </li>
                                                </ul>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                        </section>                   
                </div>
            </UserLayout>
        )
    }

}

const mapStateToProps = state => ({
    trainerList: state.Trainer.trainerList,
    get_trnr_success: state.Trainer.get_trnr_success,
    get_trnr_failure: state.Trainer.get_trnr_failure,
    get_trnr_err_msg: state.Trainer.get_trnr_err_msg,
    
    tr_Cat_List: state.Trainer.tr_Cat_List,
    get_cat_success: state.Trainer.get_cat_success,
    get_cat_failure: state.Trainer.get_cat_failure,
    get_cat_err_msg: state.Trainer.get_cat_err_msg,
    total_pages: state.Trainer.pages,
});

const mapActionsToProps = dispatch => 
    bindActionCreators({
        getTrainersList: Actions.trainerList,
        getTrainerCat: Actions.trainerCat,
        trainerSearch: Actions.trainerSearch,
    }, dispatch);

export default 
connect(
    mapStateToProps,
    mapActionsToProps
)(TrainersList);