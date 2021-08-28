import React, { Component } from "react";
import { Link } from 'react-router-dom';

class FooterComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const currentLocation = window.location.pathname;
		return (
			<div>
				<footer>
					<div className="footer_inner">
						<div className="container">
							<div className="row">
								<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
									<div className="footer_widget">
										<h3 className="pl">Contact</h3>
										<div className="footer_info">
											<div className="f-mail d-flex">
												<span className="icon"><img src="/images/mail-foot.png" className="img-fluid" alt="" /></span>
												<span className="txt">info@mijneetschema.nl</span>
											</div>
											<div className="f-phone d-flex">
												<span className="icon"><img src="/images/call-foot.png" className="img-fluid" alt="" /></span>
												<span className="txt">+31 10 846 02 41</span>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
									<div className="footer_widget">
										<h3 className="pl">Bezorg locaties</h3>
										<div className="footer_info">
											<div className="f-loc d-flex">
												<span className="icon"><img src="/images/loc-foot.png" className="img-fluid" alt="" /></span>
												<span className="txt">Zuid holland<br />Nederland</span>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
									<div className="footer_widget">
										<h3 className="pl">Openingstijden</h3>
										<div className="time_list">
											<ul>
												<li>Maandag t/m vrijdag</li>
												<li>9:00 uur - 17:30 uur</li>
												<li>Zaterdag</li>
												<li>7:00 p.m. - 16:00 p.m.</li>
												<li>Zondag gesloten</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
									<div className="footer_widget">
										<h3>Sport en voeding Tips:</h3>
										<div className="newsletter">
											<span className="nwsltr_icon"><img src="/images/newsltr-icon.png" className="img-fluid" alt="" /></span>
											<span className="nwsltr_input"><input type="text" placeholder="enter email" /></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</div>
		);
	}

}
export default FooterComponent;
