import React, { Component } from "react";
import RozaShingalMethod from "../DietCalculator/Roza-Shingal";
import MacardleMethod from "../DietCalculator/Macardle";
import { createNotification } from "../../helpers";

// const personal_mesurement = {
//     name: 'Test',
//     fat_percent: '',
//     // fat_percent: '25',
//     length: '170',
//     current_weight: '73',
//     target_weight: '70',
//     age: '28',
// };
// const requestbody = {
//     gender: 'Man', target: 'weightLoss', physical_activity: 1.5, personal_mesurement, body_type: "MESOMORPH"
// }
class FinishSteps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: ''
        };
    }

    componentDidMount() {
        if (this.props) {
            const details = this.props;
            this.setState({ details })
        }
    }

    render() {
        const { details } = this.state;
        return (
            <div className="result_box">
                < div className="container" >
                    <div className="col-12">
                        <div className="quiz_wrap">
                            <div className="quiz_qa steps_slct fnsh_page">
                                <div className="quiz_qa_content">
                                    <div className="finish_wrap">
                                        <h3>JOUW PERSOONLIJKE MAALTIJDPLAN VAN 90 DAGEN STAAT KLAAR</h3>
                                    </div>
                                </div>
                                <div>
                                    <br />
                                    {/** Note:-
                                     *   If bodyfat OR (fat_percent) == blank ( 
                                     *      use placeholder text 
                                     *      "Laat dit veld leeg als je dit niet (zeker) weet" ), 
                                     *   then 
                                     *      => use Roza and Shingal method
                                     *   else 
                                     *      => use katch macardle method
                                    */}
                                    {details && details.personal_mesurement.fat_percent === '' ?

                                        <div>
                                            {/* <p>Your diet plan details.</p> */}
                                            <RozaShingalMethod {...details} />
                                        </div>
                                        :
                                        <div>
                                            {/* <p>Your diet plan details.</p> */}
                                            <MacardleMethod {...details} />
                                        </div>
                                    }
                                </div> 
                            </div>

                        </div>
                    </div>
                </div >
                {/* </div> */}
                < div className="divider-152" ></div >
            </div >
        )
    }
};
export default FinishSteps;