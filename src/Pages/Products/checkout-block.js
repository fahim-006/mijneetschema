import React, { Component } from 'react';

const CheckOutBlock = (props) => {
    let userDetails = localStorage.getItem('user_details') && JSON.parse(localStorage.getItem('user_details'));
    // user_id:'',name:'',email:'',contact_no:'',addruserDetailsess:'',amount_without_tax:'',amount_with_tax:'',total:'',payment_id:''
    const {
        name, contact_no, pincode, city, address, state, landmark, errors, email,
        alternate_contact_no, handleAddressChange, handleDeliverProcess
    } = props;
    return (
        <div className="block">
            <div className="heading-cart-row">
                <div className="heading-cart-col cart-image da-head">Delivery Address</div>
            </div>
            <div className="heading-cart-row product-row-cart address-form-row">
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                value={name}
                                className="form-control"
                                id="inputName"
                                placeholder="*Name"
                                name="name"
                                onChange={handleAddressChange}
                            />
                            <p className="error_mesage"> {errors.name} </p>
                        </div>
                        <div className="form-group col-md-6">
                            <input
                                type="tel"
                                value={contact_no}
                                className="form-control"
                                id="inputPhone"
                                placeholder="*Phone"
                                name="contact_no"
                                onChange={handleAddressChange}
                                maxLength="10"
                                pattern="[789][0-9]\d"
                            />
                            <p className="error_mesage"> {errors.contact_no} </p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input
                                type="number"
                                value={pincode}
                                className="form-control"
                                id="Pincode"
                                placeholder="*Pincode"
                                name="pincode"
                                onChange={handleAddressChange}
                            />
                            <p className="error_mesage"> {errors.pincode} </p>
                        </div>
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                value={city}
                                className="form-control"
                                id="Location"
                                placeholder="*City/District/Town"
                                name="city"
                                onChange={handleAddressChange}
                            />
                            <p className="error_mesage"> {errors.city} </p>
                        </div>
                        {/* <div className="form-group col-md-6">
                            <input type="text" value={} className="form-control" id="Locality" placeholder="Locality" />
                        </div> */}
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <textarea
                                className="form-control"
                                value={address}
                                id="Address"
                                rows="3"
                                placeholder="*Address"
                                spellCheck="false"
                                name="address"
                                onChange={handleAddressChange}
                            >
                            </textarea>
                            <p className="error_mesage"> {errors.address} </p>
                        </div>
                    </div>
                    <div className="form-row">
                        {/* <div className="form-group col-md-6">
                            <input type="text" value={} className="form-control" id="Location" placeholder="City/District/Town" />
                        </div> */}
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                value={state}
                                className="form-control"
                                id="State"
                                placeholder="*State"
                                name="state"
                                onChange={handleAddressChange}
                            />
                            <p className="error_mesage"> {errors.state} </p>
                        </div>
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                value={landmark}
                                className="form-control"
                                id="Landmark"
                                placeholder="*Landmark"
                                name="landmark"
                                onChange={handleAddressChange}
                            />
                            <p className="error_mesage"> {errors.landmark} </p>
                        </div>
                    </div>
                    {userDetails && userDetails._id ?
                        <></>
                        :
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input
                                    type="email"
                                    value={email}
                                    className="form-control"
                                    id="email"
                                    placeholder="*Email"
                                    name="email"
                                    onChange={handleAddressChange}
                                />
                                <p className="error_mesage"> {errors.email} </p>
                            </div>

                            <div className="form-group col-md-6">
                                <input
                                    type="tel"
                                    value={alternate_contact_no}
                                    className="form-control"
                                    id="AlternatePhone"
                                    placeholder="Alternate Phone (Optional)"
                                    name="alternate_contact_no"
                                    onChange={handleAddressChange}
                                />
                                <p className="error_mesage"> {errors.alternate_contact_no} </p>
                            </div>
                        </div>
                    }
                    <div className="form-row proceed-btn">
                        <div className="form-group col-md-12">
                            <div className="click_btn">
                                <button
                                    type="button"
                                    onClick={e => {
                                            handleDeliverProcess()
                                        }
                                    }
                                >
                                    Proceed to Pay
                                </button>
                                <i className="fa fa-long-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CheckOutBlock;