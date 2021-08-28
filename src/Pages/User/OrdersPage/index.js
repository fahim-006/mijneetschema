import React, { Component } from "react";
import UserDashboardLayout from "../../../layouts/UserDashboardLayout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../../Redux/Actions";
import * as API from "../../../Redux/API/index";
import { createNotification } from "../../../helpers";
import moment from "moment";
import Loader from "../../../components/Loader/loader";

class OrdersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: 1,
      orderList: [],
      totalPages: 0,
      loading: true,
      sm_loader: false,
    };
  }

  componentDidMount() {
    this.getOrderList();
  }

  getOrderList = async () => {
    try {
      const response = await API.GetOrderListAPI(this.state.current_page);
      if (response.status === 200 && response.data.status === 200) {
        this.setState({
          orderList: response.data.data.ordersList,
          totalPages: parseInt(response.data.data.page),
          loading: false
        });
      } else if( response.status === 200 && response.data.status === 401 ){
        createNotification(
          "error",
          "Session Expired. Please login again"
        );
        let store = ["user_role", "user_details"];
        store.forEach((item) => localStorage.removeItem(item));
        this.setState({loading: false}, ()=>{
          this.props.history.push('/user-login')
        });
      }else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      createNotification(
        "error",
        "Something went wrong. Please try again."
      );
      this.setState({loading: false});
    }
  };

  handleRemoveOrder = async (orderId) => {
    try {
      const res = await API.RemoveOrderAPI(orderId);
      if (res.data.status == 200) {
        createNotification("success", "Order removed successfully");
        this.props.getOrdersList(1);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      createNotification("error", "Something went wrong, Try again later");
    }
  };

  handlePageChange = async (pageNo) => {
    this.setState(
      {
        current_page: pageNo,
      },
      () => {
        this.getOrderList();
      }
    );
  };
  handleNextPage = async () => {
    this.setState(
      {
        current_page: parseInt(this.state.current_page) + 1,
      },
      () => {
        this.getOrderList();
      }
    );
  };
  handlePreviousPage = async () => {
    this.setState(
      {
        current_page: parseInt(this.state.current_page) - 1,
      },
      () => {
        this.getOrderList();
      }
    );
  };

  handleReorder = (item) => {
    let t_Items = item.product_details.map((itm) => ({
      id: itm._id,
      product_type: itm.onModel,
      ingredientArr: itm.ingredient!=undefined?itm.ingredient:[],
    }));

    const orderDetails = {
      name: item.name,
      user_id: item.user_id,
      email: item.email,
      contact_no: item.contact_no,
      address: item.address,
      amount_without_tax: item.amount_without_tax, // amount_without_tax,
      amount_with_tax: item.amount_with_tax, // amount_with_tax,
      total: item.amount_without_tax,
      product_description: "Product Purchase From Mijneet", // We'll set it later
      products: t_Items,
      landmark: item.landmark,
      city: item.city,
      pincode: item.pincode,
      couponCode: item.coupon_code,
      state: item.state,
      alternate_phone: item.alternate_phone,
    };

    localStorage.setItem("prodPayDetails", JSON.stringify(orderDetails));

    const req_body = {
      name: item.name,
      user_id: item.user_id,
      email: item.email,
      contact_no: item.contact_no,
      address: item.address,
      total: item.amount_without_tax,
      product_description: "Product Purchase From Mijneet", // We'll set it later
      products: t_Items,
      couponCode: item.coupon_code,
    }
    this.setState({
      sm_loader: true
    });
    this.props.buyProduct(req_body);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.prod_payment_url !== this.props.prod_payment_url) {
      this.setState({sm_loader: false}, () => {
        window.location = `${this.props.prod_payment_url}`;
      });
    }
  }
  render() {
    return (
      <UserDashboardLayout>
        <div className="trnr_nav_cntnt">
          <div className="adprdct_nav_iner">
            <h2>Mijn bestellingen</h2>

            <div className="prdct_tabl_tr order_table-user">
              {this.state.loading ? 
                <Loader />
                :
                <div>

                  {/**
                   * Keep the search section. Don't remove.
                   **/}

                  {/* <div id="main_search" className="searchTables_filter">
                    <label>
                      Search:
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder=""
                        aria-controls="example"
                      />
                    </label>
                  </div> */}
                  
                    <table
                      id="example"
                      className="table table-striped table-bordered"
                      style={{ width: "100%", border: "solid 1px lightgray" }}
                    >
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Datum</th>
                          <th>Totaal</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.orderList && this.state.orderList.length ?
                         this.state.orderList.map((orderData) => (
                          <tr key={orderData._id}>
                            <td>{orderData.order_id}</td>
                            <td>
                              {moment(orderData.created_at).format("MMM Do YY")}
                            </td>
                            <td>{orderData.total}</td>
                            <td>
                              <div className="trnr_dash_action ordrs_btn_wrap reorder_wrap">
                                <button 
                                  className="Opnieuw bestellen"
                                  onClick={(e) => this.handleReorder(orderData)}
                                >
                                  {this.state.sm_loader ? <Loader smaller={"small"}/> : "Reorder"}
                                </button>
                                <a
                                  className="rmv"
                                  onClick={() => {
                                    this.handleRemoveOrder(orderData.order_id);
                                  }}
                                >
                                  Verwijderen
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))
                        :
                        <tr>
                          <td colSpan="4"> Nog geen order geplaatst </td>
                        </tr>
                      }
                      </tbody>
                    </table>
                  
                  {this.state.orderList && this.state.orderList.length ?
                    <div className="changes-2">
                      <ul className="pagination">
                        <li
                          className="paginate_button page-item previous disabled"
                          id="example_previous"
                          onClick={() => {
                            if (this.state.current_page > 1) {
                              this.handlePreviousPage();
                            }
                          }}
                        >
                          <a
                            href="#"
                            aria-controls="example"
                            data-dt-idx="0"
                            tabIndex="0"
                            className="page-link"
                          >
                            Previous
                          </a>
                        </li>
                        {Array.apply(null, Array(this.state.totalPages)).map(
                          (value, index) => (
                            <li
                              onClick={() => {
                                this.handlePageChange(index + 1);
                              }}
                              className="paginate_button page-item active"
                              key={index}
                            >
                              <a
                                href="#"
                                aria-controls="example"
                                data-dt-idx="1"
                                tabIndex="0"
                                className="page-link"
                              >
                                {index + 1}
                              </a>
                            </li>
                          )
                        )}
                        <li
                          className="paginate_button page-item next disabled"
                          id="example_next"
                          onClick={() => {
                            if (
                              this.state.current_page < this.state.totalPages
                            ) {
                              this.handleNextPage();
                            }
                          }}
                        >
                          <a
                            href="#"
                            aria-controls="example"
                            data-dt-idx="2"
                            tabIndex="0"
                            className="page-link"
                          >
                            Next
                          </a>
                        </li>
                      </ul>
                    </div>
                    :
                    null
                  }
                </div>
              }

            </div>
          </div>
        </div>
      </UserDashboardLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  listArr: state.UserDash.listArr,
  list_error: state.UserDash.list_error,
  list_err_msg: state.UserDash.list_err_msg,
  list_success: state.UserDash.list_success,
  prod_payment_url: state.Products.prod_payment_url,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrdersList: Actions.getOrdersList,
      buyProduct: Actions.buyProduct,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(OrdersPage);
