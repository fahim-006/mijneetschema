import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class SelecteerPage extends Component {
	constructor(props) {
		super();
	}

	render() {
		const { vegetables, handleChange, handleStepCount } = this.props;
		const { paprika, snijbonen, spitskool, mixgroente, broccoli, kouseband, Spinazie } = vegetables;

		return (
			<div>
				<div className="quiz_qa steps_slct overige-producten-step jouw-groente">
					<div className="quiz_qa_head">
						<h3>Selecteer jouw groente</h3>
					</div>
					<div className="quiz_qa_content">
						<div className="check_multiple d-flex justify-content-between">
							<div className="select_item">
								<div className="inputGroup">
									<input
										id="paprika"
										name="check"
										type="checkbox"
										checked={paprika}
										onChange={handleChange}
									/>
									<label htmlFor="paprika">PAPRIKA</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="snijbonen"
										name="check"
										type="checkbox"
										checked={snijbonen}
										onChange={handleChange}
									/>
									<label htmlFor="snijbonen">SNIJBONEN</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="spitskool"
										name="check"
										type="checkbox"
										checked={spitskool}
										onChange={handleChange}
									/>
									<label htmlFor="spitskool">SPITSKOOL</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="mixgroente"
										name="check"
										type="checkbox"
										checked={mixgroente}
										onChange={handleChange}
									/>
									<label htmlFor="mixgroente">MIXGROENTE</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="broccoli"
										name="check"
										type="checkbox"
										checked={broccoli}
										onChange={handleChange}
									/>
									<label htmlFor="broccoli">BROCCOLI</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="kouseband"
										name="check"
										type="checkbox"
										checked={kouseband}
										onChange={handleChange}
									/>
									<label htmlFor="kouseband">KOUSEBAND</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="Spinazie"
										name="Spinazie"
										type="checkbox"
										checked={Spinazie}
										onChange={handleChange}
									/>
									<label htmlFor="Spinazie">SPINAZIE</label>
								</div>
							</div>

						</div>
					</div>
					<div className="quiz_qa_footer nf_ftr d-flex align-items-center justify-content-between">
						<div
							className="prev_btn"
							onClick={(e) => {
								e.preventDefault();
								handleStepCount(4)
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
								if (
									paprika || snijbonen || spitskool ||
									mixgroente || broccoli || kouseband ||
									Spinazie
								) {
									handleStepCount(6)
								}
							}}
						>
							<Link ><span>DOORGAAN MET</span>
									<img src="./images/right_arrow.png" className="img-fluid" alt="" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SelecteerPage;
