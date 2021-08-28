import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class FysiekePage extends Component {
	constructor(props) {
		super(props);
	}

	// handleChange = (e) => {
	// 	let val = e.target.value;
	// 	this.setState({
	// 		[e.target.name]: e.target.checked
	// 	});
	// }

	render() {
		const { target, physicalActivity, handleChange, handleStepCount } = this.props;
		return (
			<div>
				<div className="quiz_qa steps_slct activity_step">
					<div className="quiz_qa_head">
						<h3>FYSIEKE ACTIVITEIT</h3>
					</div>
					<div className="quiz_qa_content">
						<div className="check_multiple d-flex justify-content-between">
							<div className="select_item">
								<div className="inputGroup">
									<input
										id="check1"
										name="physicalActivity"
										type="radio"
										checked={physicalActivity === "Geen tot weinig beweging, of kantoor werk"}
										value="Geen tot weinig beweging, of kantoor werk"
										onChange={handleChange}
									/>
									<label htmlFor="check1">
										Geen tot weinig beweging, of kantoor werk
									</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="check2"
										name="physicalActivity"
										type="radio"
										checked={physicalActivity === "1-3 x per week sporten + kantoor werk"}
										value="1-3 x per week sporten + kantoor werk"
										onChange={handleChange}
									/>
									<label htmlFor="check2">
										1-3 x per week sporten + kantoor werk
									</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="check3"
										name="physicalActivity"
										type="radio"
										checked={physicalActivity === "1-3 x per week sporten + actief werk"}
										value="1-3 x per week sporten + actief werk"
										onChange={handleChange}
									/>
									<label htmlFor="check3">
										1-3 x per week sporten + actief werk
									</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="check4"
										name="physicalActivity"
										type="radio"
										checked={physicalActivity === "3-5 x per week sporten/ atleet + kantoor werk"}
										value="3-5 x per week sporten/ atleet + kantoor werk"
										onChange={handleChange}
									/>
									<label htmlFor="check4">
										3-5 x per week sporten/ atleet + kantoor werk
									</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="check5"
										name="physicalActivity"
										type="radio"
										checked={physicalActivity === "3-5 x per week sporten/ atleet + actief werk"}
										value="3-5 x per week sporten/ atleet + actief werk"
										onChange={handleChange}
									/>
									<label htmlFor="check5">
										3-5 x per week sporten/ atleet + actief werk
									</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="check6"
										name="physicalActivity"
										type="radio"
										checked={physicalActivity === "6-7 x per week sporten/ atleet"}
										value="6-7 x per week sporten/ atleet"
										onChange={handleChange}
									/>
									<label htmlFor="check6">
										6-7 x per week sporten/ atleet
									</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="check7"
										name="physicalActivity"
										type="radio"
										checked={physicalActivity === "7 x per week sporten + zwaar werk"}
										value="7 x per week sporten + zwaar werk"
										onChange={handleChange}
									/>
									<label htmlFor="check7">
										7 x per week sporten + zwaar werk
									</label>
								</div>
							</div>

						</div>
					</div>
					<div className="quiz_qa_footer nf_ftr d-flex align-items-center justify-content-between">
						<div
							className="prev_btn"
							onClick={(e) => {
								e.preventDefault();
								if (target) {
									handleStepCount(2);
								}
							}}
						>
							<Link to="/">
								<img src="./images/left_arrow.png" className="img-fluid" alt="" />
							</Link>
						</div>
						<div
							className="nxt_btn"
							onClick={(e) => {
								e.preventDefault();
								if (physicalActivity) {
									handleStepCount(4);
								}
							}}
						>
							<Link >
								<span>DOORGAAN MET</span>
								<img src="./images/right_arrow.png" className="img-fluid" alt="" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default FysiekePage;
