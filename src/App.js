import Homepage from './component/pages/Homepage';
import Card from './component/pages/Items';
import Footer from './component/pages/Footer';

import Login from './component/User/Login';
import Register from './component/User/Register';
import Forgot from './component/User/Forgot';
import Reset from './component/User/Reset';

import UserHome from './component/User/User-Home';
import Menu from './component/User/Menu';
import subcategory from './component/User/Subcategory';
import UserProfile from './component/User/User-Profile';
import OfferPage from './component/User/OfferPage';
import OrdersList from './component/User/Order-List';
import BookTable from './component/User/Book-table';

import Admin from './component/Admin/Admin-login';
import AdminReset from './component/Admin/Admin-reset';
import AdminForgot from './component/Admin/Admin-Forgot';
import Sidebar from './component/Admin-sidebar/Sidebar';
import AdminDashboard from './component/Admin/Dashboard';
import Category from './component/Admin/Category';
import OrdersHistory from './component/Admin/OrdersHistory';
import ViewCook from './component/Admin/ViewCook';
import ViewUser from './component/Admin/ViewUser';
import ViewWaiter from './component/Admin/ViewWaiter';
import ViewManager from './component/Admin/ViewManager';
import Ratings from './component/Admin/Ratings';
import AddStaff from './component/Admin/AddStaff';
import Complaint from './component/Admin/Complaints';
import Revenue from './component/Admin/Revenue';
import CreateTable from './component/Admin/CreateTable';
import RDetails from './component/Admin/RDetails';
import Offer from './component/Admin/Offer';
// import Payment from './Pages/Payment';
import Ingredients from './component/Admin/Ingredients';


import Manager from './component/Manager/Manager-login';
import Dashboard from './component/Manager/Dashboard';
import ManagerForgot from './component/Manager/Manager-Forgot';
import ManagerReset from './component/Manager/Manager-reset';
import ManagerHome from './component/Manager/ManagerHome';
import ManagersRegister from './component/Manager/register-cook';
import Review from './component/Manager/review';
import Complaints from './component/Manager/Complaints';
import viewCook from './component/Manager/View-cook';
import viewWaiter from './component/Manager/View-waiter';
import AddCategory from './component/Manager/Add-Category';
import AddIngrediants from './component/Manager/Add-Ingrediants'; 
import Waiter from './component/Waiter/Waiter-login';
import WaiterForgot from './component/Waiter/Waiter-forgot';
import WaiterReset from './component/Waiter/Waiter-reset';
import PendingOrders from './component/Manager/Pending-order';
import DoneOrders from './component/Manager/Done-Order';
import ParcelOrders from './component/Manager/Parcel-order';
import RevenuePage from './component/Manager/RevenuePage';
import AddTable from './component/Manager/Add-Tabel';
import SetOffers from './component/Manager/All-offer';
import TableOrder from './component/Manager/Table-Order';
import Parcels from './component/Manager/Live-parcel';
import RegisterWaiter from './component/Manager/register-waiter';
import ParcelDone from './component/Manager/Parcel-DoneOrder';

import Cook from './component/Cook/Cook-login';
import CookHome from './component/Cook/Cook-home';
import CookForgot from './component/Cook/Cook-forgot';
import CookReset from './component/Cook/Cook-reset';
import OrderList from './component/Cook/OrderList';
import MenuList from './component/Cook/MenuList';
import DeliverdItem from './component/Cook/Deliverd-Item';
import ProcessOrder from './component/Cook/Process-order';
import RejectOrder from './component/Cook/Cancle-order';
import CookMenu from './component/Cook/MenuList';

import Product from './component/Product';
import Cart from './component/User/Cart';
import Orders from './component/User/Orders';


import ListTable from "./component/Waiter/ListTable";
import WaiterMenu from "./component/Waiter/WaiterMenu";
import WaiterCart from "./component/Waiter/WaiterCart";
import WaiterBookTable from "./component/Waiter/BookTable";
import CreateComplaints from "./component/Waiter/CreateComplaints";
import waiterpopup from './component/Waiter/popup';
import Waiterforget from './component/Waiter/forget';


import MenuData from './component/User/MenuList';

import { BrowserRouter as Router, Switch , Route} from 'react-router-dom';
import './App.css';
import parcelOrder from './component/Manager/Live-parcel';

