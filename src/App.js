import Homepage from './component/pages/Homepage';
import Card from './component/pages/Items';
import Footer from './component/pages/Footer';
import Login from './component/User/Login';
import UserHome from './component/User/User-Home';
import Admin from './component/Admin/Admin-login';
import AdminReset from './component/Admin/Admin-reset';
import Register from './component/User/Register';
import Forgot from './component/User/Forgot';
import Menupage from './component/User/Menupage';
import Reset from './component/User/Reset';
import Manager from './component/Manager/Manager-login';
import Weiter from './component/Waiter/Waiter-login';
import WaiterForgot from './component/Waiter/Waiter-forgot';
import WaiterReset from './component/Waiter/Waiter-reset';
import AdminForgot from './component/Admin/Admin-Forgot';
import ManagerForgot from './component/Manager/Manager-Forgot';
import ManagerReset from './component/Manager/Manager-reset';
import Cook from './component/Cook/Cook-login';
import CookForgot from './component/Cook/Cook-forgot';
import UserSection from './component/User/User-section';
import CookReset from './component/Cook/Cook-reset';
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
        <Route path='/admin-login' component={Admin} />
        <Route path='/manager-login' component={Manager} />
        <Route path='/cook-login' component={Cook} />
        <Route path='/waiter-login' component={Weiter} />
        <Route path='/menu' component={Menupage} />
        <Route path='/forgot' component={Forgot} />
        <Route path='/admin-forgot' component={AdminForgot} />
        <Route path='/admin-reset' component={AdminReset} />
        <Route path='/manager-forgot' component={ManagerForgot} />
        <Route path='/manager-reset' component={ManagerReset} />
        <Route path='/cook-forgot' component={CookForgot} />
        <Route path='/cook-reset' component={CookReset} />
        <Route path='/waiter-forgot' component={WaiterForgot} />
        <Route path='/waiter-reset' component={WaiterReset} />
        <Route path='/reset' component={Reset} />
        <Route path='/UserHome' component={UserHome} />
        <Route path='/UserSection' component={UserSection} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
