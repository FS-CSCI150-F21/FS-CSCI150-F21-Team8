import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


import Body from "./Components/AuctionPageBody";
import './index.css';
import AuctionPageBody from "./Components/AuctionPageBody";



function App () {
  
  return (
    <div className="App">
      <AuctionPageBody />
    </div>
  ) //end return

} //end function app
export default App;