import React, { Component } from 'react';
import BuyDietPlan from './BuyDietPlan';
import { phyActivity_Value } from './macardle-formula';
class RozaShingalMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            basalMetabolic: '',
            daily_maintenance: '',
            // physical_activity: 1.5,
            result: '',
            goal: ''
        };
    }

    // If bodyfat == blank (
    //     use placeholder text "Laat dit veld leeg als je dit niet (zeker) weet"
    //     ), 
    //     then use Roza and Shingal method else use katch macardle method
    //     Module Roza and shingal:

    // Male:
    // basalMetabolic= ((13.397 weight) + (4.799 length) – (5.677 * age)) + 88,362

    // Female:
    // basalMetabolic = ((9.247 weight) + (3.098 length) – (4.330 * age)) + 447.593


    // ---------------------------------------------------------------

    // AFVALLEN = TO LOSE WEIGHT (weightLoss),  stabiliteit = maintainWeight,  aankomen = buildMuscle
    // 1) IF goal is stabiliteit, then: Daily maintenance = basalMetabolic * physicalActivity
    // 2) IF goal is afvallen, then: Daily afvallen = Daily maintenance - 500
    // 3) IF goal is aankomen spiermassen, then: Daily aankomen = Daily maintenance + 500

    componentDidMount() {
        if (this.props) {
            this.setState({
                data: this.props
            }, () => {
                this.calculateDiet();
            });
        }
    }

    menDietCalculator = () => {
        const { data } = this.state;
        const { current_weight, length, age } = data.personal_mesurement;
        const { target, physical_activity } = data;
        const basalMetabolic = (88.362) + (((13.397) * parseFloat(current_weight)) + ((4.799) * parseFloat(length)) - ((5.677) * parseFloat(age)));
        this.finalResult(target, basalMetabolic, physical_activity);
    }

    womenDietCalculator = () => {
        const { data } = this.state;
        const { current_weight, length, age } = data.personal_mesurement;
        const { target, physical_activity } = data;
        const basalMetabolic = (447.593) + ((9.247 * parseFloat(current_weight)) + (3.098 * parseFloat(length)) - (4.330 * parseFloat(age)));
        this.finalResult(target, basalMetabolic, physical_activity);
    }

    finalResult = (target, basalMetabolic, physical_activity) => {
        if (target === 'maintainWeight') {
            // stabiliteit, Daily maintenance 
            const result = basalMetabolic * parseFloat(phyActivity_Value[physical_activity]);
            this.setState({
                basalMetabolic: basalMetabolic,
                result: result,
                goal: 'Daily maintenance',
                daily_maintenance: result
            });
            return result;
        }
        else if (target === 'buildMuscle') {
            // Daily aankomen
            const result = basalMetabolic * parseFloat(phyActivity_Value[physical_activity]) + 300;
            this.setState({
                basalMetabolic: basalMetabolic,
                result: result,
                goal: 'Daily aankomen',
                daily_maintenance: result
            });
            return result
        }
        else if (target === 'weightLoss') {
            // afvallen, (Daily afvallen)
            const result = basalMetabolic * parseFloat(phyActivity_Value[physical_activity]) - 300;
            this.setState({
                basalMetabolic: basalMetabolic,
                result: result,
                goal: 'Daily afvallen',
                daily_maintenance: result
            });
            return result
        }
    }

    calculateDiet = () => {
        const { gender } = this.state.data
        if (gender === 'Man')
            this.menDietCalculator();
        else if (gender === 'Vrouw')
            this.womenDietCalculator();
    }

    render() {
        const { basalMetabolic, result, goal } = this.state;
        const {data} = this.state;
        return (
            <div>
                {basalMetabolic && result ?
                    <div className="diet_plan_info">
                        <div className="dpi__list">
                        {data && data.personal_mesurement ?
                                <div>
                                <h2 className="user_name">Hi <b>{data.personal_mesurement.name}</b></h2>
                                <div className="dpi__list_info_head">
                                    <h3>Jouw informartie</h3>
                                </div>
                                <div className="dpi__list_info">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                            <div className="calories_wrapper">
                                                <div className="calories_left d-flex align-items-center">
                                                    <span className="icon_cal">
                                                        <img src="/images/icon_0.png" className="img-fluid"/>
                                                    </span>
                                                    <span className="cal_count">
                                                        <h3>Jouw Geslacht</h3>
                                                        <p>({data.gender})</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                            <div className="calories_wrapper">
                                                <div className="calories_left d-flex align-items-center">
                                                    <span className="icon_cal">
                                                        <img src="/images/hourglass.png" className="img-fluid"/>
                                                    </span>
                                                    <span className="cal_count">
                                                        <h3>Jouw leeftijd</h3>
                                                        <p>({data.personal_mesurement.age})</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                            <div className="calories_wrapper">
                                                <div className="calories_left d-flex align-items-center">
                                                    <span className="icon_cal">
                                                        <img src="/images/measurement.png" className="img-fluid"/>
                                                    </span>
                                                    <span className="cal_count">
                                                        <h3>Lengte </h3>
                                                        <p>({data.personal_mesurement.length})</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                            <div className="calories_wrapper">
                                                <div className="calories_left d-flex align-items-center">
                                                    <span className="icon_cal">
                                                        <img src="/images/scale.png" className="img-fluid"/>
                                                    </span>
                                                    <span className="cal_count">
                                                        <h3>Huidig gewicht </h3>
                                                        <p>({data.personal_mesurement.current_weight})</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                            <div className="calories_wrapper">
                                                <div className="calories_left d-flex align-items-center">
                                                    <span className="icon_cal"><img src="/images/body__type.png" className="img-fluid"/></span>
                                                    <span className="cal_count">
                                                        <h3>Body type </h3>
                                                        <p>({data.body_type})</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                            <div className="calories_wrapper">
                                                <div className="calories_left d-flex align-items-center">
                                                    <span className="icon_cal"><img src="/images/icon_2.png" className="img-fluid"/></span>
                                                    <span className="cal_count">
                                                        <h3>Fysieke Activiteit </h3>
                                                        <p>({data.physical_activity})</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="row justify-content-center">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                            <div className="calories_wrapper">
                                                <div className="calories_left d-flex align-items-center">
                                                    <span className="icon_cal"><img src="/images/body__type.png" className="img-fluid"/></span>
                                                    <span className="cal_count">
                                                        <h3>Vet percentage </h3>
                                                        <p>(20)</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="dpi__list_info_head">
                                    <h3>Jouw eetschema doelen</h3>
                                </div>
                                <div className="dpi__list_info schedule_bottom">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-30">
                                            <div className="calories_wrapper">
                                                <div className="calories_left d-flex align-items-center">
                                                    <span className="icon_cal"><img src="/images/order-3.png" className="img-fluid"/></span>
                                                    <span className="cal_count">
                                                        <h3>Jouw doelstelling</h3>
                                                        <p>{goal}</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-30">
                                            <div className="calories_wrapper">
                                                <div className="calories_left d-flex align-items-center">
                                                    <span className="icon_cal"><img src="/images/metabolism.png" className="img-fluid"/></span>
                                                    <span className="cal_count">
                                                        <h3>Basaal- stofwisseling</h3>
                                                        <p>{basalMetabolic.toFixed(2)}</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-30">
                                            <div className="calories_wrapper">
                                                <div className="calories_left d-flex align-items-center">
                                                    <span className="icon_cal"><img src="/images/result2.png" className="img-fluid"/></span>
                                                    <span className="cal_count">
                                                        <h3>Caloriebehoefte per dag</h3>
                                                        <p>{result.toFixed(2)}</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                            <div className="calories_wrapper">
                                                <div className="calories_left d-flex align-items-center">
                                                    <span className="icon_cal"><img src="/images/order-3.png" className="img-fluid"/></span>
                                                    <span className="cal_count">
                                                        {/* <h3>Bestel Jouw Maaltijden</h3> */}
                                                        <h3>Dagelijkse wateropname</h3>
                                                        <p>{0.03*data.personal_mesurement.current_weight} Liter per dag</p>
                                                    </span>
                                                </div>
                                            </div>
                                       </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <></>
                        }
                        <BuyDietPlan method_name={"Roza and Shingal method"} {...this.state}/>
                        </div>
                    </div>
                    :
                    <></>
                }
            </div >
        )
    }

}

export default RozaShingalMethod;
