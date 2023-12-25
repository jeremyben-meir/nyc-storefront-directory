import './App.css';
import { BrowserRouter as Router , Switch , Route } from "react-router-dom";
import React from "react";

import Home from './views/Home';
import About from './views/About';
import Links from './views/Links';
// import Team from './views/Team';
// import GetData from './views/GetData';
import NoMatch from './views/NoMatch';

import Navbar from './components/Navbar';

const navlinks = [
  { name: "Map", to: "/" },
  { name: "Links", to: "/links" },
];
const brand = { name: "open-storefront-directory", to: "home" };

function App() {
  return (
    <Router basename="/open-storefront-directory">
      <React.Fragment>
      <Navbar brand={brand} links={navlinks} />
      
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/about" exact component={About}/>
          {/* <Route path="/team" exact component={Team}/> */}
          <Route path="/links" exact component={Links}/>
          {/* <Route path="/getdata" exact component={GetData}/> */}
          <Route component={NoMatch}/>
        </Switch>
    </React.Fragment>
    </Router>
  );
}

export default App;
