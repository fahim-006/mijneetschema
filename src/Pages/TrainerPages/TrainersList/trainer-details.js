import React, { Component } from 'react';
import UserLayout from '../../../layouts/UserLayout';
import TrainerInfo from './trainer-info-reviews';
import TrainerVideos from './trainer-videos';
import TrainerBio from './trainer-bio';

class TrainerDetail extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    render(){
        return(
            <UserLayout>
                <div className="banner_sec">
                    <div className="container">
                        <div className="col-12">
                            <div className="steps_result single_trainer_head">
                                <div className="banner_txt d-flex">
                                    <div className="banr_headng">Trainer <br/>detail</div>
                                    <div className="banr_image">
                                        <img src="/images/fitness_PNG181.png" className=""/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-area homepage-content-main">
                
                <TrainerBio {...this.props}/>

                <TrainerInfo {...this.props}/>

                <TrainerVideos {...this.props}/>
                
                </div>
            </UserLayout>
        )
    }
} 

export default TrainerDetail;