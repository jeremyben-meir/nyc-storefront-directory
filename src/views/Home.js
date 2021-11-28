import {Map} from '../components/Map.js';
import disableScroll from 'disable-scroll';
import React, { useState, useEffect } from "react";
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
});

const Home = () => {
  const s3 = new AWS.S3();
  const [BBLPlaces, setBBLPlaces] = useState(null)
  const [LLIDPlaces, setLLIDPlaces] = useState(null)

  useEffect( () => disableScroll.on(), [] );
  useEffect( () => () => disableScroll.off(), [] );

  useEffect(() => {

    s3.getObject({
        Bucket: process.env.REACT_APP_INTERNAL_BUCKET_NAME,
        Key: 'data/bbl_timeline.json',
    }, (err, data) => {
        if (err) {
            console.log(err, err.stack);
        } else {
            var response = JSON.parse(data.Body.toString())
            setBBLPlaces(response)
            s3.getObject({
                Bucket: process.env.REACT_APP_INTERNAL_BUCKET_NAME,
                Key: 'data/llid_timeline.json',
            }, (err, data) => {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    var response = JSON.parse(data.Body.toString())
                    setLLIDPlaces(response)
                }
            });    
        }
    });

          
  },[])

  return (
    LLIDPlaces != null && <Map BBLPlaces={BBLPlaces} LLIDPlaces={LLIDPlaces}/>
  );
}

export default Home;