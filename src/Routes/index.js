import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateTrainerRoute from './privateTrainerRoutes';
import PrivateUserRoute from './privateUserRoutes';
import HomePage from '../components/HomePage';
import PageNotFound from '../components/PageNotFound';
import { withRouter } from 'react-router';
import FinishSteps from '../components/FinishSteps';
import TrainerPages from '../Pages/TrainerPages';
import UserPages from '../Pages/UserPages';
import EditProfile from '../Pages/Trainer/Dashboard/EditProfile'

import ProductsPage from '../Pages/Products';
import MealsPage from '../Pages/Meals';
import MealDetail from '../Pages/MealDetails';

import ProductsByCategoryPage from '../Pages/ProductsByCategory';
import CartPage from '../Pages/Products/shopping-cart';
import SubscriptionPage from '../Pages/Trainer/Subscription';
import SubscriptionSuccess from '../Pages/Trainer/Subscription/subscription-success';
import TrainerDashboard from '../Pages/Trainer/Dashboard';
import AddProductCategory from '../Pages/Trainer/AddProductCategory';
import ListProductCategory from '../Pages/Trainer/ListProductCategory';
import AddProducts from '../Pages/Trainer/AddProducts';
import EditProducts from '../Pages/Trainer/EditProducts';
import ListProducts from '../Pages/Trainer/ListProducts';
import AddVideo from '../Pages/Trainer/AddVideo';
import EditVideo from '../Pages/Trainer/EditVideo';
import ListVideo from '../Pages/Trainer/ListVideo';
import UserDashboard from '../Pages/User/Dashboard';
import Home from '../Pages/Home';
import PurchaseSuccess from '../components/DietCalculator/PurchaseSuccess';
import ProductDetail from '../Pages/ProductDetails';
import ProdPaymentSuccess from '../Pages/Products/prod-payment-success';
import WishlistPage from '../Pages/WishList';
import SecureCheckout from '../Pages/Products/secure-checkout';
import TrainersList from '../Pages/TrainerPages/TrainersList';
import TrainerDetail from '../Pages/TrainerPages/TrainersList/trainer-details';
import Chat from '../Pages/Trainer/chat';
import UserChat from '../Pages/User/chat';
import OrdersPage from '../Pages/User/OrdersPage';
import DietPlan from '../Pages/User/DietPlan';
import CalculationResult from '../components/CalculationResult';
import CreateNewsletter from '../components/Newsletter/createNewsletter';

const Routes = (props) => (
	<div>
		<Switch>
		    <Route exact path="/" component={Home} />
			<Route exact path="/calculator" component={HomePage} />
			<Route exact path="/newsletter" component={CreateNewsletter} />
			<Route path="/user-login" component={UserPages} />
			<Route path="/trainer-login" component={TrainerPages} />
			<Route path="/trainer-subscription" component={SubscriptionPage} />
			<Route exact path="/subscription-success" component={SubscriptionSuccess} />
			<Route path="/finish" component={FinishSteps} />
			<Route exact path="/purchase-success" component={PurchaseSuccess}/> 
			<Route path="/products" component={ProductsPage} />
			<Route path="/product-detail/:id" component={ProductDetail} />
			<Route path="/product/category/:id" component={ProductsByCategoryPage} />
			<Route path="/shopping-cart" component={CartPage}/>
			<Route exact path="/payment-success" component={ProdPaymentSuccess}/> {/* For Product payment*/}
			<Route path="/secure-checkout" component={SecureCheckout}/>
			<Route path="/trainer/chat" component={Chat}/>
			<Route path="/calculation-result" component={CalculationResult} />
{/* -----meals----- */}
			<Route path="/meals" component={MealsPage} />
			<Route path="/meal-detail/:id" component={MealDetail} />
{/* -----meals----- */}
			<Route path="/trainers-list" component={TrainersList}/>
			<Route path="/trainer-profile/:id" component={TrainerDetail}/>
			<Route path="/trainer-dashboard" component={TrainerDashboard} />

			<Route path="/edit-profile-trainer" component={EditProfile} />
			<PrivateTrainerRoute path="/trainer/add-category" component={AddProductCategory} />
			<PrivateTrainerRoute path="/trainer/list-category" component={ListProductCategory} />
			<PrivateTrainerRoute path="/trainer/add-products" component={AddProducts} />
			<PrivateTrainerRoute path="/trainer/edit-products/:productId" component={EditProducts} />
			<PrivateTrainerRoute path="/trainer/list-products" component={ListProducts} />
			<PrivateTrainerRoute path="/trainer/add-video" component={AddVideo} />
			<PrivateTrainerRoute path="/trainer/udapte-video/:videoId" component={EditVideo} />
			<PrivateTrainerRoute path="/trainer/list-video" component={ListVideo} />
			<PrivateUserRoute path="/user-dashboard" component={UserDashboard} />
			<PrivateUserRoute path="/user/chat" component={UserChat} />
			<PrivateUserRoute path="/user/diet-plan" component={DietPlan} />
			<PrivateUserRoute path="/user/orders" component={OrdersPage} />

			<PrivateUserRoute path="/wishlist" component={WishlistPage} />
			<Route exact path="*" component={PageNotFound} />
		</Switch>
		
	</div>
);

export default withRouter(Routes);

