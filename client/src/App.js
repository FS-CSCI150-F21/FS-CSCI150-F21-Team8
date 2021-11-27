import React from 'react'; //maybe remove
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages';
import About from './pages/about';
import Signup from './pages/signup';
import Signin from './pages/login';
import Create from './pages/createAuction'
import AuctionPageBuyer from './pages/auctionpagebuyer';
import {useState} from 'react'

export const AuthContext = React.createContext()

function App() {
  const [authState, setAuthState] = useState(localStorage.getItem("user") ? true : false)

  return (
    <Router>
          
          <AuthContext.Provider value={[authState, setAuthState]}>
              <Navbar/>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} /> 
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Signin} />
              <Route path="/createAuction" component={Create} />
              <Route path="/auctionpagebuyer" component={AuctionPageBuyer} />
           </Switch>
           </AuthContext.Provider>
    </Router>
  );
}

export default App;
