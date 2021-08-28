import React from 'react';
import { Link } from 'react-router-dom';


const JouwPage = (props) => {
	const { target, gender, handleOnChange, handleStepCount } = props;
	return (
		<div>
			<div className="quiz_qa jouw_doel">
				<div className="quiz_qa_head">
					<h3>Wat is jouw doel?</h3>
					<p>
						Beantwoord de volgende vragen om een persoonlijk<br />
						eetschema te maken
					</p>
				</div>
				<div className="quiz_qa_content">
					<div
						className="gndr_slct_wrap d-flex justify-content-between"
					>
						<div className="inputGroup gndr_slct jouw_slct_wrap">
							<input
								id="radio1"
								name="target"
								type="radio"
								checked={target === "weightLoss"}
								value="weightLoss"
								onChange={handleOnChange}
							/>
							<label htmlFor="radio1">
								<div className="jouw_doel_slct">
									<h3>AFVALLEN</h3>
									<p>Raak overtollige kilo’s kwijt</p>
								</div>
							</label>
						</div>
						<div className="inputGroup gndr_slct jouw_slct_wrap">
							<input
								id="radio2"
								name="target"
								type="radio"
								checked={target === "maintainWeight"}
								value="maintainWeight"
								onChange={handleOnChange}
							/>
							<label htmlFor="radio2">
								<div className="jouw_doel_slct">
									<h3>OP GEWICHT BLIJVEN</h3>
									<p>Eet voor een optimale gezondheid</p>
								</div>
							</label>
						</div>
						<div className="inputGroup gndr_slct jouw_slct_wrap">
							<input
								id="radio3"
								name="target"
								type="radio"
								checked={target === "buildMuscle"}
								value="buildMuscle"
								onChange={handleOnChange}
							/>
							<label htmlFor="radio3">
								<div className="jouw_doel_slct">
									<h3>AANKOMEN</h3>
									<p>Bouw spiermassa op</p>
								</div>
							</label>
						</div>
					</div>
				</div>
				<div
					className="quiz_qa_footer d-flex align-items-center justify-content-between"
				>
					<div
						className="prev_btn"
						onClick={e => {
							e.preventDefault();
							if (gender) { handleStepCount(1) }
						}}
					>
						<Link to="#"
							style={{ pointerEvents: gender === '' ? 'none' : '' }}
						>
							<img src="./images/left_arrow.png" className="img-fluid" alt="" />
						</Link>
					</div>
					<div
						className="nxt_btn"
						onClick={e => {
							e.preventDefault();
							if (target) { handleStepCount(3) }
						}}
					>
						<Link to="#" style={{ pointerEvents: target === '' ? 'none' : '' }} >
							<span>DOORGAAN MET</span>
							<img src="./images/right_arrow.png" className="img-fluid" alt="" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default JouwPage;
