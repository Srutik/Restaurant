import React from 'react';
import Sidesection from './Sidesection'; 
import Indian from './Indian';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';




function Menupage() {
  return (
  
      <Router>
        <Sidesection />
       
        <Switch>
          
        <Route path exact="/indian" component={Indian} />
        </Switch>
      </Router>
    
  );
}

export default Menupage;




