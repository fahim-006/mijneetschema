import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../../Redux/Actions";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Loader from "../../../components/Loader/loader";
import * as API from "../../../Redux/API/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ListVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      errors: {},
      loader: true,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount() {
    this.props.listVideo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.users.videoListSuccess) {
      let st = prevState.loader
        ? this.setState({ loader: false, videos: this.props.users.videos })
        : null;
    }
  }

  handleDelete = async (videoId) => {
    this.setState({ loader: true });
    const response = await API.DeleteVideoAPI(videoId);
    if (response.data.status == 200) {
      toast("Video Deleted");
      this.props.listVideo();
    } else {
      toast("Something went wrong, please try again later.");
    }
  };

  render() {
    const { errors, loader, videos } = this.state;
    return (
      <DashboardLayout>
        <ToastContainer
          autoClose={3000}
          hideProgressBar={true}
          pauseOnHover
          closeOnClick
        />
        <div className="trnr_nav_cntnt">
          <div className="adprdct_nav_iner">
            <h2>Videos Listing</h2>
            {loader ? (
              <Loader />
            ) : (
              <div>
                <div className="video_upload-wrapper d-flex align-items-center">
                  {videos.length > 0 &&
                    videos.map((data, index) => {
                      return (
                        <div className="video_item">
                          <iframe
                            width="100%"
                            height={200}
                            src={
                              data.video_type == "Video"
                                ? process.env.REACT_APP_IMAGE_URL + data.video
                                : data.video_url
                            }
                          ></iframe>
                          <div className="vid_del_icon">
                            <a
                              href="#"
                              onClick={() => {
                                this.handleDelete(data._id);
                              }}
                            >
                              <i className="fa fa-trash" aria-hidden="true" />
                            </a>
                          </div>
                          <div className="vid_edit_icon">
                            <a
                              href="#"
                              onClick={() => {
                                this.props.history.push({
                                  pathname: `/trainer/udapte-video/${data._id}`,
                                  state: { detail: data },
                                });
                              }}
                            >
                              <i className="fa fa-pencil" aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="row pagination-row">
                  <div className="col-md-12">
                    <ul>
                      <li className="first pag-nav">
                        <a href="#">
                          <i className="fa fa-angle-double-left" /> prev
                        </a>
                      </li>
                      <li>
                        <a href="#">1</a>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a href="#">4</a>
                      </li>
                      <li className="last pag-nav">
                        <a href="#">
                          next <i className="fa fa-angle-double-right" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.Register,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      listVideo: Actions.listVideoRequest,
    },
    dispatch
  );
export default connect(mapStateToProps, mapActionsToProps)(ListVideo);
