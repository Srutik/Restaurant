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
import UserSection from './component/User/User-section';
import MenuItem from './component/User/Menu';

import Admin from './component/Admin/Admin-login';
import AdminReset from './component/Admin/Admin-reset';
import AdminForgot from './component/Admin/Admin-Forgot';

import Manager from './component/Manager/Manager-login';
import ManagerForgot from './component/Manager/Manager-Forgot';
import ManagerReset from './component/Manager/Manager-reset';
import ManagerHome from './component/Manager/ManagerHome';
import RegisterCook from './component/Manager/register-cook';
import RegisterWeiter from './component/Manager/register-weiter';

import Waiter from './component/Waiter/Waiter-login';
import WaiterForgot from './component/Waiter/Waiter-forgot';
import WaiterReset from './component/Waiter/Waiter-reset';

import Cook from './component/Cook/Cook-login';
import CookForgot from './component/Cook/Cook-forgot';
import CookReset from './component/Cook/Cook-reset';

import Product from './component/Product';
import Cart from './component/User/Cart';

import { BrowserRouter as Router, Switch , Route} from 'react-router-dom';
import './App.css';

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

        <Route path='/manager-login' component={Manager} />
        <Route path='/manager-forgot' component={ManagerForgot} />
        <Route path='/manager-reset' component={ManagerReset} />
        <Route path='/manager-home' component={ManagerHome} />
        <Route path='/register-cook' component={RegisterCook} />
        <Route path='/register-weiter' component={RegisterWeiter} />

        <Route path='/cook-login' component={Cook} />
        <Route path='/cook-forgot' component={CookForgot} />
        <Route path='/cook-reset' component={CookReset} />

        <Route path='/waiter-login' component={Waiter} />
        <Route path='/waiter-forgot' component={WaiterForgot} />
        <Route path='/waiter-reset' component={WaiterReset} />

        <Route path='/menu' component={Menu} /> 
        <Route path='/subcategory/:_id' component={subcategory} />
        <Route path='/UserHome' component={UserHome} />
        <Route path='/UserSection' component={UserSection} />

        <Route path='/product' component={Product} />
        <Route path='/cart' component={Cart} />


      </Switch>
      </Router>
    </div>
  );
}

export default App;
