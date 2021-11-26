import React, { Component } from "react";
import axios from "axios";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


import Body from "./Components/AuctionPageBody";
import AuctionPageBody from "./Components/AuctionPageBody";
import './index.css';


function App () {
  
  return (
    <div className="App">
      <AuctionPageBody />
    </div>
  ) //end return

} //end function app
export default App;