import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Body from "./Components/Body";
import Header from "./Components/Header";
import './index.css'

class App extends Component {



  render(){
    return (
      <div className="App">
          <Header />
          <Body />
      </div>
    )
  }
    
}
  
export default App;