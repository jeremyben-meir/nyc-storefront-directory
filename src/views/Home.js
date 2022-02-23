import {Map} from '../components/Map.js';
import disableScroll from 'disable-scroll';
import React, { useState, useEffect } from "react";
import Amplify, { Storage } from 'aws-amplify';
import * as LLIDPlacesJSON from "../assets/temp/llid_timeline.json";
import * as BBLPlacesJSON from "../assets/temp/bbl_timeline.json";
import * as PredictionsJSON from "../assets/temp/predictions.json";
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

const Home = () => {
  const [errorSig, setErrorSig] = useState(null)
  const [BBLPlaces, setBBLPlaces] = useState(BBLPlacesJSON.default)
  const [LLIDPlaces, setLLIDPlaces] = useState(LLIDPlacesJSON.default)
  const [predictions, setPredictions] = useState(PredictionsJSON.default)

  useEffect( () => disableScroll.on(), [] );
  useEffect( () => () => disableScroll.off(), [] );

  function get_storage(setter,filepath){
    Storage.get(filepath, { download: true })
    .then(data => {
      data.Body.text().then(string => { 
        var response = JSON.parse(string)
        console.log(response)
        setter(response)
      });
    })
    .catch(err => {
      setErrorSig(true);
      console.log(err, err.stack);
    })
  }

  useEffect(() => {
    get_storage(setPredictions,"predictions.json")   
    get_storage(setBBLPlaces,"bbl_timeline.json")
    get_storage(setLLIDPlaces,"llid_timeline.json")
  },[])

  var errorStyle = {
    textAlign:"center",
    lineHeight: "300px",
    height: "100%",
    // border: "3px solid green"
  }

  var errorDisplay = (
    <p style={errorStyle}>Error retrieving data. Try again soon! In the meantime, visit our other pages to learn more!</p>
  )
  var mapDisplay = (
    <Map BBLPlaces={BBLPlaces} LLIDPlaces={LLIDPlaces} predictions={predictions}/>
  )

  return (
    LLIDPlaces != null ? mapDisplay : (errorSig && errorDisplay)
  );
}

export default Home;