import React, { Component } from 'react';
import FirstStep from './FirstStep'
import StepperComponent from './Stepper';
import JouwPage from '../JouwPage';
import FysiekePage from '../FysiekePage';
import VleesPage from '../VleesPage';
import SelecteerPage from '../SelecteerPage';
import FruitPage from '../FruitPage';
import OverigePage from '../OverigePage';
import PersoonlPage from '../PersoonlPage';
import AllergiesPage from '../Allergies';
import PopupLayout from '../../layouts/PopupLayout';
import CalculationResult from '../CalculationResult';
import { createNotification } from '../../helpers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../Redux/Actions';
import FinishSteps from '../FinishSteps';
import BodyType from '../BodyType';
import Loader from '../Loader/loader';
const URL_CHECK = process.env.REACT_APP_API_URL;
let requestbody = '';


class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gender: '',
			target: '',
			physicalActivity: "",
			meat_products: {
				kip: true,
				kalkoen: true,
				rundvlees: true,
				gehakt: true,
				vis: true,
				geen_vlees: false,
			},
			vegetables: {
				paprika: true,
				snijbonen: true,
				spitskool: true,
				mixgroente: true,
				broccoli: true,
				kouseband: true,
				Spinazie: true
			},
			fruits: {
				mandarijnen: true,
				grapefruit: true,
				appel: true,
				blauwebes: true,
				banana: true,
				addrdbeien: true,
				ananas: true,
				sinassappeal: true,
				mango: true
			},
			other_products: {
				el: true,
				tofu: true,
				noten: true,
				sojamilk: true,
				yoghurt: true,
				tempeh: true,
				kaas: true,
				kwark: true
			},
			allergies_intolerances: {
				mosterd: false,
				selderij: false,
				sesam: false,
				shellfish: false,
				anders: "",
				geen_allergie: true,
			},
			personal_mesurement: {
				name: '',
				fat_percent: '',
				length: '',
				current_weight: '',
				target_weight: '',
				age: '',
				email: '',
			},
			stepCount: 1,
			finalStep: false,
			body_type: '',
			startCalculation: false,
			loading: false,
		};
	}
	componentDidMount() {
		if (this.props && this.props.location && this.props.location.state) {
			const { gender } = this.props.location.state;
			this.setState({
				gender: gender
			})
		}
	}

	handleStepCount = (val) => {
		this.setState({
			stepCount: val
		});
	}

	handleOnChange = (e) => {
		this.setState({
			// gender: e.target.value
			[e.target.name]: e.target.value
		});
	}

	handleVleesSelection = (e) => {
		let meat_products = this.state.meat_products;
		this.setState({
			meat_products: {
				...meat_products,
				[e.target.name]: e.target.checked
			}
		});
	}

	handleSelecteerChange = (e) => {
		let vegetables = this.state.vegetables;
		this.setState({
			vegetables: {
				...vegetables,
				[e.target.id]: e.target.checked
			}
		});
	}

	handleFruitSelection = (e) => {
		let fruits = this.state.fruits;
		this.setState({
			fruits: {
				...fruits,
				[e.target.id]: e.target.checked
			}
		});
	}

	handleOtherProdSelection = (e) => {
		let other_products = this.state.other_products;
		this.setState({
			other_products: {
				...other_products,
				[e.target.id]: e.target.checked
			}
		});
	}

	handleAllergiesSelection = (e) => {
		let allergies_intolerances = this.state.allergies_intolerances;
		if (e.target.name === "anders") {
			this.setState({
				allergies_intolerances: {
					...allergies_intolerances,
					[e.target.name]: e.target.value
				}
			});
		} else {
			this.setState({
				allergies_intolerances: {
					...allergies_intolerances,
					[e.target.id]: e.target.checked
				}
			});
		}
	}

	handlePersonalDetails = (e) => {
		let val = e.target.value;
		let personal_mesurement = this.state.personal_mesurement;
		this.setState({
			personal_mesurement: {
				...personal_mesurement,
				[e.target.name]: e.target.value
			}
		});
	}

	handleSubmitDetails = async () => {
		const { gender, target, physicalActivity,
			meat_products, vegetables, fruits, other_products,
			allergies_intolerances, personal_mesurement, body_type
		} = this.state;

		requestbody = {
			gender, target, physical_activity: physicalActivity,
			meat_products, vegetables, fruits, body_type,
			other_products, allergies_intolerances, personal_mesurement
		}
		await fetch(`${process.env.REACT_APP_API_URL}/users/leaddata`, {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestbody),
			})
			.then(response => response.json())
			.then(data => {
			console.log('Success:', data);
			})
			.catch((error) => {
			console.error('Error:', error);
			});
		this.setState({
			startCalculation: true
		});

		// this.props.calculateDiet(requestbody);
	}

	componentDidUpdate() {
		if (this.props.success && this.props.message && this.state.loading) {
			// createNotification('success', this.props.message);
			// this.setState({
			// 	loading: false,
			// 	startCalculation: true
			// });
		} else if (this.props.error && this.props.message) {
			createNotification('error', this.props.message);
		}

		// Reset States after Click on Re-Calculate button
		if(this.props.reCalculateState){
			requestbody = '';
			this.setState({
				gender: '',
				target: '',
				physicalActivity: "",
				stepCount: 1,
				finalStep: false,
				body_type: '',
				startCalculation: false,
				personal_mesurement: {
					name: '',
					fat_percent: '',
					length: '',
					current_weight: '',
					target_weight: '',
					age: '',
					email: '',
				},
			}, () => {
				this.props.setReCalculateDiet();
			});
		}
	}
	
	handleBodyType = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		const { gender, stepCount, startCalculation, loading } = this.state;
		const currentLocation = window.location.pathname;
		return (
			<PopupLayout>
				<div>
					{/**banner section start */}
					<div className="banner_sec">
						<div className="container">
							<div className="col-12">
								<div className={startCalculation ? "quiz_wrap diet_modal_main" : "quiz_wrap"}>
									<div className="banner_txt d-flex">
										<div className="banr_headng">
											Mijn<br />Eetschema
										</div>
										<div className="banr_image">
											<img src="./images/banner.png" className="" alt="" />
										</div>
									</div>

									{/* Conditional rendering of steps */}
									{loading ?
										<Loader smaller={'small'}/>
										:
										<>
											{startCalculation ?
												// <FinishSteps {...requestbody}/>
												<CalculationResult />
												:
												stepCount === parseInt(1) ?
													// Select gender
													<FirstStep
														gender={gender}
														handleOnChange={this.handleOnChange}
														handleStepCount={this.handleStepCount}
													/>
													:
													stepCount === parseInt(2) ?
														// Select target
														<JouwPage
															{...this.state}
															handleOnChange={this.handleOnChange}
															handleStepCount={this.handleStepCount}
														/>
														:
														stepCount === parseInt(3) ?
															// Select Weekly Activities
															<FysiekePage
																{...this.state}
																handleChange={this.handleOnChange}
																handleStepCount={this.handleStepCount}
															/>
															:
															stepCount === parseInt(4) ?
																// Select Meat Products
																<VleesPage
																	{...this.state}
																	handleChange={this.handleVleesSelection}
																	handleStepCount={this.handleStepCount}
																/>
																:
																stepCount === parseInt(5) ?
																	// Select Vegetables
																	<SelecteerPage
																		{...this.state}
																		handleChange={this.handleSelecteerChange}
																		handleStepCount={this.handleStepCount}
																	/>
																	:
																	stepCount === parseInt(6) ?
																		// Select Fruits 
																		<FruitPage
																			{...this.state}
																			handleChange={this.handleFruitSelection}
																			handleStepCount={this.handleStepCount}
																		/>
																		:
																		stepCount === parseInt(7) ?
																			// Select Other Products
																			<OverigePage
																				{...this.state}
																				handleChange={this.handleOtherProdSelection}
																				handleStepCount={this.handleStepCount}
																			/>
																			:
																			stepCount === parseInt(8) ?
																				// Allergies Products
																				<AllergiesPage
																					{...this.state}
																					handleChange={this.handleAllergiesSelection}
																					handleStepCount={this.handleStepCount}
																				/>
																				:
																				stepCount === parseInt(9) ?
																					// Personal Details
																					<PersoonlPage
																						{...this.state}
																						handleChange={this.handlePersonalDetails}
																						handleStepCount={this.handleStepCount}
																						handleSubmitDetails={this.handleSubmitDetails}
																					/>
																					:
																					stepCount === parseInt(10) ?
																					<BodyType
																						body_type={this.state.body_type}
																						handleBodyType={this.handleBodyType}
																						handleStepCount={this.handleStepCount}
																						handleSubmitDetails={this.handleSubmitDetails}
																					/>
																					:
																					<FirstStep
																						gender={gender}
																						handleChange={this.handleOnChange}
																						handleStepCount={this.handleStepCount}
																					/>
											}
											{/* Conditional rendering of steps end */}
										</>
									}
								</div>
							</div>
						</div>
					</div>
					{/**banner section end */}

					{/* Stepper section start */}
					{  stepCount !== parseInt(9) && !this.props.success ?
						<StepperComponent
							{...this.state}
							currentLocation={stepCount}
							handleStepCount={this.handleStepCount}
						/>
						:
						<></>
					}
					{/* Stepper section end */}

				</div>
			</PopupLayout>
		)
	}
}

const mapStateToProps = state => ({
	success: state.Calculator.success,
	// success: true,
	error: state.Calculator.error,
	message: state.Calculator.message,
	reCalculateState: state.Calculator.reCalculateState
});

const mapActionsToProps = dispatch =>
	bindActionCreators({
		calculateDiet: Actions.calculatorRequest,
		setReCalculateDiet: Actions.setReCalculateDiet,
	}, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(HomePage);
