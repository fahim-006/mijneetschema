import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BuyDietPlan from './BuyDietPlan';
import { Actions } from '../../Redux/Actions';
import fatPerWeekCount from './fat-perWeek-count';
// import DataTable from 'react-data-table-component';
import { 
   phyActivity_Value,
   weightLossBelow_10,
   weightLossGrt_10,
   buildMuscleBelow_10,
   buildMuscleGrt_10,
   elseStatement
} from './macardle-formula';
var moment = require('moment');

// const data = [
//     { id: 1, previous_weight: 73, current_week_weight: 73, previous_body_fat: 23, current_week_body_fat: 23, remaining_weeks: 12 },
//     { id: 2, previous_weight: 73, current_week_weight: 72, previous_body_fat: 23, current_week_body_fat: 22, remaining_weeks: 11 },
//     { id: 3, previous_weight: 72, current_week_weight: 71, previous_body_fat: 21, current_week_body_fat: 21, remaining_weeks: 10 }
// ];
// const columns = [
//   { name: 'Previous Weight', selector: 'previous_weight',},
//   { name: 'Current Weight', selector: 'current_week_weight',},
//   { name: 'Previous B/Fat', selector: 'previous_body_fat',},
//   { name: 'Current B/Fat', selector: 'current_week_body_fat',},
//   { name: 'Weeks to go', selector: 'remaining_weeks', right: true,},
// ];
class MacardleMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            // physical_activity: 1.5,
            weekDefecit: (1.2 * 7700),
            leanBodyMass: '',
            bodyFatKilo: '',
            basalMetabolic: '',    // This will be used as "BMRphysicalActivity" in new formula
            maintenanceDailyIntake: '',
            neededKcalOver: '',
            dailyPerfect: '',
            muscleGainKcal: '',
            resultStatement: '',
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().add(90, 'days').format('YYYY-MM-DD'),

            resultByWeek: [],
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            if (this.props) {
                this.setState({
                    data: this.props
                }, () => {
                    this.calculateDiet();
                });
            }
        }
    }

    calculateDiet = () => {
        const { gender } = this.state.data
        if (gender === 'Man')
            this.menDietCalculator();
        else if (gender === 'Vrouw')
            this.womenDietCalculator();
    }

    menDietCalculator = () => {
        const { data } = this.state;
        const { fat_percent } = data.personal_mesurement;
        //if gender == male then:
        if (fat_percent === 8) {
            const weekDefecit = 0.6 * 7700;
            this.setState({ weekDefecit });
        } else if (fat_percent > 8 && fat_percent <= 10) {
            const weekDefecit = 0.8 * 7700;
            this.setState({ weekDefecit });
        } else if (fat_percent > 10 && fat_percent <= 12) {
            const weekDefecit = 1 * 7700;
            this.setState({ weekDefecit });
        } else if (fat_percent > 12) {
            const weekDefecit = 1.2 * 7700;
            this.setState({ weekDefecit });
        }
        this.maintenanceDailyIntakeFun();
    }

    womenDietCalculator = () => {
        const { data } = this.state;
        const { fat_percent } = data.personal_mesurement;
        // if gender == female then:
        if (fat_percent <= 15) {
            const weekDefecit = 0.6 * 7700;
            this.setState({ weekDefecit });
        } else if (fat_percent > 15 && fat_percent <= 17) {
            const weekDefecit = 0.8 * 7700;
            this.setState({ weekDefecit });
        } else if (fat_percent > 17 && fat_percent <= 20) {
            const weekDefecit = 1 * 7700;
            this.setState({ weekDefecit });
        } else if (fat_percent > 20) {
            const weekDefecit = 1.2 * 7700;
            this.setState({ weekDefecit });
        }
        this.maintenanceDailyIntakeFun();
    }

    maintenanceDailyIntakeFun = () => {
        const { physical_activity } = this.state.data;
        const { current_weight, fat_percent } = this.state.data.personal_mesurement;
        let leanBodyMass = current_weight * (100 - fat_percent) / 100;
        let bodyFatKilo = current_weight - leanBodyMass;

        let basalMetabolic = 370 + (leanBodyMass * 21.6);

        let maintenanceDailyIntake = basalMetabolic * phyActivity_Value[physical_activity];

        this.setState({
            leanBodyMass: leanBodyMass,
            bodyFatKilo: bodyFatKilo,
            basalMetabolic: basalMetabolic,
            maintenanceDailyIntake: maintenanceDailyIntake
        }, () => {
            this.calculateFinalResults();
        });

    }

    muscleGainPerMonth = (gender) => {
        if (gender === "Man") {
            return 2.2;
        }
        else {
            return 1;
        }
    }

    calculateFinalResults = async () => {
        const { maintenanceDailyIntake, weekDefecit, basalMetabolic } = this.state;
        const { fat_percent } = this.state.data.personal_mesurement;
        const { target, physical_activity, gender } = this.state.data;
        const neededKcalOver = await this.muscleGainPerMonth(gender) * 1600;
        let dailyPerfect = (neededKcalOver / 30) + maintenanceDailyIntake;
        //**    
        //** Note: We will use "dailyPerfect" as "last_daily_calories" in new formula
        //**
        let muscleGainKcal_ = (dailyPerfect + 200 * (phyActivity_Value[physical_activity] / 1.7)).toFixed(2);

        this.setState({
            neededKcalOver: neededKcalOver,
            dailyPerfect: dailyPerfect,
            muscleGainKcal: muscleGainKcal_
        })

        //  AFVALLEN = TO LOSE WEIGHT (weightLoss),  ______ (target == "afvallen")
        //  stabiliteit = maintainWeight, (this will be in else part)
        //  aankomen = buildMuscle ____ (target == "GainMuscles")

      // For weight Loss change the formula 
      // From : ((maintenanceDailyIntake - weekDefecit)/7).toFixed(2) 
      // to maintenanceDailyIntake - (7000 * (resultByWeek[1].weekly_weight_loss) /7)

        if (target === "weightLoss" & fat_percent > 10) {
            this.setState({
                resultStatement: `Standaard dieet aanbevolen. Bestel jouw maaltijden. Aanbevolen calorieën per dag om af te vallen:` +((maintenanceDailyIntake - weekDefecit)/7).toFixed(2)+` calorieën.`
            })
        }
        else if (target === "weightLoss" & fat_percent <= 10) {
            this.setState({
                resultStatement: `Standaard dieet of Carb cycling aanbevolen. Bestel jouw maaltijden. Aanbevolen calorieën per dag om af te vallen:`+ ((maintenanceDailyIntake - weekDefecit)/7).toFixed(2) +` calorieën`
            })
        }
        else if (target === "buildMuscle" & fat_percent > 10) {
            this.setState({
                resultStatement: `Aanbevolen om eerst vet te verliezen. Benodigde calorieën voor spiermassa/lean bulken = ${muscleGainKcal_} calorieën per dag"`
            });
        }
        else if (target === "buildMuscle" & fat_percent <= 10) {
            this.setState({
                resultStatement: `Aankomen spiermassa / Lean bulk aanbevolen : ${muscleGainKcal_}`
            });
        }
        else {
            this.setState({
                resultStatement: `Standaard dieet aanbevolen`
            });
        }
        
        let weeklyResultArr = fatPerWeekCount(this.state.data, dailyPerfect, basalMetabolic, maintenanceDailyIntake);
        this.setState({ resultByWeek: weeklyResultArr });
    }

    render() {
        const { leanBodyMass, bodyFatKilo, basalMetabolic, maintenanceDailyIntake, resultStatement, startDate, endDate, resultByWeek, muscleGainKcal_ } = this.state;
        const { personal_mesurement, body_type, physical_activity, gender, target } = this.state.data && this.state.data;
        const { fat_percent } = this.state.data && this.state.data && this.state.data.personal_mesurement;
        return (
            <div>
                {leanBodyMass && bodyFatKilo && basalMetabolic &&
                    maintenanceDailyIntake && resultStatement ?
                    <div className="diet_plan_info">
                        <div className="dpi__list">
                            <h2 className="user_name">Hi <b>{personal_mesurement.name}</b></h2>
                            <div className="dpi__list_info_head">
                                 <h3>Jouw information</h3>
                              </div>
                              <div className="dpi__list_info">
                                 <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/icon_0.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Jouw Geslacht</h3>
                                                <p>({gender})</p>
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/hourglass.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Jouw leeftijd</h3>
                                                <p>({personal_mesurement.age})</p>
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/measurement.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Lengte </h3>
                                                <p>({personal_mesurement.length})</p>
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/scale.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Huidig gewicht </h3>
                                                <p>({personal_mesurement.current_weight})</p>
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
                                                <p>({body_type})</p>
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
                                                <p>({physical_activity})</p>
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="row justify-content-center">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/body__type.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Vet percentage </h3>
                                                <p>({personal_mesurement.fat_percent})</p>
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              {/* /////// */}
                              <div className="dpi__list_info_head">
                                 <h3>Jouw eetschema doelen</h3>
                              </div>
                              <div className="dpi__list_info schedule_bottom">
                                 <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/date.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Eetschema startdatum</h3>
                                                <p>{startDate}</p>
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/date.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Eetschema einddatum</h3>
                                                <p>{endDate}</p>
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/timer.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Aantal dagen</h3>
                                                <p>{
                                                    moment(`${endDate}`, 'YYYY-MM-DD').diff(moment(`${startDate}`, 'YYYY-MM-DD'), 'days')
                                                }</p>
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/scale.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Start gewicht</h3>
                                                <p>{personal_mesurement && personal_mesurement.current_weight}</p>
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/body-mass.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Start lean bodymass</h3>
                                                <p>{leanBodyMass + " Kilo "}</p>
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/fat.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Start vetpercentage</h3>
                                                <p>{personal_mesurement.fat_percent}</p>
                                                {/* <p>{bodyFatKilo + " Kilo "}</p> */}
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/metabolism.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Basaal- stofwisseling</h3>
                                                <p>{basalMetabolic.toFixed(2) + " calorieën per dag"}</p>
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/Maintenance.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Calorieën op gewicht blijven</h3>
                                                <p>{maintenanceDailyIntake.toFixed(2) + " calorieën per dag"}</p>
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/result2.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Jouw plan</h3>
                                                { target === "weightLoss" && fat_percent > 10 && resultByWeek && resultByWeek.length ?
                                                   <p>
                                                      {`${weightLossBelow_10}` + `${(maintenanceDailyIntake - (7000 * (resultByWeek[1].weekly_weight_loss) /7)).toFixed(2)}`+` calorieën.`}
                                                   </p>
                                                   :
                                                   target === "weightLoss" & fat_percent <= 10 && resultByWeek && resultByWeek.length ?
                                                   <p>
                                                      {`${weightLossGrt_10}` + `${(maintenanceDailyIntake - (7000 * (resultByWeek[1].weekly_weight_loss) /7)).toFixed(2)}` + ` calorieën`}
                                                   </p>
                                                   :
                                                   target === "buildMuscle" & fat_percent > 10 && resultByWeek && resultByWeek.length ?
                                                   <p>
                                                      {`${buildMuscleBelow_10}` + `${muscleGainKcal_}`+ `calorieën per dag`}
                                                   </p>
                                                   :
                                                   target === "buildMuscle" & fat_percent <= 10 && resultByWeek && resultByWeek.length ?
                                                   <p>
                                                      {`${buildMuscleGrt_10}` + `${muscleGainKcal_}` }
                                                   </p>
                                                   :
                                                   resultByWeek && resultByWeek.length ? <p>{`Standaard dieet aanbevolen`}</p> : null
                                                }
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/order-3.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                {/* <h3>Bestel Jouw Maaltijden</h3> */}
                                                <h3>Dagelijkse wateropname</h3>
                                                <p>{0.03*personal_mesurement.current_weight} Liter per dag</p>
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-30">
                                       <div className="calories_wrapper">
                                          <div className="calories_left d-flex align-items-center">
                                             <span className="icon_cal"><img src="/images/calories.png" className="img-fluid"/></span>
                                             <span className="cal_count">
                                                <h3>Aanbevolen calorieën per dag om af te vallen</h3>
                                                <p>{resultByWeek.length && `${(maintenanceDailyIntake - (7000 * (resultByWeek[1].weekly_weight_loss) /7)).toFixed(2)}`} calorieën</p>
                                                {/* maintenanceDailyIntake - (7000 * weekly_weight_loss /7) */}
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-30">
                                        <div className="calories_wrapper">
                                            <div className="calories_left d-flex align-items-center">
                                                <span className="icon_cal"><img src="/images/result2.png" className="img-fluid"/></span>
                                                <span className="cal_count">
                                                    {/* <h3>Bestel Jouw Maaltijden</h3> */}
                                                    <h3>Max haalbaar gewicht</h3>
                                                    <p>{resultByWeek.length && resultByWeek[(resultByWeek.length-2)].current_week_weight}</p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <BuyDietPlan method_name={"Macardle Method"} {...this.state}/>
                    </div>
                    :
                    <></>
                }
            </div >
        );
    }

}

const mapStateToProps = state => ({
    purchaseSuccess: state.Subscription.purchaseSuccess,
    payment_url: state.Subscription.payment_url,
    purchaseError: state.Subscription.purchaseError,
    purchaseErrMsg: state.Subscription.purchaseErrMsg,
});

const mapActionsToProps = dispatch =>
    bindActionCreators({
        buyDietPlan: Actions.dietPurchase,
    }, dispatch);

export default
    connect(
        mapStateToProps,
        mapActionsToProps
    )(MacardleMethod);
