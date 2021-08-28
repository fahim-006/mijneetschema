import React from "react";
import { Link } from 'react-router-dom';

const FirstStep = ({ gender, handleOnChange, handleStepCount }) => {
    return (
        <div>
            <div className="quiz_qa">
                <div className="quiz_qa_head">
                    <h3>SELECTEER JOUW GESLACHT</h3>
                </div>
                <div className="quiz_qa_content">
                    <div
                        className="gndr_slct_wrap d-flex justify-content-between"
                    >
                        <div className="inputGroup gndr_slct">
                            <input
                                id="radio1"
                                name="gender"
                                type="radio"
                                value="Man"
                                checked={gender === "Man"}
                                onChange={handleOnChange}
                            />
                            <label htmlFor="radio1">
                                <div className="gndr_slct_data">
                                    <span className="gs_icon">
                                        <img
                                            src={gender === "Man" ? "./images/man.png" : "./images/man-pink.png"}
                                            className={gender === "Man" ? "img-fluid b-img" : "img-fluid p-img"}
                                            alt=""
                                        />
                                        {/* <img  src="./images/man-pink.png" className="img-fluid p-img" alt="" /> */}
                                    </span>
                                    <span className="gs_value">Man</span>
                                </div>
                            </label>
                        </div>
                        <div className="inputGroup gndr_slct">
                            <input
                                id="radio2"
                                name="gender"
                                type="radio"
                                value="Vrouw"
                                checked={gender === "Vrouw"}
                                onChange={handleOnChange}
                            />
                            <label htmlFor="radio2">
                                <div className="gndr_slct_data">
                                    <span className="gs_icon">
                                        <img
                                            src={gender === "Vrouw" ? "./images/women.png" : "./images/women-pink.png"}
                                            className={gender === "Vrouw" ? "img-fluid b-img" : "img-fluid p-img"}
                                            alt=""
                                        />
                                        {/* <img src="./images/women-pink.png" className="img-fluid p-img" alt="" /> */}
                                    </span>
                                    <span className="gs_value">vrouw</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div
                    className="quiz_qa_footer">
                    <div className="nxt_btn" onClick={e => {
                        e.preventDefault();
                        if (gender) { handleStepCount(2) }
                    }}
                >
                        <Link
                            style={{ pointerEvents: gender === '' ? 'none' : '' }}
                        >
                            <span>DOORGAAN MET</span>
                            <img src="./images/right_arrow.png" className="img-fluid" alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
    // }
}

export default FirstStep;