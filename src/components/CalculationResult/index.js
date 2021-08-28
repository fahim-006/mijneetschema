import React, { Component } from "react";
import {Link} from 'react-router-dom';
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

// color-code #f35756

class CalculationResult extends Component {

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
        const demoImage = 'data:image/jpeg;base64,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';
        return (
            <div className="result_box pt-5">
                <div className="container" >
                    <div className="col-12">
                        <div className="head-text text-center px-5">
                            <h1 className="nunito-text-red"><span className="head">Hi Michelle,</span><br/>
                            Jouw persoonlijke caloriebehoefte om af 5 kilo<br/>
                            af te vallen is 2200 calorieen.
                            </h1>
                        </div>
                        <div className="image-container pt-md-5 col-12 col-md-8 mx-auto">
                                <figure className="text-center">
                                    <img className="head-image rounded" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9uSakYFP8DxSGBFcb035N7bd5K26DvqliaA&usqp=CAU" alt="..." />
                                    <figcaption className="heading-caption">
                                        <h3 className="heading-caption">Deze video laat jou zien hoe jij op een gezonde en makkelijke manier 5 kilo kan afvallen
                                        en jezelf fitter kunt voelen, zonder aan een crashdieet te moeten.</h3>
                                    </figcaption>   
                                </figure>
                        </div>
                        <div className="btn-join-wrapper bg-red text-white py-2 mt-5 py-md-3 font-nunito text-center rounded">
                            <h1 className="btn-join-title font-nunito">VAL 5 KG AF EN KRIJG JE DROOMLICHAAM VOOR SLECHTS €45</h1>
                            <Link to="/secure-checkout" ><button className="btn-join-now rounded font-nunito py-2 px-3">START NU</button></Link>
                        </div>
                            {/******** One Two Open Sectin ******************* */}
                        <div className="onetwopen-wrapper">
                            <h2 className="onetwopen text-center py-5 font-nunito">Mijneetschema is ontwopen om jou te helpen <br/> droomlichaam te krijgen... zie de resultaten:</h2>
                            <div className="gallery-wrapper col-12 col-lg-8 m-auto">
                                <div className="row flex justify-content-md-between justify-content-center pb-3">
                                        <div className="gallery-card text-center">
                                            <figure className="figure">
                                                <figcaption className="figure-caption">
                                                    <h3>Nanda:</h3>
                                                </figcaption>
                                                <img src={demoImage} className="figure-img img-fluid rounded" alt="..." />
                                            
                                            </figure>
                                        </div>
                                        <div className="gallery-card text-center">
                                            <figure className="figure">
                                                <figcaption className="figure-caption">
                                                    <h3>Amanda:</h3>
                                                </figcaption>
                                                <img src={demoImage} className="figure-img img-fluid rounded" alt="..." />
                                            
                                            </figure>
                                        </div>
                                </div>
                                <div className="row flex justify-content-md-between justify-content-center pb-3">
                                        <div className="gallery-card text-center">
                                            <figure className="figure">
                                                <figcaption className="figure-caption">
                                                    <h3>Fabiola:</h3>
                                                </figcaption>
                                                <img src={demoImage} className="figure-img img-fluid rounded" alt="..." />
                                            
                                            </figure>
                                        </div>
                                        <div className="gallery-card text-center">
                                            <figure className="figure">
                                                <figcaption className="figure-caption">
                                                    <h3>Tammi:</h3>
                                                </figcaption>
                                                <img src={demoImage} className="figure-img img-fluid rounded" alt="..." />
                                            </figure>
                                        </div>
                                </div>

                                <div className="row flex justify-content-center pb-5">
                                <div className="gallery-card text-center">
                                        <figure className="figure">
                                            <figcaption className="figure-caption">
                                                <h3>Bella:</h3>
                                            </figcaption>
                                            <img src={demoImage} className="figure-img img-fluid rounded" alt="..." />
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="workout-section">
                            <h1 className="workout-title font-nunito text-center">Dit zit inbegrepen in jouw persoonlijke <br/> eetschema.</h1>
                            <h5 className="workout-subtitle text-center my-5">My 15-Minute Hourglass Method Workouts -- Work Out WITH Me!</h5>
                            <div className="mindset-title-wrapper d-flex ">
                                <i className="pr-2 workout-section-icon text-red"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                                </i>
                                <p className=""><span className="workout-bold">Persoonlijk eetschema:</span> Alle maaltijden en porties zijn op maat afgestemd op jouw persoonlijke behofte en doelen.</p>
                            </div>
                            <div className="mindset-title-wrapper d-flex ">
                                <i className="pr-2 workout-section-icon text-red"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                                </i>
                                    <p className=""><span className="workout-bold">Realtime Workouts: </span> 
                                        Workout WITH me in real time.
                                        I’ll be guiding you through each exercise, hold you accountable and keep you going.
                                        Just show up and you’ll get your workouts done in 15 minutes. This is the closest option to training with me personally!
                                </p>
                            </div>
                            <div className="mindset-title-wrapper d-flex ">
                                <i className="pr-2 workout-section-icon text-red"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                                </i>
                                    <p className="">
                                        <span className="workout-bold">Daily Plan: </span>Your workouts (and rest days) are all planned out for you for the 90 days, by the day...so you're set up for success. (2)

                                </p>
                            </div>
                            <div className="mindset-title-wrapper d-flex">
                                <i className="pr-2 workout-section-icon text-red"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                                </i>
                                    <p className=""><span className="workout-bold">No Gym or Equipment Required:</span> You can do these workouts at home, at the park, on-the-go...all you need is a phone, laptop, tablet, or TV. (3)
                                </p>
                            </div>
                        </div>
                        <div className="community_wrapper mt-5">
                            <div className="mindset-title-wrapper d-flex">
                                <i className="pr-2 big-title-icon">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                                </i>
                                <h1 className="mindset-title font-nunito big-title">Weekly Q&A Sessions With Me As Your Trainer</h1>
                            </div>
                            <div className="mindset-body pt-3">
                                <p className="">My UltraBurn program keeps weight loss dead simple… (4)</p>

                                <p>Yet if at any point you feel lost or frustrated...I’ll be hosting Live Q&A Sessions for Pink Dragon UltraBurn members.</p>

                                <p>Just think how much faster you can get results with help on your side...and keep those results!</p>
                            </div>
                        </div>
                        <div className="community_wrapper mt-5">
                            <div className="mindset-title-wrapper d-flex">
                                <i className="pr-2 big-title-icon">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                                </i>
                                <h1 className="mindset-title big-title font-nunito">My Private Facebook Community Holds You Accountable And Supports You</h1>
                            </div>
                            <div className="mindset-body pt-2">
                                <p className="">You will NOT be in this alone! </p>

                                <p>I know from experience doing this without support is tough.</p>

                                <p>When you join UltraBurn, you join a group of fierce ladies supporting each other every single day.</p>

                                <p>Whenever you have a question, want to share your progress, or just need some company to lift your spirits...we’ll ALL be there for you!</p>
                            </div>
                        </div>

                        <div className="mindset_wrapper mt-5">
                            <div className="mindset-title-wrapper d-flex">
                                <i className="pr-2 big-title-icon">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                                </i>
                                <h1 className="mindset-title big-title font-nunito">Mindset training ensures you never give up on <span className="red">yourself</span> again</h1>
                            </div>
                            <div className="mindset-body pt-2">
                                <p className="">Sometimes your mind will give up before your body does. </p>
                                <p className="">Maybe you think you don’t deserve it. Or maybe you don’t think you’re capable. Or maybe you’re simply being hard on yourself.</p>
                                <p className=""> Whatever it is, your mindset is the overlooked KEY to the best results.</p>
                                <p className="">Without a strong mindset, your self-doubt might take over and sabotage you. </p>
                                <p className="">I have no doubt that the same powerful tools I use every day, will help YOU attain the body you’ve always wanted.</p>
                                <p className="">This training was only available to my private coaching clients. But my private clients were seeing such amazing results, I’m including this training in UltraBurn, too!</p>
                            </div>
                        </div>
                        <div className="what_to_do text-center mt-7">
                            <h1 className="what-to-do-title py-2 big-title font-nunito">Here's What to Do Now...</h1>
                            <div className="what-to-do-body">
                                <p className="">If you’re ready to start your transformation, and start seeing results… </p>
                                <p className="">I would advise you to join my UltraBurn Program right now.</p>
                                <p className=""> The sooner you get started, the sooner you’ll be able to reach your health <br/> and body goals...just like the thousands of other ladies who joined before.</p>
                            </div>
                        </div>

                        <div className="btn-join-wrapper bg-red text-white py-2 mt-5 py-md-3 font-nunito text-center rounded">
                            <h1 className="btn-join-title font-nunito text-white text-center">VAL 5 KG AF EN KRIJG JE
                                DROOMLICHAAM <br/>
                                TIJDELIJKE AANBIEDING VOOR
                                SLECHTS €295 €45
                            </h1>
                            <Link to="/secure-checkout"><button className="btn-join-now rounded font-nunito p-3">START NU</button></Link>
                        </div>

                        <div className="fq-wrapper py-5">
                            <h1 className="fq-title text-center text-black font-nunito py-3">Veel gestelde vragen</h1>
                            <div className="accordion" id="accordionExample">
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="special text-black btn-block text-left d-flex justify-content-between collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <p>Wat is er zo speciaal aan dit schema ten opzichte van andere schema's?</p>
                                            <p>+</p>
                                        </button>
                                    </h2>
                                    </div>

                                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="card-body">
                                        Some placeholder content for the first accordion panel. This panel is shown by default, thanks to the <code>.show</code> className.
                                    </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingTwo">
                                    <h2 className="mb-0">
                                        <button className="special btn-block text-left d-flex justify-content-between collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <p>Kan ik zelf nog variatie toevoegen?</p>
                                            <p>+</p>
                                        </button>
                                    </h2>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div className="card-body">
                                        Some placeholder content for the second accordion panel. This panel is hidden by default.
                                    </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingThree">
                                    <h2 className="mb-0">
                                        <button className="special btn-block text-left d-flex justify-content-between collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            <p>Is het schema makkelijk te volgen?</p>
                                            <p>+</p>
                                        </button>
                                    </h2>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                    <div className="card-body">
                                        And lastly, the placeholder content for the third and final accordion panel. This panel is hidden by default.
                                    </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingThree">
                                    <h2 className="mb-0">
                                        <button className="special btn-block text-left d-flex justify-content-between collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            <p>Hoe lang duurt het voordat ik resultaat zie?</p>
                                            <p>+</p>
                                        </button>
                                    </h2>
                                    </div>
                                    <div id="collapseFour" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                    <div className="card-body">
                                        And lastly, the placeholder content for the third and final accordion panel. This panel is hidden by default.
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="calculation-result-footer">
                    <div className="container">
                        <h1 className="footer-copyright text-center font-nunito text-white py-3">Copyright © Mijneetschema 2021</h1>
                        <p className="footer-description text-white text-center">Disclaimer: The information or the products listed on this website are not intended to treat,
                             cure, prevent or diagnose any disease or ailment. 
                             The information on this site is provided for educational
                              purposes only. It is not intended as a substitute for 
                              professional advice of any kind. Always consult your doctor
                               before doing anything to do with your health. 
                            The author of this site is not engaged in rendering 
                            professional advice or services to the individual reader. 
                            The ideas, procedures, and suggestions contained within this 
                            work are not intended as a substitute for consulting with 
                            your physician. All matters regarding your health require 
                            medical supervision. The author shall not be liable or 
                            responsible for any loss or damage allegedly arising from
                             any information or suggestions within this blog. You, as 
                             a reader of this website, are totally and completely
                              responsible for your own health and healthcare. 
                              This post is in no way sponsored or associated 
                              with Facebook....
                        </p>
                        <div className="footer-bottom d-flex justify-content-center text-white">
                            <p className="px-2">Tearms and Conditions</p> | <p className="px-2">Privacy Policy</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
export default CalculationResult;