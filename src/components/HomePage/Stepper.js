import React from "react";
import { Link } from 'react-router-dom';

const StepperComponent = ({ 
    gender, target, 
    physicalActivity,
    meat_products,
    vegetables,
    fruits,
    other_products,
    allergies_intolerances,
    personal_mesurement,
    currentLocation, 
    handleStepCount 
}) => {
    const { kip, kalkoen, rundvlees, gehakt, vis, geen_vlees } = meat_products;
    const { paprika, snijbonen, spitskool, mixgroente, broccoli, kouseband, Spinazie } = vegetables;
    const { mandarijnen, grapefruit, appel, blauwebes, banana,  addrdbeien, ananas, sinassappeal, mango } = fruits;
    const { el, tofu, noten, sojamilk, yoghurt, tempeh, kaas, kwark } = other_products;
    const { mosterd, selderij, sesam, shellfish, anders, geen_allergie } = allergies_intolerances;
    return (
        <div className="quiz_step_menu">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="step_menu_inner">
                            <ul className="d-flex">
                                <li
                                    className={
                                        "bd_top" + 
                                        ((currentLocation === parseInt(1)) ? " active_menu" : '')
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        handleStepCount(1)
                                    }}
                                >
                                    <Link to="#">
                                        <span className="qsm_icon">
                                            <img src="./images/icon_0.png" className="img-fluid" alt="" />
                                        </span><br />
                                        <span className="qsm_txt">Geslacht</span>
                                    </Link>
                                </li>

                                <li
                                    className={((
                                        currentLocation === parseInt(2)) ? " bd_top active_menu " : ((
                                            currentLocation >= 2 &&
                                            currentLocation <= 9) ? 
                                            " bd_top " : ''
                                        ))
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        if(gender){handleStepCount(2)}
                                    }}
                                >
                                    <Link to="#">
                                        <span className="qsm_icon">
                                            <img src="./images/icon_1.png" className="img-fluid" alt="" alt="" />
                                        </span><br />
                                        <span className="qsm_txt">JOUW DOEL</span>
                                    </Link>
                                </li>

                                <li
                                    className={((
                                        currentLocation === parseInt(3)) ? " bd_top active_menu " : ((
                                            currentLocation >= 3 &&
                                            currentLocation <= 9) ? 
                                            " bd_top " : ''
                                        ))
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        if(target){handleStepCount(3)}
                                    }}
                                >
                                    <Link to="#">
                                        <span className="qsm_icon">
                                            <img src="./images/icon_2.png" className="img-fluid" alt="" />
                                        </span><br />
                                        <span className="qsm_txt">FYSIEKE ACTIVITEIT</span>
                                    </Link>
                                </li>

                                <li
                                    className={((
                                        currentLocation === parseInt(4)) ? " bd_top active_menu " : ((
                                            currentLocation >= 4 &&
                                            currentLocation <= 9) ? " bd_top " : ''
                                        ))
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        if(target && physicalActivity){handleStepCount(4)}
                                    }}
                                >
                                    <Link to="#">
                                        <span className="qsm_icon">
                                            <img src="./images/icon_3.png" className="img-fluid" alt="" />
                                        </span><br />
                                        <span className="qsm_txt">VLEES/VIS/VEGA</span>
                                    </Link>
                                </li>

                                <li
                                    className={((
                                        currentLocation === parseInt(5)) ? " bd_top active_menu " : ((
                                            currentLocation >= 5 &&
                                            currentLocation <= 9) ?
                                            " bd_top " : ''
                                        ))
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        if(
                                            target && (kip || kalkoen || rundvlees || 
                                            gehakt || vis || geen_vlees)
                                        ){
                                            handleStepCount(5)
                                        }
                                    }}
                                >
                                    <Link to="#">
                                        <span className="qsm_icon">
                                            <img src="./images/icon_4.png" className="img-fluid" alt="" />
                                        </span><br />
                                        <span className="qsm_txt">GROENTEN</span>
                                    </Link>
                                </li>

                                <li
                                    className={((
                                        currentLocation === parseInt(6)) ? " bd_top active_menu " : ((
                                            currentLocation >= 6 &&
                                            currentLocation <= 9) ?
                                            " bd_top " : ''
                                        ))
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        if(
                                            target && ( paprika || snijbonen || spitskool || 
                                            mixgroente || broccoli || kouseband || Spinazie )
                                        ){
                                            handleStepCount(6)
                                        }
                                    }}
                                >
                                    <Link to="#">
                                        <span className="qsm_icon">
                                            <img src="./images/icon_5.png" className="img-fluid" alt="" />
                                        </span><br />
                                        <span className="qsm_txt">FRUIT</span>
                                    </Link>
                                </li>

                                <li
                                    className={((
                                        currentLocation === parseInt(7)) ? " bd_top active_menu " : ((
                                            currentLocation >= 7 ||
                                            currentLocation == 9) ? 
                                            " bd_top " : ''
                                        ))
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        if(
                                            target && ( mandarijnen || grapefruit || appel || 
                                            blauwebes || addrdbeien || ananas || 
                                            sinassappeal || mango || banana )
                                        ){
                                            handleStepCount(7)
                                        }
                                    }}
                                >
                                    <Link to="#">
                                        <span className="qsm_icon">
                                            <img src="./images/icon_6.png" className="img-fluid" alt="" />
                                        </span><br />
                                        <span className="qsm_txt">Overige producten</span>
                                    </Link>
                                </li>

                                <li
                                    className={
                                        ((currentLocation === parseInt(8)) ? " bd_top active_menu" : ((
                                            currentLocation == 9) ? " bd_top " : ''
                                        ))
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        if(
                                            target && ( el || tofu || noten || 
                                            sojamilk || yoghurt || 
                                            tempeh || kaas || kwark )
                                        ){
                                            handleStepCount(8)
                                        }
                                    }}
                                >
                                    <Link to="#">
                                        <span className="qsm_icon">
                                            <img src="./images/icon_7.png" className="img-fluid" alt="" />
                                        </span><br />
                                        <span className="qsm_txt">Allergieën en intoleranties</span>
                                    </Link>
                                </li>

                                <li
                                    className={
                                        ((currentLocation === parseInt(9)) ? " bd_top active_menu " : '')
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        if(
                                            target && ( mosterd || selderij || sesam || 
                                            shellfish || anders || geen_allergie )
                                        ){
                                            handleStepCount(9)
                                        }
                                    }}
                                >
                                    <Link to="#">
                                        <span className="qsm_icon">
                                            <img src="./images/icon_8.png" className="img-fluid" alt="" />
                                        </span><br />
                                        <span className="qsm_txt">PERSOONLIJKE METING</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StepperComponent;