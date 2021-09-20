import './App.css';
import { BrowserRouter as Router , Switch , Route } from "react-router-dom";
import React from "react";

import Home from './views/Home';
import About from './views/About';
import Methods from './views/Methods';
import NoMatch from './views/NoMatch';

import Navbar from './components/Navbar';

const navlinks = [
  { name: "Map", to: "/open-storefront-directory" },
  { name: "Methods", to: "/open-storefront-directory/methods" },
  { name: "About", to: "/open-storefront-directory/about" }
];
const brand = { name: "open-storefront-directory", to: "home" };

function App() {
  return (
    <React.Fragment>
      <Navbar brand={brand} links={navlinks} />
      
      <Router>
        <Switch>
          <Route path="/open-storefront-directory" exact component={Home}/>
          <Route path="/open-storefront-directory/about" exact component={About}/>
          <Route path="/open-storefront-directory/methods" exact component={Methods}/>
          <Route component={NoMatch}/>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
