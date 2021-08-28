import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../../Redux/Actions';
import DashboardLayout from '../../../layouts/DashboardLayout'
import Loader from '../../../components/Loader/loader';

class ListProductCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
        categories: [],
        errors: {},
        loader:true
    };
}

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

   componentDidMount()
   {
    this.props.listCategory();
   }

   componentDidUpdate(prevProps , prevState)
    {
     if(this.props.products.success)
      {
        
        let st= (prevState.loader? this.setState({loader:false,categories:this.props.products.categories}):null)
      }
       
    }
  render() {
    const {  errors ,loader,showSuccessMsg,categories} = this.state;
    return (
        <DashboardLayout>
             <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
               <h1 className="h3 mb-0 text-gray-800 page_head_dash d-flex justify-content-between align-items-center"><span>List Product Category</span></h1>
              </div>
              {loader ?
                   <Loader />
                     :
                      
                      <div className="ep_inner">
                        <table id="example" className="table table-striped table-bordered" style={{'width':'100%'}}>
                        <thead>
                            <tr>
                                <th>Sr no</th>
                                <th>Category</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {categories.length > 0 && categories.map((data,index)=> {
                        
                        return    <tr>
                                <td>{index+1}</td>
                                <td>{data.category}</td>
                                <td>{data.created_at}</td>
                                <td>&nbsp;</td>
                            </tr>

                        })}    
                            
                        
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Sr no</th>
                                <th>Category</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>
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
          listCategory: Actions.listCategoryRequest
      },
      dispatch
  );
export default connect(mapStateToProps, mapActionsToProps)(ListProductCategory);

