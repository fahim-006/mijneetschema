import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../../Redux/Actions";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Loader from "../../../components/Loader/loader";
import { createNotification } from "../../../helpers";

class AddProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {
        name: "",
        price: "",
        sku: "",
        description: "",
        category: "",
      },
      categories: [],
      image: "",
      errors: {},
      loader: true,
      successMsg: "",
      showSuccessMsg: "",
    };

    this.onChange = this.onChange.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

  fileChangedHandler = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  onChange(el) {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let statusCopy = Object.assign({}, this.state);
    statusCopy.products[inputName] = inputValue;
    this.setState(statusCopy);
    this.setState({ error: {} });
  }

  isValid = () => {
    const { name, sku, price, description, category } = this.state.products;
    let error = {};
    let formIsValid = true;
    const regxPrice = /[(0-9)+.?(0-9)*]+$/;

    if (name === "") {
      formIsValid = false;
      error["name"] = "*Please enter product name.";
    }
    if (sku === "") {
      formIsValid = false;
      error["name"] = "*Please enter product sku.";
    }
    if (description === "") {
      formIsValid = false;
      error["name"] = "*Please enter product description.";
    }
    if (price === "") {
      formIsValid = false;
      error["name"] = "*Please enter product price.";
    }
    if (price && regxPrice.test(price) === false) {
      formIsValid = false;
      error["price"] = "*Please enter a valid price.";
    }
    if (category === "") {
      formIsValid = false;
      error["name"] = "*Please select category.";
    }
    if (this.state.image === "") {
      formIsValid = false;
      error["name"] = "*Please select image.";
    }
    this.setState({ ...this.state.errors, errors: error });
    return formIsValid;
  };

  handleSubmit = () => {
    if (this.isValid()) {
      const { category } = this.state;
      const formData = new FormData();
      formData.append("name", this.state.products.name);
      formData.append("category", this.state.products.category);
      formData.append("price", this.state.products.price);
      formData.append("sku", this.state.products.sku);
      formData.append("description", this.state.products.description);
      formData.append("image", this.state.image);

      this.props.addProduct(formData);
      this.setState({ loader: true });
    }
  };

  componentDidMount() {
    this.props.listCategory();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.products.success && this.state.loader) {
      let st = prevState.loader
        ? this.setState({
            loader: false,
            categories: this.props.products.categories,
          })
        : null;
    }
    if (this.props.products.productSuccess && this.state.loader) {
      let st = prevState.loader
        ? this.setState({
            loader: false,
            category: "",
            showSuccessMsg: true,
            successMsg: this.props.products.message,
          })
        : null;
      createNotification("success", "Product added successfully", "");
    }
    if (this.props.products.productError && this.state.loader) {
      let st = prevState.loader
        ? this.setState({ loader: false, showSuccessMsg: false })
        : null;
      createNotification("error", this.props.products.message, "");
    }
  }
  render() {
    const {
      errors,
      loader,
      successMsg,
      showSuccessMsg,
      products,
      image,
      categories,
    } = this.state;

    return (
      <DashboardLayout>
        <div className="trnr_nav_cntnt">
          {loader ? <Loader /> : null}

          {showSuccessMsg ? (
            <span className="successMsg">{successMsg}</span>
          ) : null}
          <div className="adprdct_nav_iner">
            <h2>Add Your Product Details</h2>
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    name="name"
                    type="text"
                    value={products.name}
                    onChange={this.onChange.bind(this)}
                    placeholder="Product Name"
                    className="form-control"
                    id="productName"
                  />
                  <span>
                    <p> {errors.name} </p>
                  </span>

                  {/* <input
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="Product Name"
                  /> */}
                </div>
                <div className="form-group col-md-6">
                  <select
                    name="category"
                    type="text"
                    value={products.category}
                    onChange={this.onChange.bind(this)}
                    placeholder="Product Name"
                  >
                    <option value="">Select Category</option>
                    {categories.length > 0 &&
                      categories.map((data, index) => {
                        return (
                          <option value={data._id} key={index}>{data.category}</option>
                        );
                      })}
                  </select>
                  <span>
                    <p> {errors.category} </p>
                  </span>

                  {/* <select
                    name="category"
                    type="text"
                    placeholder="Product Name"
                  >
                    <option value>Select Category</option>
                    <option value>First Category</option>
                    <option value>Second Category</option>
                  </select> */}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    name="sku"
                    type="text"
                    value={products.sku}
                    onChange={this.onChange.bind(this)}
                    placeholder="Product Sku"
                    id="Pincode"
                    className="form-control"
                  />
                  <span>
                    <p> {errors.sku} </p>
                  </span>

                  {/* <input
                    type="text"
                    className="form-control"
                    id="Pincode"
                    placeholder="Product SKU"
                  /> */}
                </div>

                <div className="form-group col-md-6">
                  <input
                    name="price"
                    type="text"
                    value={products.price}
                    onChange={this.onChange.bind(this)}
                    placeholder="Product price"
                    id="Locality"
                    className="form-control"
                  />
                  <span>
                    <p> {errors.price} </p>
                  </span>

                  {/* <input
                    type="text"
                    className="form-control"
                    id="Locality"
                    placeholder="Product Price"
                  /> */}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-12">
                  <textarea
                    name="description"
                    type="text"
                    value={products.description}
                    onChange={this.onChange.bind(this)}
                    placeholder="Product Description"
                    className="form-control"
                    id="Address"
                  />
                  <span>
                    <p> {errors.description} </p>
                  </span>
                  {/* 
                  <textarea
                    className="form-control"
                    id="Address"
                    rows={4}
                    placeholder="Product Description"
                    spellCheck="false"
                    defaultValue={""}
                  /> */}
                </div>
              </div>
              <div className="form-row">
                <div className="form_group col-md-12">
                  {/* <input name="image" type="file" /> */}
                  <input
                    name="image"
                    type="file"
                    onChange={this.fileChangedHandler}
                  />
                  <span>
                    <p></p>
                  </span>
                  <span>
                    <p> {errors.image} </p>
                  </span>
                </div>
              </div>
              <div className="form-row proceed-btn">
                <div className="form-group col-md-12">
                  <div className="click_btn">
                    {/* <div
                    className="form_group_submit"
                    onClick={() => this.handleSubmit()}
                  >
                    Add Product
                  </div> */}
                    <button onClick={() => this.handleSubmit()} type="button">
                      Add Product
                    </button>
                    <i className="fa fa-long-arrow-right" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* ------------------ */}

        {/* <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
          <h1 className="h3 mb-0 text-gray-800 page_head_dash d-flex justify-content-between align-items-center">
            <span>Add Product Category</span>
          </h1>
        </div>

        {loader ? <Loader /> : null}
        <div className="ep_inner">
          {showSuccessMsg ? (
            <span className="successMsg">{successMsg}</span>
          ) : null}
          <div className="mail_input_epi">
            <div className="form_group rltv_item">
              <input
                name="name"
                type="text"
                value={products.name}
                onChange={this.onChange.bind(this)}
                placeholder="Product Name"
              />
              <span>
                <p> {errors.name} </p>
              </span>
            </div>

            <div className="form_group rltv_item">
              <select
                name="category"
                type="text"
                value={products.category}
                onChange={this.onChange.bind(this)}
                placeholder="Product Name"
              >
                <option value="">Select Category</option>
                {categories.length > 0 &&
                  categories.map((data, index) => {
                    return <option value={data._id}>{data.category}</option>;
                  })}
              </select>
              <span>
                <p> {errors.category} </p>
              </span>
            </div>

            <div className="form_group rltv_item">
              <input
                name="sku"
                type="text"
                value={products.sku}
                onChange={this.onChange.bind(this)}
                placeholder="Product Sku"
              />
              <span>
                <p> {errors.sku} </p>
              </span>
            </div>

            <div className="form_group rltv_item">
              <input
                name="price"
                type="text"
                value={products.price}
                onChange={this.onChange.bind(this)}
                placeholder="Product price"
              />
              <span>
                <p> {errors.price} </p>
              </span>
            </div>

            <div className="form_group rltv_item">
              <textarea
                name="description"
                type="text"
                value={products.description}
                onChange={this.onChange.bind(this)}
                placeholder="Product Description"
              />
              <span>
                <p> {errors.description} </p>
              </span>
            </div>

            <div className="form_group rltv_item">
              <input
                name="image"
                type="file"
                onChange={this.fileChangedHandler}
              />
              <span>
                <p> {errors.image} </p>
              </span>
            </div>

            <div
              className="form_group_submit"
              onClick={() => this.handleSubmit()}
            >
              Add Product
            </div>
          </div>
        </div> */}
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
      listCategory: Actions.listCategoryRequest,
      addProduct: Actions.addProductRequest,
    },
    dispatch
  );
export default connect(mapStateToProps, mapActionsToProps)(AddProducts);
