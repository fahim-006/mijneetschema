import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class VleesPage extends Component {
	constructor(props) {
		super();
	}


	render() {
		const { handleChange, handleStepCount, meat_products } = this.props;
		const { kip, kalkoen, rundvlees, gehakt, vis, geen_vlees } = meat_products;

		return (
			<div>
				<div className="quiz_qa steps_slct jouw-vleesproducten">
					<div className="quiz_qa_head">
						<h3>Selecteer jouw (eiwit)producten</h3>
					</div>
					<div className="quiz_qa_content">
						<div className="check_multiple d-flex justify-content-between">
							<div className="select_item">
								<div className="inputGroup">
									<input
										id="kip"
										name="kip"
										type="checkbox"
										checked={kip}
										onChange={handleChange}
									/>
									<label htmlFor="kip">KIP</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="kalkoen"
										name="kalkoen"
										type="checkbox"
										checked={kalkoen}
										onChange={handleChange}
									/>
									<label htmlFor="kalkoen">KALKOEN</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="rundvlees"
										name="rundvlees"
										type="checkbox"
										checked={rundvlees}
										onChange={handleChange}
									/>
									<label htmlFor="rundvlees">RUNDVLEES</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="gehakt"
										name="gehakt"
										type="checkbox"
										checked={gehakt}
										onChange={handleChange}
									/>
									<label htmlFor="gehakt">GEHAKT</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="vis"
										name="vis"
										type="checkbox"
										checked={vis}
										onChange={handleChange}
									/>
									<label htmlFor="vis">VIS</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="geen_vlees"
										name="geen_vlees"
										type="checkbox"
										checked={geen_vlees}
										onChange={handleChange}
									/>
									<label htmlFor="geen_vlees">GEEN VLEES</label>
								</div>
							</div>

						</div>
					</div>
					<div
						className="quiz_qa_footer nf_ftr d-flex align-items-center justify-content-between"
					>
						<div className="prev_btn"
							onClick={(e) => {
								e.preventDefault();
								handleStepCount(3)
							}}
						>
							<Link to="#">
								<img src="./images/left_arrow.png" className="img-fluid" alt="" />
							</Link>
						</div>
						<div
							className="nxt_btn"
							onClick={(e) => {
								e.preventDefault();
								if (
									kip || kalkoen || rundvlees ||
									gehakt || vis || geen_vlees
								) {
									handleStepCount(5)
								}
							}}
						>
							<Link to="#">
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

export default VleesPage;
