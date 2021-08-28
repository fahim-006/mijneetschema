import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../../Redux/Actions";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Loader from "../../../components/Loader/loader";
import Moment from "react-moment";
import * as API from "../../../Redux/API/index";
import { createNotification } from "../../../helpers";

class ListProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      errors: {},
      loader: true,
      totalPages: 0,
      current_page: 1,
      productList:[]
    };
  }

  handleDelete = async (productId) => {
    this.setState({ loader: true });
    const response = await API.DeleteProductAPI(productId);
    if (response.data.status == 200) {
      createNotification("success", "Product deleted");
      this.props.listProducts();
    } else {
      createNotification(
        "error",
        "Something went wrong, please try again later."
      );
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount() {
    this.getProductList();
  }

  getProductList = async () => {
    try {
      const response = await API.ListProductsAPI(this.state.current_page);
      if (response.status === 200 && response.data.status === 200) {
        this.setState({
          productList: response.data.data.productList,
          totalPages: parseInt(response.data.data.page),
          loader: false,
        });
      } else if (response.status === 200 && response.data.status === 401) {
        createNotification("error", "Session Expired. Please login again");
        let store = ["user_role", "user_details"];
        store.forEach((item) => localStorage.removeItem(item));
        this.setState(
          {
            loader: false,
          },
          () => {
            this.props.history.push("/trainer-login");
          }
        );
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      createNotification(
        "error",
        "Something went wrong. Please try again later"
      );
      this.setState({ loader: false });
    }
  };

  handlePageChange = async (pageNo) => {
    this.setState(
      {
        current_page: pageNo,
      },
      () => {
        this.getProductList();
      }
    );
  };
  handleNextPage = async () => {
    this.setState(
      {
        current_page: parseInt(this.state.current_page) + 1,
      },
      () => {
        this.getProductList();
      }
    );
  };
  handlePreviousPage = async () => {
    this.setState(
      {
        current_page: parseInt(this.state.current_page) - 1,
      },
      () => {
        this.getProductList();
      }
    );
  };

  render() {
    const { errors, loader, productList } = this.state;
    return (
      <DashboardLayout>
        <div className="trnr_nav_cntnt">
          <div className="adprdct_nav_iner">
            <h2>Products Listing</h2>
            <div className="prdct_tabl_tr">
              {loader ? (
                <Loader />
              ) : (
                <div>
                  <table
                    className="table table-striped table-bordered"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>File</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>SKU</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.length > 0 &&
                        productList.map((data, index) => {
                          return (
                            <tr>
                              <td>
                                <div className="trnr_prdct_img">
                                  <img
                                    src={
                                      process.env.REACT_APP_IMAGE_URL +
                                      data.product_img
                                    }
                                    className="img-fluid"
                                  />
                                </div>
                              </td>
                              <td>{data.name}</td>
                              <td>{data.category_id.category}</td>
                              <td>{data.sku}</td>
                              <td>${data.price}</td>
                              <td>{data.description}</td>
                              {/* <td>
                              <Moment format="YYYY/MM/DD">
                                {data.created_at}
                              </Moment>
                            </td>
                             */}
                              <td>
                                <div className="trnr_dash_action">
                                  <Link
                                    to={`/trainer/edit-products/${data._id}`}
                                  >
                                    <i
                                      className="fa fa-pencil-square"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                  <a
                                    onClick={() => {
                                      this.handleDelete(data._id);
                                    }}
                                  >
                                    <i
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

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
                          if (this.state.current_page < this.state.totalPages) {
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
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.Products,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      listProducts: Actions.listProductsRequest,
    },
    dispatch
  );
export default connect(mapStateToProps, mapActionsToProps)(ListProducts);
