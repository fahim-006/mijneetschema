import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class OverigePage extends Component {
	constructor(props) {
		super();
	}

	render() {
		const { other_products, handleChange, handleStepCount } = this.props;
		const { el, tofu, noten, sojamilk, yoghurt, tempeh, kaas, kwark } = other_products;

		return (
			<div>
				<div className="quiz_qa steps_slct overige-producten-step">
					<div className="quiz_qa_head">
						<h3>KLIK OM DE GEWENSTE PRODUCTEN OP TE NEMEN :</h3>
					</div>
					<div className="quiz_qa_content">
						<div className="check_multiple d-flex justify-content-between">
							<div className="select_item">
								<div className="inputGroup">
									<input
										id="el"
										name="check"
										type="checkbox"
										checked={el}
										onChange={handleChange}
									/>
									<label htmlFor="el">Ei</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="tofu"
										name="check"
										type="checkbox"
										checked={tofu}
										onChange={handleChange}
									/>
									<label htmlFor="tofu">TOFU</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="noten"
										name="check"
										type="checkbox"
										checked={noten}
										onChange={handleChange}
									/>
									<label htmlFor="noten">NOTEN</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="sojamilk"
										name="check"
										type="checkbox"
										checked={sojamilk}
										onChange={handleChange}
									/>
									<label htmlFor="sojamilk">SOJA MELK</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="yoghurt"
										name="check"
										type="checkbox"
										checked={yoghurt}
										onChange={handleChange}
									/>
									<label htmlFor="yoghurt">YOGHURT</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="tempeh"
										name="check"
										type="checkbox"
										checked={tempeh}
										onChange={handleChange}
									/>
									<label htmlFor="tempeh">TEMPEH</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="kaas"
										name="check"
										type="checkbox"
										checked={kaas}
										onChange={handleChange}
									/>
									<label htmlFor="kaas">KAAS</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="kwark"
										name="check"
										type="checkbox"
										checked={kwark}
										onChange={handleChange}
									/>
									<label htmlFor="kwark">KWARK</label>
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
								handleStepCount(6)
							}}
						>
							<Link >
								<img src="./images/left_arrow.png" className="img-fluid" alt="" />
							</Link>
						</div>
						<div
							className="nxt_btn"
							onClick={(e) => {
								e.preventDefault();
								if (
									el || tofu || noten ||
									sojamilk || yoghurt ||
									tempeh || kaas || kwark
								) { handleStepCount(8) }
							}}
						>
							<Link >
								<span>DOORGAAN MET</span>
								<img src="./images/right_arrow.png" className="img-fluid" alt="" />
							</Link>
						</div>
					</div>
				</div>
			</div >
		)
	}
}

export default OverigePage;
