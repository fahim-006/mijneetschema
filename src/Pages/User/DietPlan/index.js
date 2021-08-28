import React, { Component } from "react";
import UserDashboardLayout from "../../../layouts/UserDashboardLayout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../../Redux/Actions";
import { initializeSocketList, respondToRequest } from "../../../socket";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { createNotification } from "../../../helpers";
import fatPerWeekCount from '../../../components/DietCalculator/fat-perWeek-count';

const columns = [
  { name: 'Previous Weight', selector: 'previous_weight', center: true,},
  { name: 'Current Weight', selector: 'current_week_weight', center: true,},
  { name: 'Weekly Weight Loss', selector: 'weekly_weight_loss', center: true,},
  { name: 'Previous B/Fat', selector: 'previous_body_fat', center: true,},
  { name: 'Current B/Fat', selector: 'current_week_body_fat', center: true,},
  { name: 'Weeks to go', selector: 'remaining_weeks', center: true,},
];

class DietPlanPage extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
    }

    componentDidMount(){
        this.props.getCalculations();
    }

    componentDidUpdate(prevProps, prevState){
        let prps = this.props;
        if(prps.get_calc_success && (prevProps.calc_data !== prps.calc_data)){
            let result=prps.calc_data[prps.calc_data.length-1]
            if(result){
                createNotification('success', 'Congratulations, your weekly plan is ready');
                const data = fatPerWeekCount(result,result.dailyPerfect,result.basalMetabolic)
                this.setState({data:data})
            }else{
                createNotification('info', 'Sorry!, No chart available regarding the details provided by you!');
            }
        }
    }

    render(){
        return(
            <UserDashboardLayout>
                <div className="trnr_nav_cntnt">
                    <div className="adprdct_nav_iner">
                        <h2>Mijn eetschema</h2>
                        <div class="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                <div className="calories_wrapper">
                                    <div className="calories_left d-flex align-items-center">
                                        <span className="icon_cal">
                                            <img src="/images/burn.png" className="img-fluid"/>
                                        </span>
                                        <span className="cal_count">
                                            <h3>1745 Calories</h3>
                                            <p>Cost:$59</p>
                                        </span>
                                    </div>
                                </div>

                                {/* DietPlan Table */}
                                <div className="diet_meal_wrap extra_food">
                                    <div className="diet_meal-head">
                                        <h3>Diet Plan Weekly Chart</h3>
                                    </div>
                                    <DataTable
                                        // title="Weekly Chart"
                                        columns={columns}
                                        data={this.state.data}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-7">
                                
                                {/* <!----==========meal list item========----> */}
                                <div className="diet_meal_wrap">
                                    <div className="diet_meal-head">
                                        <h3>Breakfast</h3>
                                    </div>
                                    <div className="diet_meal-content">
                                        <ul>
                                            <li>
                                                <span className="d-flex align-items-center meal_name"><i className="fa fa-check-circle" aria-hidden="true"></i> Beef and Avocado Wrap</span>
                                            </li>
                                            <li>
                                                <span className="d-flex align-items-center meal_name"><i className="fa fa-check-circle" aria-hidden="true"></i> Healthified Bean and Salsa Chicken Wrap </span>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                                {/* <!----==========meal list item========----> */}
                                <div className="diet_meal_wrap">
                                    <div className="diet_meal-head">
                                        <h3>AM Snack</h3>
                                    </div>
                                    <div className="diet_meal-content">
                                        <ul>
                                            <li>
                                                <span className="d-flex align-items-center meal_name"><i className="fa fa-check-circle" aria-hidden="true"></i> Fat-Free Milk for 1 </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!----==========meal list item========----> */}
                                <div className="diet_meal_wrap">
                                    <div className="diet_meal-head">
                                        <h3>Lunch</h3>
                                    </div>
                                    <div className="diet_meal-content">
                                        <ul>
                                            <li>
                                                <span className="d-flex align-items-center meal_name"><i className="fa fa-check-circle" aria-hidden="true"></i> Almonds and Pear Slices in Almond Yogurt</span>
                                            </li>
                                            <li>
                                                <span className="d-flex align-items-center meal_name"><i className="fa fa-check-circle" aria-hidden="true"></i> Baked Tofu Over Quinoa and Vegetables </span>
                                            </li>
                                            <li>
                                                <span className="d-flex align-items-center meal_name"><i className="fa fa-check-circle" aria-hidden="true"></i> Healthified Salsa-Beef Chili </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!----==========meal list item========----> */}
                                <div className="diet_meal_wrap">
                                    <div className="diet_meal-head">
                                        <h3>Evening Snack</h3>
                                    </div>
                                    <div className="diet_meal-content">
                                        <ul>
                                            <li>
                                                <span className="d-flex align-items-center meal_name"><i className="fa fa-check-circle" aria-hidden="true"></i> Turkey and Arugula Tea Sandwiches </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                
                                {/* <!----==========meal list item========----> */}
                                <div className="diet_meal_wrap">
                                    <div className="diet_meal-head">
                                        <h3>Dinner</h3>
                                    </div>
                                    <div className="diet_meal-content">
                                        <ul>
                                            <li>
                                                <span className="d-flex align-items-center meal_name"><i className="fa fa-check-circle" aria-hidden="true"></i> Beef and Avocado Wrap</span>
                                            </li>
                                            <li>
                                                <span className="d-flex align-items-center meal_name"><i className="fa fa-check-circle" aria-hidden="true"></i> Healthified Bean and Salsa Chicken Wrap </span>
                                            </li>
                                            <li>
                                                <span className="d-flex align-items-center meal_name"><i className="fa fa-check-circle" aria-hidden="true"></i> Healthified Salsa-Beef Chili </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-5">
                                <div className="diet_meal_wrap extra_food">
                                    <div className="diet_meal-head">
                                        <h3>Eating Guidelines</h3>
                                    </div>
                                    <p>To complete your daily calories, follow these food Meals. Eat extra fruits and vegetables if you want.</p>
                                    <div className="diet_meal-content extra_food_list">
                                        <ul>
                                            <li className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center meal_name">
                                                <span className="efl_icon">
                                                    <img src="/images/icon_5.png" className="img-fluid"/>
                                                </span> 
                                                <span className="efl_txt">Fruits</span>
                                                </div>
                                                <div className="meal_serving">
                                                    2-3 Servings
                                                </div>
                                            </li>
                                            <li className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center meal_name">
                                                <span className="efl_icon">
                                                    <img src="/images/icon_3.png" className="img-fluid"/>
                                                </span> 
                                                <span className="efl_txt">Protein</span>
                                                </div>
                                                <div className="meal_serving">
                                                    3-4 Servings
                                                </div>
                                            </li>
                                            <li className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center meal_name">
                                                <span className="efl_icon">
                                                    <img src="/images/icon_4.png" className="img-fluid"/>
                                                </span> 
                                                <span className="efl_txt">Vegetables</span>
                                                </div>
                                                <div className="meal_serving">
                                                    1-2 Servings
                                                </div>
                                            </li>
                                            
                                            <li className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center meal_name">
                                                <span className="efl_icon">
                                                    <img src="/images/icon_6.png" className="img-fluid"/>
                                                </span> 
                                                <span className="efl_txt">Dairy</span>
                                                </div>
                                                <div className="meal_serving">
                                                    2-4 Servings
                                                </div>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </UserDashboardLayout>
        )
    }
}


const mapStateToProps = state => ({
    calc_data: state.Calculator.calc_data,
    get_calc_success: state.Calculator.get_calc_success,
    get_calc_error: state.Calculator.get_calc_error,
    get_calc_err_msg: state.Calculator.get_calc_err_msg,
});
  
const mapActionsToProps = dispatch => bindActionCreators({
    getCalculations: Actions.getCalculations,
}, dispatch);
  
export default 
  connect(
    mapStateToProps,
    mapActionsToProps
  )(DietPlanPage);