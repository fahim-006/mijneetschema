import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../../Redux/Actions";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Loader from "../../../components/Loader/loader";
import * as API from '../../../Redux/API/index'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class EditProducts extends Component {
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
    // if (this.state.image === "") {
    //   formIsValid = false;
    //   error["name"] = "*Please select image.";
    // }
    this.setState({ ...this.state.errors, errors: error });
    return formIsValid;
  };

  handleSubmit = async () => {
    if (this.isValid()) {
      const { category } = this.state;
      const formData = new FormData();
      formData.append("name", this.state.products.name);
      formData.append("category", this.state.products.category);
      formData.append("price", this.state.products.price);
      formData.append("sku", this.state.products.sku);
      formData.append("description", this.state.products.description);
      formData.append("image", this.state.image);

      this.setState({ loader: true });
      const response = await API.UpdateProductAPI(this.state.products._id,formData);
      if(response.data.status==200){
        toast("Product Updated")
        this.componentDidMount()
      }
      else{
        toast("Something Went wrong. Please try again later")
        this.setState({loader:false})

      }
    }
  };

  async componentDidMount() {
    this.props.listCategory();
    let response = await API.ListSingleProductAPI({product_id: this.props.match.params.productId })
    if(response.data.status==200){
      this.setState({
        loader:false,
        products:response.data.data
      })
    }

    
    let statusCopy = Object.assign({}, this.state);
    statusCopy.products["category"] = response.data.data.category_id._id;
    this.setState(statusCopy,()=>{console.log("shagfs",this.state);});


     API.ListCategoryAPI().then((CategoryData) =>{
       if(CategoryData.data.status==200){
         this.setState({
          categories:CategoryData.data.data
         })
       }
     })
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
        <ToastContainer 
          autoClose={3000}
          hideProgressBar={true}
          pauseOnHover
          closeOnClick
        />
        <div className="trnr_nav_cntnt">
          {loader ? <Loader /> : null}

          {showSuccessMsg ? (
            <span className="successMsg">{successMsg}</span>
          ) : null}
          <div className="adprdct_nav_iner">
            <h2>Edit Your Product Details</h2>
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
                          <option 
                            value={data._id} 
                            key={index}
                            selected={data._id==products.category_id._id
                              ?
                              true
                              :
                              false
                            } 
                          >
                            {data.category}
                          </option>
                        );
                      })}
                  </select>
                  <span>
                    <p> {errors.category} </p>
                  </span>
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
                </div>
              </div>
              <div className="form-row">
                <div className="form_group col-md-12">
                  <input
                    name="image"
                    type="file"
                    onChange={this.fileChangedHandler}
                  />
                  <span>
                    <p>
                      {
                        products.product_img &&
                      <img src = {`${process.env.REACT_APP_IMAGE_URL}${products.product_img}`} width="45" height="45"/>
                      }
                    </p>
                  </span>
                  <span>
                    <p> {errors.image} </p>
                  </span>
                </div>
              </div>
              <div className="form-row proceed-btn">
                <div className="form-group col-md-12">
                  <div className="click_btn">
                    <button onClick={() => this.handleSubmit()} type="button">
                      Update Product
                    </button>
                    <i className="fa fa-long-arrow-right" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  // products: state.Products,
  products: state.Products.single_product,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      listCategory: Actions.listCategoryRequest,
      listSingleProduct: Actions.listSingleProductRequest,
      addProduct: Actions.addProductRequest,
    },
    dispatch
  );
export default connect(mapStateToProps, mapActionsToProps)(EditProducts);
