import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const BodyType = ({body_type, handleBodyType, handleStepCount, handleSubmitDetails}) =>  {
        return(
            <div className="quiz_qa steps_slct bodytype">
						<div className="quiz_qa_head">
							<h3>bodytype</h3>
						</div>
						<div className="quiz_qa_content">
							<div className="bodytype_image">
								<img src="/images/body_type.png" className="" alt=""/>
							</div>
							<div className="check_multiple d-flex justify-content-between">
								<div className="select_item">
									<div className="inputGroup">
										<input
                                            id="radio1"
                                            name="radio"
                                            type="radio"
                                            name="body_type"
                                            value="ECTOMORPH"
                                            onChange={handleBodyType}
                                            checked={body_type === "ECTOMORPH"}
                                        />
										<label htmlFor="radio1">ECTOMORPH</label>
									</div>
									<div className="dropdown bodytype_dropdown">
									  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Over Ectomorph type
									  </button>	
									  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            Athletic & Rectangular shape
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            Hard body, defined muscles
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            Naturally strong
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            Gains muscle easily
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            Gains fat easier than ectomorhs
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            Broad shoulders
                                        </a>
									  </div>
									</div>
								</div>								
								<div className="select_item">
									<div className="inputGroup">
										<input
                                            id="radio2"
                                            name="radio"
                                            type="radio"
                                            name="body_type"
                                            value="MESOMORPH"
                                            onChange={handleBodyType}
                                            checked={body_type === "MESOMORPH"}
                                        />
										<label htmlFor="radio2">MESOMORPH</label>
									</div>
									<div className="dropdown bodytype_dropdown">
									  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Over Mesomorph type
									  </button>	
									  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                                Athletic & Rectangular shape
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                                Hard body, defined muscles
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                                Naturally strong
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                                Gains muscle easily
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                                Gains fat easier than ectomorhs
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                                Broad shoulders
                                        </a>
									  </div>
									</div>
								</div>							
								<div className="select_item">
									<div className="inputGroup">
										<input
                                            id="radio3"
                                            name="radio"
                                            type="radio"
                                            name="body_type"
                                            value="ENDOMORPH"
                                            onChange={handleBodyType}
                                            checked={body_type === "ENDOMORPH"}
                                        />
										<label htmlFor="radio3">ENDOMORPH</label>
									</div>
									<div className="dropdown bodytype_dropdown">
									  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Over Endomorph type
									  </button>	
									  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            Athletic & Rectangular shape
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            Hard body, defined muscles
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            Naturally strong
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            Gains muscle easily
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            Gains fat easier than ectomorhs
                                        </a>
										<a className="dropdown-item" href="#">
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            Broad shoulders
                                        </a>
									  </div>
									</div>
								</div>								
								
							</div>
							
						</div>
						<div className="quiz_qa_footer nf_ftr d-flex align-items-center justify-content-between">
							<div
                                className="prev_btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleStepCount(9);
                                }}
                            >
								<Link to="#">
                                    <img src="/images/left_arrow.png" className="img-fluid" alt=""/>
                                </Link>
							</div>
							<div
                                className="nxt_btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (body_type) {
                                        handleSubmitDetails();
                                        handleStepCount(10);
                                    }
                                }}
                            >
								<Link to="#"><span>DOORGAAN MET</span>
                                    <img src="/images/right_arrow.png" className="img-fluid" alt=""/>
                                </Link>
							</div>
						</div>
					</div>
        )
}

export default BodyType;