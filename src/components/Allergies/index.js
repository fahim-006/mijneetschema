import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class AllergiesPage extends Component {
    constructor(props) {
        super();
    }

    render() {
        const { allergies_intolerances, handleChange, handleStepCount } = this.props;
        const { mosterd, selderij, sesam, shellfish, anders, geen_allergie } = allergies_intolerances;

        return (
            <div>
                <div className="quiz_qa steps_slct alergen">
                    <div className="quiz_qa_head">
                        <h3>Allergieën en intoleranties</h3>
                    </div>
                    <div className="quiz_qa_content">
                        <div className="check_multiple d-flex justify-content-between">
                            <div className="select_item">
                                <div className="inputGroup">
                                    <input
                                        id="mosterd"
                                        name="check"
                                        type="checkbox"
                                        checked={mosterd}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="mosterd">MOSTERD</label>
                                </div>
                            </div>
                            <div className="select_item">
                                <div className="inputGroup">
                                    <input
                                        id="selderij"
                                        name="check"
                                        type="checkbox"
                                        checked={selderij}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="selderij">SELDERIJ</label>
                                </div>
                            </div>
                            <div className="select_item">
                                <div className="inputGroup">
                                    <input
                                        id="sesam"
                                        name="check"
                                        type="checkbox"
                                        checked={sesam}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="sesam">SESAME</label>
                                </div>
                            </div>
                            <div className="select_item">
                                <div className="inputGroup">
                                    <input
                                        id="shellfish"
                                        name="check"
                                        type="checkbox"
                                        checked={shellfish}
                                        onChange={handleChange}
                                    />
                                    <label className="small" htmlFor="shellfish">SHAAL EN SCHELPDIEREN</label>
                                </div>
                            </div>
                            <div className="select_item">
                                <div className="inputGroup">
                                    <input
                                        id="geen_allergie"
                                        name="check"
                                        type="checkbox"
                                        checked={geen_allergie}
                                        onChange={handleChange}
                                    />
                                    <label className="small" htmlFor="geen_allergie">GEEN ALLERGIE</label>
                                </div>
                            </div>
                        </div>
                        <div className="form_group-row d-flex justify-content-between">
                            <div className="form_group">
                                <input
                                    name="anders"
                                    type="text"
                                    className="form_input"
                                    placeholder="Anders"
                                    value={allergies_intolerances.anders}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="quiz_qa_footer nf_ftr d-flex align-items-center justify-content-between">
                        <div className="prev_btn"
                            onClick={(e) => {
                                e.preventDefault();
                                handleStepCount(7)
                            }}
                        >
                            <Link >
                                <img src="images/left_arrow.png" className="img-fluid" alt="" />
                            </Link>
                        </div>
                        <div className="nxt_btn"
                            onClick={(e) => {
                                e.preventDefault();
                                if (
                                    mosterd || selderij || sesam || 
                                    shellfish || anders || geen_allergie
                                ) {
                                    handleStepCount(9)
                                }
                            }}
                        >
                            <Link >
                                <span>DOORGAAN MET</span>
                                <img src="images/right_arrow.png" className="img-fluid" alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllergiesPage;