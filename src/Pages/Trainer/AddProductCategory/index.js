import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../../Redux/Actions';
import DashboardLayout from '../../../layouts/DashboardLayout'
import Loader from '../../../components/Loader/loader';

class AddProductCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
        category: '',
        errors: {},
        loader:false,
        successMsg:'',
        showSuccessMsg:'',
    };
}

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

isValid = () => {
  const { category } = this.state;
  let error = {};
  let formIsValid = true;
  
  if (category === '') {
      formIsValid = false;
      error['category'] = "*Please enter category.";
  }
  this.setState({ ...this.state.errors, errors: error });
  return formIsValid;
}

handleSubmit = () => {
  if (this.isValid()) {
      const { category } = this.state;
      const requestbody = { category  };
      this.props.addCategory(requestbody);
      this.setState({loader:true});
  }
}

   componentDidUpdate(prevProps , prevState)
    {
     if(this.props.products.success)
      {
        let st= (prevState.loader? this.setState({loader:false,category:'',showSuccessMsg:true,successMsg:this.props.products.message}):null)
      }
       
    }
  render() {
    const { category, errors ,loader,successMsg,showSuccessMsg} = this.state;

    return (
        <DashboardLayout>
             <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
               <h1 className="h3 mb-0 text-gray-800 page_head_dash d-flex justify-content-between align-items-center"><span>Add Product Category</span></h1>
              </div>
              {loader ?
                   <Loader />
                     :
                      
                      <div className="ep_inner">
                            {(showSuccessMsg)? <span className="successMsg">{successMsg}</span> :null  } 
                                    <div className="mail_input_epi">
                                        <div className="form_group rltv_item">
                                            <input
                                                name="category"
                                                type="text"
                                                value={category}
                                                onChange={this.handleChange}
                                                placeholder="Product Category"
                                            />
                                        </div>
                                        <span><p> {errors.category} </p></span>
                                     
                                        <div className="form_group_submit" onClick={()=>this.handleSubmit()}>
                                           Add
                                        </div>
                                    </div>
                                </div>
               }
         </DashboardLayout>
    )
  }

}


const mapStateToProps = state => ({
  products: state.Products
});

const mapActionsToProps = dispatch =>
  bindActionCreators(
      {
          addCategory: Actions.addCategoryRequest
      },
      dispatch
  );
export default connect(mapStateToProps, mapActionsToProps)(AddProductCategory);

