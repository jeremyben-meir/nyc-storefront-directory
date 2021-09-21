import {Map} from '../components/Map.js';
import disableScroll from 'disable-scroll';
import React, { useState, useEffect } from "react";

const Home = () => {
  
  useEffect( () => disableScroll.on(), [] );
  useEffect( () => () => disableScroll.off(), [] );

  return (
    <Map/>
  );
}

export default Home;