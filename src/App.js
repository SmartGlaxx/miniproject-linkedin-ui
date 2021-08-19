import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Home, Login, Signup, Welcome} from './pages'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path = '/' exact>
            <Home/>
          </Route>
         <Route path = '/signup' exact>
            <Signup/>
          </Route>
          <Route path = '/login' exact>
            <Login/>
          </Route>
           <Route path = '/welcome' exact>
            <Welcome/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