function App() {
  return (
    <div className="App">
      
      <Router>
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path='/card' component={Card} />
        <Route path='/about' component={Footer} />

        <Route path='/Login' component={Login} />
        <Route path='/sign-up' component={Register} />
        <Route path='/forgot' component={Forgot} />
        <Route path='/reset' component={Reset} />

        <Route path='/admin-login' component={Admin} />
        <Route path='/admin-forgot' component={AdminForgot} />
        <Route path='/admin-reset' component={AdminReset} />

        <Route path='/Admin-home' exact component={AdminDashboard} />
        <Route path='/Category' component={Category} />
        <Route path='/Ingredients' component={Ingredients} />
        <Route path='/CreateTable' component={CreateTable} />
        <Route path='/OrdersHistory' component={OrdersHistory} />
        <Route path='/ViewManager/ViewCook' component={ViewCook} />
        <Route path='/ViewManager/ViewUser' component={ViewUser} />
        <Route path='/ViewManager/ViewWaiter' component={ViewWaiter} />
        <Route path='/ViewManager' component={ViewManager} />
        <Route path='/Ratings' component={Ratings} />
        <Route path='/AddStaff' component={AddStaff} />
        <Route path='/Complaints' component={Complaints} />
        {/* <Route path='/Payment' component={Payment} /> */}
        <Route path='/Revenue' component={Revenue} />
        <Route path='/RDetails' component={RDetails} />
        <Route path='/Offer' component={Offer} />

        <Route path='/manager-login' component={Manager} />
        <Route path='/manager-forgot' component={ManagerForgot} />
        <Route path='/manager-reset' component={ManagerReset} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/manager-home' component={ManagerHome} />
        <Route path='/register-manager' component={ManagersRegister} />
        <Route path='/review' component={Review} />
        <Route path='/complaint' component={Complaints} />
        <Route path='/viewCook' component={viewCook} />
        <Route path='/viewWaiter' component={viewWaiter} />
        <Route path='/category' component={AddCategory} />
        <Route path='/add-ingrediant' component={AddIngrediants} />
        <Route path='/pending-order' component={PendingOrders} />
        <Route path='/done-order' component={DoneOrders} />
        <Route path='/parcel-order' component={ParcelOrders} />
        <Route path='/revenue' component={RevenuePage} />
        <Route path='/add-table' component={AddTable} />
        <Route path='/set-offer' component={SetOffers} />
        <Route path='/table-order' component={TableOrder} />
        <Route path='/live-parcel' component={parcelOrder} />
        <Route path='/register-waiter' component={RegisterWaiter} />
        <Route path='/parcel-doneorder' component={ParcelDone} />

        <Route path='/cook-login' component={Cook} />
        <Route path='/cook-forgot' component={CookForgot} />
        <Route path='/cook-reset' component={CookReset} />
        <Route path='/cook-home' component={CookHome} />
        <Route path='/order-list' component={OrderList} />
        <Route path='/deliverd-item' component={DeliverdItem} />
        <Route path='/menu-list' component={MenuList} />
        <Route path='/process-order' component={ProcessOrder} />
        <Route path='/reject-order' component={RejectOrder} />
        <Route path='/menu-cook' component={CookMenu} />

        <Route path='/waiter-login' component={Waiter} />
        <Route path='/waiter-forgot' component={WaiterForgot} />
        <Route path='/waiter-reset' component={WaiterReset} />

        <Route path='/menu' component={Menu} /> 
        <Route path='/subcategory/:_id' component={subcategory} />
        <Route path='/UserProfile' component={UserHome} />
        <Route path='/profile' component={UserProfile} />
        <Route path='/Offer-page' component={OfferPage} />
        <Route path='/orderslist' component={OrdersList} />
        <Route path='/product' component={Product} />
        <Route path='/orders' component={Orders} />
        <Route path='/cart' component={Cart} />
        <Route path='/menudata' component={MenuData} />
        <Route path='/booktable' component={BookTable} />
    
        <Route path="/ListTable" exact component={ListTable} />
        <Route path="/WaiterMenu" component={WaiterMenu} />
        <Route path="/WaiterCart" component={WaiterCart} />
        <Route path="/BookTable" component={WaiterBookTable} />
        <Route path="/CreateComplaints" component={CreateComplaints} />
        <Route path="/popup" component={waiterpopup} />
        <Route path="/forget" component={Waiterforget} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
