import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class FruitPage extends Component {
	constructor(props) {
		super();
	}

	render() {
		const { fruits, handleChange, handleStepCount } = this.props;
		const { mandarijnen, grapefruit, appel, blauwebes, banana, addrdbeien, ananas, sinassappeal, mango } = fruits;

		return (
			<div>
				<div className="quiz_qa steps_slct fruit_step">
					<div className="quiz_qa_head">
						<h3>KLIK JOUW GEWENSTE FRUIT OP TE NEMEN :</h3>
					</div>
					<div className="quiz_qa_content">
						<div className="check_multiple d-flex justify-content-between">
							<div className="select_item">
								<div className="inputGroup">
									<input
										id="mandarijnen"
										name="check"
										type="checkbox"
										checked={mandarijnen}
										onChange={handleChange}
									/>
									<label htmlFor="mandarijnen">MANDARIJNEN</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="grapefruit"
										name="check"
										type="checkbox"
										checked={grapefruit}
										onChange={handleChange}
									/>
									<label htmlFor="grapefruit">GRAPEFRUIT</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="appel"
										name="check"
										type="checkbox"
										checked={appel}
										onChange={handleChange}
									/>
									<label htmlFor="appel">APPEL</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="blauwebes"
										name="check"
										type="checkbox"
										checked={blauwebes}
										onChange={handleChange}
									/>
									<label htmlFor="blauwebes">BLAUWE BES</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="banana"
										name="check"
										type="checkbox"
										checked={banana}
										onChange={handleChange}
									/>
									<label htmlFor="banana">BANAAN</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="addrdbeien"
										name="check"
										type="checkbox"
										checked={addrdbeien}
										onChange={handleChange}
									/>
									<label htmlFor="addrdbeien">AARDBEIEN</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="ananas"
										name="check"
										type="checkbox"
										checked={ananas}
										onChange={handleChange}
									/>
									<label htmlFor="ananas">ANANAS</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="sinassappeal"
										name="check"
										type="checkbox"
										checked={sinassappeal}
										onChange={handleChange}
									/>
									<label htmlFor="sinassappeal">SINASSAPPEL</label>
								</div>
							</div>

							<div className="select_item">
								<div className="inputGroup">
									<input
										id="mango"
										name="check"
										type="checkbox"
										checked={mango}
										onChange={handleChange}
									/>
									<label htmlFor="mango">MANGO</label>
								</div>
							</div>
						</div>
					</div>
					<div
						className="quiz_qa_footer nf_ftr d-flex align-items-center justify-content-between"
					>
						<div
							className="prev_btn"
							onClick={(e) => {
								e.preventDefault();
								handleStepCount(5)
							}}
						>
							<Link >
								<img src="./images/left_arrow.png" className="img-fluid" alt="" />
							</Link>
						</div>
						<div className="nxt_btn"
							onClick={(e) => {
								e.preventDefault();
								if (
									mandarijnen || grapefruit || appel ||
									blauwebes || addrdbeien || ananas ||
									sinassappeal || mango || banana
								) { handleStepCount(7) }
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

export default FruitPage;
