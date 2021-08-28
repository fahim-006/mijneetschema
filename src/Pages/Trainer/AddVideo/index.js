import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../../Redux/Actions";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Loader from "../../../components/Loader/loader";
import { createNotification } from "../../../helpers";

class AddVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: "",
      video_type: "",
      videoUrl: "",
      errors: {},
      loader: false,
      successMsg: "",
      showSuccessMsg: "",
      showUrl: false,
      showVideo: false,
    };

    this.onChange = this.onChange.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.onChangeRadio = this.onChangeRadio.bind(this);
  }

  fileChangedHandler = (event) => {
    this.setState({ video: event.target.files[0] });
  };

  onChangeRadio(event) {
    if (event.target.value === "Url") {
      this.setState({
        showUrl: true,
        showVideo: false,
        video_type: event.target.value,
      });
    } else {
      this.setState({
        showUrl: false,
        showVideo: true,
        video_type: event.target.value,
      });
    }
  }

  onChange(el) {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let statusCopy = Object.assign({}, this.state);
    statusCopy[inputName] = inputValue;
    this.setState(statusCopy);
    this.setState({ error: {} });
  }

  isValid = () => {
    const { videoUrl, video, video_type } = this.state;
    let error = {};
    let formIsValid = true;
    const regxPrice = /[(0-9)+.?(0-9)*]+$/;

    if (video_type === "") {
      formIsValid = false;
      error["name"] = "*Please select video type.";
    }
    if (video_type === "Url") {
      if (videoUrl === "") {
        formIsValid = false;
        error["videoUrl"] = "*Please enter video url.";
      }
    } else if (video_type === "Video") {
      if (video === "") {
        formIsValid = false;
        error["video"] = "*Please select video.";
      }
    }
    this.setState({ ...this.state.errors, errors: error });
    return formIsValid;
  };

  handleSubmit = () => {
    if (this.isValid()) {
      const { category } = this.state;
      const formData = new FormData();
      formData.append("video_type", this.state.video_type);
      formData.append("video_url", this.state.videoUrl);
      formData.append("video", this.state.video);

      this.props.addVideo(formData);
      this.setState({ loader: true });
    }
  };

  componentDidUpdate(prevProps, prevState) {

    if (this.props.users.videoSuccess && this.state.loader) {
      let st = prevState.loader
        ? this.setState({
            loader: false,
            showSuccessMsg: true,
            successMsg: this.props.users.message,
            video: "",
            videoUrl: "",
          })
        : null;
      createNotification("success", "Video added successfully", "");
    }
    if (this.props.users.videoError && this.state.loader) {
      let st = prevState.loader
        ? this.setState({ loader: false, showSuccessMsg: false })
        : null;
      createNotification("error", this.props.users.message, "");
    }
  }
  render() {
    const {
      errors,
      loader,
      successMsg,
      showSuccessMsg,
      video,
      videoUrl,
      showUrl,
      showVideo,
    } = this.state;

    return (
      <DashboardLayout>
        <div className="trnr_nav_cntnt">
          {loader ? <Loader /> : null}
          {showSuccessMsg ? (
            <span className="successMsg">{successMsg}</span>
          ) : null}
          <div className="adprdct_nav_iner">
            <h2>Add Your Video here</h2>
            <form>
              <h3 className="form_sub_h">Select Video Type</h3>

              <div className="form-row" onChange={this.onChangeRadio}>
                <div className="form-group col-md-6">
                  <div className="select_item">
                    <div className="inputGroup">
                      <input
                        id="url"
                        name="video_type"
                        value="Url"
                        type="radio"
                      />
                      <label htmlFor="url">Enter Video URL</label>
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="select_item">
                    <div className="inputGroup">
                      <input
                        id="vid"
                        name="video_type"
                        value="Video"
                        type="radio"
                      />
                      <label htmlFor="vid">Upload Local Video</label>
                    </div>
                  </div>
                </div>
                <span>
                  <p> {errors.video_type} </p>
                </span>
              </div>

              <div className="form-row slct_vdeo_type">
                {showUrl ? (
                  <div className="form-group col-md-12">
                    <input
                      name="videoUrl"
                      type="text"
                      value={videoUrl}
                      onChange={this.onChange.bind(this)}
                      placeholder="Video Url"
                      className="form-control"
                    />
                    <span>
                      <p> {errors.videoUrl} </p>
                    </span>
                  </div>
                ) : null}

                {showVideo ? (
                  <div className="form_group col-md-12">
                    <input
                      name="video"
                      type="file"
                      onChange={this.fileChangedHandler}
                    />
                    <span>
                      <p> {errors.video} </p>
                    </span>

                    <span>
                      <p></p>
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="form-row proceed-btn">
                <div className="form-group col-md-12">
                  <div className="click_btn">
                    <button onClick={() => this.handleSubmit()} type="button">
                      Add Video
                    </button>
                    <i className="fa fa-long-arrow-right" />
                  </div>
                </div>
              </div>
            </form>
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
      addVideo: Actions.trainerVideoRequest,
    },
    dispatch
  );
export default connect(mapStateToProps, mapActionsToProps)(AddVideo);
