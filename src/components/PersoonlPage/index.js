import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class PersoonlPage extends Component {
	constructor(props) {
		super();
		this.state={
			errors: [],
		}
	}

	isValid = (e) => {
		const { name, length, age, current_weight, target_weight, email } = this.props.personal_mesurement;
		const regexTest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        let error = {};
		let isFormValid = true;
		
		if ( name === '') {
            isFormValid = false;
            error['name'] = "*Vul jouw naam in";
		}
		if ( age === '') {
            isFormValid = false;
            error['age'] = "*Vul jouw leeftijd in";
		}
		if ( length === '') {
            isFormValid = false;
            error['lengthh'] = "*Vul jouw lengte in centimers in";
		}
		if ( current_weight === '') {
            isFormValid = false;
            error['current_weight'] = "*Vul jouw huidige gewicht in";
		}
		if ( target_weight === '') {
            isFormValid = false;
            error['target_weight'] = "*Vul jouw gewenste gewicht in";
		}
		if ( email === '') {
            isFormValid = false;
            error['email'] = "*Vul jouw email in";
		}
		if ( email && regexTest.test(email) === false ) {
            isFormValid = false;
            error['email'] = "*Vul een geldige email in";
        }
		this.setState({ errors: error });
        return isFormValid;
	}

	render() {
		const { personal_mesurement, handleChange, handleStepCount, handleSubmitDetails } = this.props;
		const { name, fat_percent, length, current_weight, target_weight, email, age } = personal_mesurement;
		const { errors } = this.state;
		return (
			<div>
				<div className="quiz_qa metingen">
					<div className="quiz_qa_head">
						<h3>Jouw persoonlijke gegevens</h3>
					</div>
					<div className="quiz_qa_content">
						<div className="form_group-row d-flex justify-content-between">
							<div className="form_group">
								<input
									name="name"
									className="form_input"
									placeholder="*NAAM"
									value={personal_mesurement.name}
									onChange={handleChange}
								/>
							<p className="error_mesage"> {errors.name} </p>
							</div>

							<div className="form_group">
								{/* Enter you age */}
								<input
									name="age"
									className="form_input"
									placeholder="*JOUW LEEFTIJD"
									value={personal_mesurement.age}
									onChange={handleChange}
								/>
							<p className="error_mesage"> {errors.age} </p>
							</div>

							<div className="form_group">
								<input
									name="fat_percent"
									className="form_input"
									placeholder="Vet percentage (Laat dit veld leeg als je dit niet '(zeker)' weet)!!!"
									value={personal_mesurement.fat_percent}
									onChange={handleChange}
								/>
								<p className="error_mesage"></p>
							</div>
							
							<div className="form_group">
								<input
									name="length"
									className="form_input"
									placeholder="*LENGTE"
									value={personal_mesurement.length}
									onChange={handleChange}
								/>
								<span className="unit">cm</span>
							<p className="error_mesage"> {errors.lengthh} </p>
							</div>

							<div className="form_group">
								<input
									name="current_weight"
									className="form_input"
									placeholder="*HUIDIG GEWICHT"
									value={personal_mesurement.current_weight}
									onChange={handleChange}
								/>
								<span className="unit">kg</span>
							<p className="error_mesage"> {errors.current_weight} </p>
							</div>
							
							<div className="form_group">
								<input
									name="target_weight"
									className="form_input"
									placeholder="*STREEFGEWICHT"
									value={personal_mesurement.target_weight}
									onChange={handleChange}
								/>
								<span className="unit">kg</span>
							<p className="error_mesage"> {errors.target_weight} </p>
							</div>

							<div className="form_group">
								<input
									name="email"
									type="email"
									className="form_input"
									placeholder="*EMAIL"
									onChange={handleChange}
								/>
							<p className="error_mesage"> {errors.email} </p>
							</div>
						</div>
					</div>
					<div className="quiz_qa_footer nf_ftr d-flex align-items-center justify-content-between">
						<div className="prev_btn"
							onClick={(e) => {
								e.preventDefault();
								handleStepCount(8)
							}}
						>
							<Link to="#" >
								<img src="./images/left_arrow.png" className="img-fluid" alt="" />
							</Link>
						</div>
						<div className="nxt_btn"
							onClick={(e) => {
								e.preventDefault();
								if(this.isValid()){
									handleSubmitDetails();
									handleStepCount(9)
								}
							}}
						>
							<Link to="#"><span>DOORGAAN MET</span>
								<img src="./images/right_arrow.png" className="img-fluid" alt="" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default PersoonlPage;
