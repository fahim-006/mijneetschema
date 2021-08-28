import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../../Redux/Actions';
import Loader from '../../../components/Loader/loader';
import Pagination from "react-js-pagination";
const BASE_URL = process.env.REACT_APP_IMAGE_URL;

class TrainerVideos extends Component{
    constructor(props){
        super(props);
        this.state={
            loading: true,
            trainer_id: '',
            pageNo: 1,
            current_page: 1,
        }
    }

    componentDidMount(){
        if(this.props.match.params && this.props.match.params.id){
            this.setState({
                trainer_id: this.props.match.params.id
            }, () => {
                this.props.getVideos({
                    trainerId: this.state.trainer_id,
                    pageNo: this.state.pageNo
                })
            });
        }
    }

    componentDidUpdate(prevProps, prevState){
        let prps = this.props;
        if(prps.videosListSuccess && prevProps.videosListSuccess !== prps.videosListSuccess){
            this.setState({
                loading: false
            })
        }else if(prps.videosListfailure && prevProps.videosListfailure !== prps.videosListfailure){
            this.setState({
                loading: false
            })
        }
    }

    handlePageChange(pageNumber) {
        this.setState({ current_page: pageNumber, loading: true }, function () {
            this.props.getVideos({trainerId: this.state.trainer_id, pageNo: pageNumber});
        });
    }

    render(){
        const {videosList} = this.props;
        return(
            <section className="diet_paln_items our-prod-main all-products-sec feartured-prod-sec trainer_videos_single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="sec-heading text-center">Trainer <span className="black-txt">Videos</span></h2>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.loading ?
                            <Loader />
                            :
                            <div className="video_upload-wrapper d-flex align-items-center">
                                {videosList && videosList.length ?
                                    videosList.map((video)=>(
                                        <div className="video_item" key={video._id}>
                                            {video.video_type === 'Url' ?
                                                <iframe
                                                    width="100%"
                                                    height="250"
                                                    src={video.video_url}
                                                ></iframe>
                                                :
                                                <iframe
                                                    width="100%"
                                                    height="250"
                                                    src={BASE_URL+video.video}
                                                ></iframe>
                                            }
                                        </div>
                                    ))
                                    :
                                    <div className="video_inner">
                                        <p>This trainer has not added any video.</p>
                                    </div>
                                }

                        </div>
                    }
                    </div>
                    {this.props.video_pages ?
                        <div className="row pagination-row">
                            <div className="col-md-12">
                                <Pagination
                                    activePage={this.state.current_page}
                                    itemsCountPerPage={2}
                                    totalItemsCount={this.props.video_pages}
                                    pageRangeDisplayed={2}
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
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    videosListSuccess: state.Trainer.videosListSuccess,
    videosListfailure: state.Trainer.videosListfailure,
    videosList: state.Trainer.videosList,
    video_pages: state.Trainer.total_page,
});

const mapActionToProps = dispatch => 
bindActionCreators({
    getVideos: Actions.trainerVideos,
}, dispatch); 
export default 
connect(
    mapStateToProps,
    mapActionToProps
)(TrainerVideos);