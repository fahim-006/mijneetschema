import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../Redux/Actions';
import UserLayout from '../../layouts/UserLayout'
import HomeCalculator from '../../components/HomePage'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Loader from '../../components/Loader/loader';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: 3,
            open:false,
            categories: [],
            errors: {},
            loader:true,
            limit:6,
            product_limit:3,
            products:[],
        };
    }

    onOpenModal = () => {
      this.setState({ open: true });
    };
     
    onCloseModal = () => {
      this.setState({ open: false });
    };

    componentDidMount() {
      const { limit , product_limit} = this.state;
      const requestbody = { limit };
      this.props.listCategoryByLimit(requestbody);
      const productRequestbody = { limit:product_limit };
      this.props.listAllProductsByLimit(productRequestbody);
    }
  
    componentDidUpdate(prevProps , prevState) {
      if(this.props.products.success && this.props.products.product_success) {
        let st = (
            prevState.loader ? 
              this.setState({
                loader:false,
                categories:this.props.products.categories,
                products:this.props.products.all_products_bylimit
              })
              :
              null
          )
      } 
    }


    render() {
        const { open,categories ,loader,products} = this.state;
        return (
          <UserLayout>
            <Modal open={open} onClose={this.onCloseModal} full className="modal_pop">
              <HomeCalculator />
            </Modal>

                <div>
                {/*================banner section start================*/}
                <div className="banner_sec">
                  <div className="container">
                    <div className="col-md-12">
                      <div className="quiz_wrap steps_result">
                        <div className="banner_txt d-flex">
                          <div className="banr_headng text-uppercase">Verbeter je<br />Prestaties
                            <div className="slogan">100% Resultaat #mijneetschema</div>
                          </div>
                          <div className="banr_image"><img src="/images/main-page-banner.png" /></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 banner-btn">
                      <div className="pull-right">
                        <div className="click_btn">
                          <button type="button" onClick={this.onOpenModal}>Eetschema aanvragen</button>
                          <i className="fa fa-long-arrow-right" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*================banner section ends================*/}
                {/* MAIN PAGE CONTENT AREA STARTS */}
                <div className="content-area homepage-content-main">
                  {/* YOUR OBJECTIVE SECTION STARTS */}
                  <section className="content-area your-obj">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-5">
                          <h2 className="sec-heading">WAT IS JOUW<br /><span className="black-txt">DOELSTELLING?</span></h2>
                          <p>Wil jij afvallen, op gewicht blijven of<br />aankomen in spiermassa? Bereken dan jouw<br />caloriebehoefte en ontvang jouw gratis<br />op maat gemaakte eetschema</p>
                          <img src="/images/wat-jouw.png" className="img-fluid" />
                        </div>
                        <div className="col-md-7">
                          <div className="wat-con con1">
                            <div className="wat-icon">
                              <img src="/images/icon1.png" className="img-fluid" />
                            </div>
                            <h4>Gezond eten</h4>
                            <span className="ceta-title">Gezonde en verse maaltijden die aansluiten bij jouw persoonlijke eetschema, voorkeuren en smaak</span>
                          </div>
                          <div className="wat-con con1 pull-right">
                            <div className="wat-icon">
                              <img src="/images/icon2.png" className="img-fluid" />
                            </div>
                            <h4>Mealpreppen</h4>
                            <span className="ceta-title">Wij zorgen voor een afgewogen eetschema (koolhydraten, eiwitten en vetten) en calorieën. Daarnaast houden wij ook rekening met voldoende variatie, allergenen en intoleranties</span>
                          </div>
                          <div className="wat-con con1">
                            <div className="wat-icon">
                              <img src="/images/icon3.png" className="img-fluid" />
                            </div>
                            <h4>Tijdige Levering</h4>
                            <span className="ceta-title">Laat jouw complete eetschema aan huis bezorgen. Bespaar jezelf tijd en moeite voor het boodschappen doen en koken</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* YOUR OBJECTIVE SECTION ENDS */}
                  {/* MOST CHOSEN SECTION STARTS */}
                  <section className="content-area most-chosen">
                    <div className="red-rectangle grey-bg" />
                    <div className="container">
                      <div className="most-chosen-rgt-img"><img src="/images/12-broccoli-png-image-with-transparent-background.png" className="img-fluid" /></div>
                      <div className="most-chosen-lft-img"><img src="/images/7-2-salad-png-pic.png" className="img-fluid" /></div>
                      <div className="row">
                        <div className="col-md-4 offset-4">
                          <h2>MEEST GEKOZEN<br /><span className="black-txt">MAALTIJDEN</span></h2>
                          <p>Meest gekozen maaltijden<br />Gezond, vers en met liefde bereid<br />Heb jij ze al geprobeerd?</p>
                        </div>
                      </div>
                      <div className="row most-chosen-content">

                      {loader ?
                          <Loader />
                            :
                      products.length > 0 && products.map((data,index)=> { 
                    return   <div className="col-md-6 col-lg-4 col-sm-6" key={index}>
                          <Link to={'/product-detail/'+data._id}>
                          <div className={`wat-con con1 ${index === 1 ? "mt-110" : ""}`} >
                            <div className="wat-icon">
                              <img src={process.env.REACT_APP_IMAGE_URL +data.product_img}  className="img-fluid" />
                            </div>
                            <h4>{data.name}</h4>
                            <span className="ceta-title">Vanaf <i className="fa fa-eur" aria-hidden="true" /> {data.price}</span>
                            <div className="click_btn">
                            <Link to={'/product-detail/'+data._id}>Bestel nu</Link> 
                            
                              <i className="fa fa-long-arrow-right" />
                            </div>
                          </div>
                          </Link>
                        </div>
                      })
                    }
                        
                      </div>
                    </div>
                  </section>
                  {/* MOST CHOSEN SECTION ENDS */}

                {/* WHAT CLIENT SAY SECTION STARTS */}
                <section className="content-area quotes">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12 text-center">
                          <div className="quote-icon">
                            <img src="/images/quote-icon.png" className="img-fluid" />
                          </div>
                          <h2><span className="black-txt">Wat onze klanten zeggen</span></h2>
                        </div>
                      </div>
                      <div className="row quote-slides">
                        <div className="col-md-12">
                          <OwlCarousel
                            className="owl-theme"
                            loop
                            items={1}
                            nav
                            dots={false}
                          >
                              <div className="wow fadeInUp item">
                                <div className="team_membar carousel_team_blk">
                                  <p>Super handig. Een compleet eenschema en alles aan huis bezorgd. Dit scheelt mij veel tijd en moeite met mealpreppen</p>
                                  <div className="quote-user">Olivier Meijer</div>
                                  <div className="quote-address">Eetschema</div>
                                </div>
                              </div>
                              <div className="wow fadeInUp item">
                                <div className="team_membar carousel_team_blk">
                                  <p>Nu een aantal weken aan de slag met mijneetschema. Makkelijk bij te houden en goede resultaten</p>
                                  <div className="quote-user">Saskia de Visser</div>
                                  <div className="quote-address">Eetschema</div>
                                </div>
                              </div>
                              <div className="wow fadeInUp item">
                                <div className="team_membar carousel_team_blk">
                                  <p>Ik ben erg blij met mijneetschema en de professionele begeleiding erbij, zeker een aanrader</p>
                                  <div className="quote-user">Ahmet Okyay</div>
                                  <div className="quote-address">Eetschema</div>
                                </div>
                              </div>
                              <div className="wow fadeInUp item">
                                <div className="team_membar carousel_team_blk">
                                  <p>Eindelijk iets gevonden wat bij mij past. Geen excuus meer om mij niet meer te houden aan mijn eetschema</p>
                                  <div className="quote-user">Clayton heimen</div>
                                  <div className="quote-address">Eetschema</div>
                                </div>
                              </div>
                              <div className="wow fadeInUp item">
                                <div className="team_membar carousel_team_blk">
                                  <p>Binnen 3 maanden heb ik mijn doelstelling bereikt. 10kg afgevallen en helemaal happy met mijn lichaam.</p>
                                  <div className="quote-user">Suzanne Boom</div>
                                  <div className="quote-address">Eetschema</div>
                                </div>
                              </div>
                              <div className="wow fadeInUp item">
                                <div className="team_membar carousel_team_blk">
                                  <p>Erg makkelijk dat alles aan huis komt</p>
                                  <div className="quote-user">Remco van Berkel</div>
                                  <div className="quote-address">Eetschema</div>
                                </div>
                              </div>
                              <div className="wow fadeInUp item">
                                <div className="team_membar carousel_team_blk">
                                  <p>Eindelijk een partij die het snap. Hier niet alleen verkoop van maaltijden maar ook goede begeleiding er omheen</p>
                                  <div className="quote-user">Patrick Schouren </div>
                                  <div className="quote-address">Eetschema</div>
                                </div>
                              </div>
                            </OwlCarousel>
                          </div>
                      </div>
                    </div>
                  </section> 

                  {/* CATEGORIES SECTION STARTS */}
                  <section className="content-area categories-sec">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <h2 className="sec-heading text-center"><span className="black-txt">CATEGORIEËN</span></h2>
                        </div>
                      </div>
                      <div className="row categories-row">
                      {loader ?
                          <Loader />
                            :
                          categories.length > 0 && categories.map((data,index)=> {  
                            return (
                              <div className="col-md-6 col-lg-4 col-sm-6 categories-vlock" key={index} >
                                <div className="ceta-con-main">
                                <Link to={'/products/category/'+data._id}>
                                  <div className="ceta-top">
                                   <h4 className="ceta-title">{data.category}</h4>
                                    <div style={{color: "#8589A2"}} className="ceta-des">{data.description}</div>
                                  </div>
                                 
                                  <div className="ceta-img">
                                    <img src={process.env.REACT_APP_IMAGE_URL +data.category_img} className="img-fluid" />
                                    <div className="rectangle-shape"><img src="/images/transparent-triangle.png" className="img-fluid" /></div>
                                  </div>
                                  </Link>
                                </div>
                              </div>
                            )
                          })
                        }
                      
                      </div>
                    </div>
                  </section>
                  {/* CATEGORIES SECTION ENDS */}
                  {/* INSTAGRAM FEED SECTION STARTS */}
                  <section className="content-area instagram-feed text-center">
                    <h2>INSTAGRAM<span className="black-txt"> #mijneetschema</span></h2>
                    <div className="instagram-feed-con">
                      <div className="block">
                        <ul>
                          <OwlCarousel
                            className="owl-theme"
                            loop
                            items={6}
                            dots={false}
                            margin={0}
                          >
                            <li className="item"><img src="/images/instagram1.jpg" /></li>
                            <li className="item"><img src="/images/instagram2.jpg" /></li>
                            <li className="item"><img src="/images/instagram3.jpg" /></li>
                            <li className="item"><img src="/images/instagram4.jpg" /></li>
                            <li className="item"><img src="/images/instagram5.jpg" /></li>
                          </OwlCarousel>  
                        </ul>
                      </div>
                    </div>
                  </section>
                  {/* INSTAGRAM FEED SECTION STARTS */}
                </div>
              </div>
            </UserLayout>
        )
    }
}

const mapStateToProps = state => ({
    login: state.Login,
    products: state.Products
});

const mapActionsToProps = dispatch =>
    bindActionCreators(
        {
            userLogin: Actions.loginRequest,
            listCategoryByLimit: Actions.listCategoryByLimitRequest,
            listAllProductsByLimit: Actions.listAllProductsByLimitRequest
        },
        dispatch
    );
export default connect(mapStateToProps, mapActionsToProps)(Home);