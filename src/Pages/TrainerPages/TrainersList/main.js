import { useEffect, useState } from "react"
import UserLayout from "../../../layouts/UserLayout";
import { getAllTrainer1, getFilteredTrainer, GetTrainerCatAPI } from "../../../Redux/API";
import React from "react";
import RatingStars from "../../../components/RatingStars";
import Middle from "./middle";
import GenderFilter from "./genderFilter";
import DoelFilter from "./doelFilter";
import { leeftijds } from "../../../utils/ages";
import AgeFiltering from "./ageFiltering";
import LocationFiltering from "./LocationFiltering";
import FullnameFiltering from "./fullnameFiltering";
import Pagination from "react-js-pagination";


const TrainerLists = () =>{
    const [trainers, setTrainers] = useState([]);
    const [error, setError] = useState([]);
    const [categories, setCategories] = useState([]);
    const [genders, setGenders] = useState([]);
    const [doels, setDoels] = useState([]);
    const [addresses, setaddresses] = useState([]);
    const [fullnames, setfullnames] = useState([]);
    const [filters, setFilters] = useState({
        gender: [],
        doel: [],
        leeftijd: [],
        address: [],
        category: []
    })

    useEffect(()=> {
        getAllTrainer1()
            .then(response => setTrainers(response.data))
            .catch(err=> setError ("Failed to fetch"))
        
        {/*GetTrainerCatAPI()
            .then(response =>  setCategories(response.data))
        .catch(err => setError("Failed to fetch categories"));*/}
    },[]);

    const handleFilters = (myfilters, filterBy) => {
        const newFilters = {...filters};

        if(filterBy === 'gender'){
            newFilters[filterBy] = myfilters;
        }

        if(filterBy === 'doel'){
            newFilters[filterBy] = myfilters;
        }

        if(filterBy === 'address'){
            newFilters[filterBy] = myfilters;
        }

        if(filterBy === 'fullname'){
            newFilters[filterBy] = myfilters;
        }

        if(filterBy === 'leeftijd'){
            //alert(filterBy)
            const data = leeftijds;
            let arr = [];

            for(let i in data) {
                if(data[i].id === parseInt(myfilters)){
                    arr = data[i].arr;                
                }
            }
            newFilters[filterBy] = arr;
        }
        //alert(newFilters.gender);
        setFilters(newFilters);
        getFilteredTrainer(newFilters)
            .then(response => setTrainers(response.data))
            .catch(err => setError("Failed to Load"))
    }

    const showFilters = () => {
        return(
            <>
               <section className="content-area trianers_listing">
                        <div className="red-rectangle grey-bg"></div>
                                <div className="container">
                                    <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12"> 
                                          {/*For gender Filtering*/}
                                          <div className="trainer_select_wrap">
                                                <div className="form_group_row">
                                                    <div className="form_group">
                                                        <div className="trainer__slctr">
                        <ul>
                            <GenderFilter 
                                genders={genders}
                                handleFilters = {myfilters => handleFilters(myfilters, 'gender')}
                                />
                        </ul>
                </div>
                </div>
                </div></div></div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12"> 
                                          {/*For gender Filtering*/}
                                          <div className="trainer_select_wrap">
                                                <div className="form_group_row">
                                                    <div className="form_group">
                                                        <div className="trainer__slctr">
                    <ul>
                        <DoelFilter 
                                doels = {doels}
                                handleFilters = {myfilters => handleFilters(myfilters, 'doel')}
                            />
                        </ul>
                </div>
                </div>
                </div>
                </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12"> 
                                          {/*For gender Filtering*/}
                                          <div className="trainer_select_wrap">
                                                <div className="form_group_row">
                                                    <div className="form_group">
                                                        <div className="trainer__slctr">
                    <AgeFiltering
                        leeftijds = {leeftijds}
                        handleFilters = {myfilters => handleFilters(myfilters, 'leeftijd')}
                    />
                </div></div></div></div></div>
                
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12"> 
                                          {/*For gender Filtering*/}
                                          <div className="trainer_select_wrap">
                                                <div className="form_group_row">
                                                    <div className="form_group">
                                                        <div>
                    <LocationFiltering
                        address = {addresses}
                        handleFilters = {myfilters => handleFilters(myfilters, 'address')}
                    />
                </div></div></div></div></div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12"> 
                                          {/*For gender Filtering*/}
                                          <div className="trainer_select_wrap">
                                                <div className="form_group_row">
                                                    <div className="form_group">
                                                        <div>
                    <FullnameFiltering
                        fullnames = {fullnames}
                        handleFilters = {myfilters => handleFilters(myfilters, 'fullname')}
                    />
                </div></div></div></div></div>
            </div></div></section>

            </>
        )
    }
    return(
        <>
        <UserLayout>
        <Middle/>
        {showFilters()}
        
        <div className="container">
            <div className="row tr_lst_out_row" style={{marginTop: "3vw"}}>
         
{trainers && trainers.map((trainer)=>(
  trainer.role == 2 ? (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 tr_lst_out" key={trainer._id}>
          <a href={`/trainer-profile/${trainer._id}`}>
        <div className="trainers__list">
            <div style={{cursor: "pointer"}} className="trainers__list_img">
                <img src={`/uploads/${trainer.profile_img[0]}`} alt={trainer.fullname} className="img-fluid"/>
            </div>
            <div className="trainer_list_content">
                <h2 style={{textTransform: "uppercase"}}>{trainer.fullname}</h2>
                <div className="rating_trnr_sec d-flex justify-content-between align-items-center">
                    <div className="rating_tr d-flex align-items-center">
                        <RatingStars
                            edit={false}
                            value={5}
                        />
                        
                    </div>
                    <div className="see_btn_tr click_btn">
                        <button
                           
                        >Lees meer</button>
                    </div>
                </div>
                <div className="trainer_list_text">
                    <p>{trainer.bio}</p>
                </div>
            </div>
        </div>
        </a>
    </div>
  ):  (
      <>
      </>
  )
    ))}
</div>
</div>

<div className="row pagination-row">
                                        <div className="col-12">
                                            <Pagination
                                                
                                                itemsCountPerPage={9}
                                                
                                                pageRangeDisplayed={4}
                                                firstPageText="<< first"
                                                lastPageText="last >>"
                                                prevPageText="< prev"
                                                nextPageText="next >"
                                                itemClassFirst="pag-nav first"
                                                itemClassPrev="pag-nav"
                                                itemClassNext="pag-nav"
                                                itemClassLast="pag-nav last"
                                               
                                            />
                                            {/* <div className="trainer_pagination">
                                                <ul>
                                                    <li className="prev">
                                                        <img src="/images/right 2.png"/>
                                                    </li>
                                                    <li ><a href="#">1</a></li>
                                                    <li className="active"><a href="#">2</a></li>
                                                    <li><a href="#">3</a></li>
                                                    <li><a href="#">4</a></li>
                                                    <li className="next">
                                                        <img src="/images/right 1.png"/>
                                                    </li>
                                                </ul>
                                            </div> */}
                                        </div>
                                    </div>
        </UserLayout>
        </>
    );
}

export default TrainerLists;