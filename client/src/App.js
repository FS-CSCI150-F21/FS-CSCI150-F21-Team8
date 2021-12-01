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
import AuctionPageSeller from './pages/auctionpageseller';
import {useState} from 'react'
import Forgot from './pages/forgot'
import Verify from './pages/verify';
import Profile from './pages/profile';
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
              <Route path="/forgot" component={Forgot} />
              <Route path="/verify" component={Verify} />
              <Route path="/createAuction" component={Create} />
              <Route path="/auctionpagebuyer" component={AuctionPageBuyer} />
              <Route path="/auctionpageseller" component={AuctionPageSeller} />
              <Route path="/profile" component={Profile} />
           </Switch>
           </AuthContext.Provider>
    </Router>
  );
}

export default App;
