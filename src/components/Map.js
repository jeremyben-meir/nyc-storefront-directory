import React, { useState, useRef, useEffect } from "react";
import * as LLIDPlaces from "../assets/llid_timeline.json";
import * as BBLPlaces from "../assets/bbl_timeline.json";
import mapboxgl from "mapbox-gl"
import '../assets/App.css';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

export const Map = () => {

    const mapContainer = useRef()
    const [hover, setHover] = useState({})
    const [mapFocus, setMapFocus] = useState("Vacancy")
    const [mapSet, setMapSet] = useState()

    const colorDict = {
        "0" : '#00ff00',
        "1" : '#30ff00',
        "2" : '#60ff00',
        "3" : '#90ff00',
        "4" : '#c0ff00',
        "5" : '#ffff00',
        "6" : '#ffc000',
        "7" : '#ff9000',
        "8" : '#ff6000',
        "9" : '#ff3000',
        "10" : '#ff0000'
    }
    
    const naics_string_dict = {
        "0" : 'Raw Goods Producers',
        "1" : 'Raw Goods Processors',
        "2" : 'Materials Manufacturers',
        "3" : 'Equipment/Vehicle Manufacturers',
        "4" : 'Goods Wholesalers; Groceries',
        "5" : 'Goods Retailers',
        "6" : 'Transportation',
        "7" : 'Business-oriented Services',
        "8" : 'Personal Services',
        "9" : 'Govt. and Civil Society',
    }
    
    const duration_string_dict = {
        "0" : '0-1',
        "1" : '1-2',
        "2" : '2-3',
        "3" : '3-4',
        "4" : '4-5',
        "5" : '5-6',
        "6" : '6-7',
        "7" : '7-8',
        "8" : '8-9',
        "9" : '9-10',
        "10" : '10+'
    }
    
    const turnover_string_dict = {
        "0" : '<(.8)',
        "1" : '(.8)-(.6)',
        "2" : '(.6)-(.4)',
        "3" : '(.4)-(.2)',
        "4" : '(.2)-0',
        "5" : '0-.2',
        "6" : '.2-.4',
        "7" : '.4-.6',
        "8" : '.6-.8',
        "9" : '>.8',
    }
    
    const vacancy_string_dict = {
        "0" : '0-.1',
        "1" : '.1-.2',
        "2" : '.2-.3',
        "3" : '.3-.4',
        "4" : '.4-.5',
        "5" : '.5-.6',
        "6" : '.6-.7',
        "7" : '.7-.8',
        "8" : '.8-.9',
        "9" : '.9-1',
    }
    
    const legend_style = {
        backgroundColor: '#fff',
        borderRadius: '3px',
        bottom: '30px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        font: "12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif",
        padding: "10px",
        position: "absolute",
        right: "10px",
        zIndex: 1
    }
    const legend_style_left = {
        backgroundColor: '#fff',
        borderRadius: '3px',
        bottom: '30px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        font: "12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif",
        padding: "10px",
        position: "absolute",
        left: "10px",
        zIndex: 1
    }
    
    const legend_h4_style = {
        margin: "0 0 10px"
    }
    
    const legend_div_span_style = {
        borderRadius: "50%",
        display: "inline-block",
        height: "10px",
        marginRight: "5px",
        width: "10px"
    }
    
    const mapFocusDict = {
        'Duration':{
            "strings": duration_string_dict,
            "places": LLIDPlaces
        },
        'Vacancy':{
            "strings": vacancy_string_dict,
            "places": BBLPlaces
        },
        // 'NAICS':{
        //     "strings": naics_string_dict,
        //     "places": LLIDPlaces
        // },
        // 'Turnover':{
        //     "strings": turnover_string_dict,
        //     "places": BBLPlaces
        // }
    }

    const update_map = () => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            zoom: 10.5,
            maxZoom: 17.5,
            minZoom: 10,
            center: [-73.962141,40.72796],
            maxBounds: [[-74.345945,40.465065],[-73.590632,40.997314]]
        });

        map.on('load', () => {

            for(let [key, value] of Object.entries(mapFocusDict)){

                map.addSource('places'+key, {
                    type: 'geojson',
                    data: mapFocusDict[key]["places"].default
                });

                map.addLayer({
                    'id': key,
                    'type': 'circle',
                    'source': 'places'+key,
                    'layout': {
                        'visibility': key==mapFocus ? 'visible' : 'none',
                    },
                    'paint': {
                        'circle-radius': {
                            'base': 1.75,
                            'stops': [
                                [12, 2],
                                [22, 50]
                            ]
                        },
                        'circle-color': [
                            'match',
                            ['get', key],
                            "0", colorDict['0'],
                            "1", colorDict['1'],
                            "2", colorDict['2'],
                            "3", colorDict['3'],
                            "4", colorDict['4'],
                            "5", colorDict['5'],
                            "6", colorDict['6'],
                            "7", colorDict['7'],
                            "8", colorDict['8'],
                            "9", colorDict['9'],
                            /* other */ colorDict['10']
                        ]
                    }
                });
                var popup = new mapboxgl.Popup({
                    offset: [0, -7],
                    closeButton: false,
                    closeOnClick: false
                });
                    
                map.on('mouseenter', key, (e) => {
                    map.getCanvas().style.cursor = 'pointer'; // Change the cursor style as a UI indicator.
                    if (key == "NAICS" || key == "Duration"){
                        const name = e.features[0].properties.Name;
                        const address = e.features[0].properties.Address;
                        const industry = e.features[0].properties["NAICS Title"];
                        const start = e.features[0].properties["Start Date"];
                        const end = e.features[0].properties["End Date"];
    
                        setHover({
                            "name": name,
                            "address": address,
                            "industry": industry,
                            "start": start,
                            "end": end,
                        })
                    } else {
                        const bbl = e.features[0].properties.BBL;
                        const vacancy = e.features[0].properties.vacancy;
                        const turnover = e.features[0].properties.turnover;
                        const maxbus = e.features[0].properties["Max Business"];
    
                        setHover({
                            "bbl": bbl,
                            "vacancy": vacancy,
                            "turnover": turnover,
                            "maxbus": maxbus
                        })
                    }
                    
                });
                    
                map.on('mouseleave', key, () => {
                    map.getCanvas().style.cursor = '';
                    popup.remove();
                });

            }
        });
        map.on('idle', () => {
            setMapSet(map)
        });
    }

    useEffect(() => {
        update_map()            
    },[])

    useEffect(() => {
        if (mapSet != null){
            for(let [key, value] of Object.entries(mapFocusDict)){
                if (key != mapFocus) {
                    mapSet.setLayoutProperty(key, 'visibility', 'none');
                } else {
                    mapSet.setLayoutProperty(key, 'visibility','visible');
                }       
            }      
        }
    },[mapFocus])

    const handleChange = (event) => {
        if (mapFocus ==  "Vacancy"){
            setMapFocus("Duration");
        } else {
            setMapFocus("Vacancy");
        }
    }

    const llid_htm = (
        <div>
            <b>NAME: </b>{hover.name && hover.name} <br/>
            <b>ADDRESS: </b>{hover.address && hover.address}  <br/>
            {/* <b>INDUSTRY: </b>{hover.industry && hover.industry} <br/> */}
            <b>START DATE: </b>{hover.start && hover.start}
        </div>
    )
    const bbl_htm = (
        <div>
            <b>BBL: </b>{hover.bbl && hover.bbl} <br/>
            <b>VACANCY: </b>{hover.vacancy && hover.vacancy} <br/>
            <b>TURNOVER: </b>{hover.turnover && hover.turnover} <br/>
            <b>MAX BUSINESS #: </b>{hover.maxbus && hover.maxbus}
        </div>
    )

    return (
        <div> 
            <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }}>
                <div id="state-legend" className="legend" style={legend_style}>
                    <h4 style={legend_h4_style}>{mapFocus}</h4>
                    {Object.entries(mapFocusDict[mapFocus]["strings"]).map((item, index) => 
                        <div><span style={{...legend_div_span_style, backgroundColor: colorDict[index]}}></span>{mapFocusDict[mapFocus]["strings"][index]}</div>
                    )}
                </div>
                <div id="state-legend" className="legend" style={legend_style_left}>
                    {(mapFocus == "Vacancy" || mapFocus == "Turnover") ? bbl_htm : llid_htm}
                    <input type="checkbox" className="toggle-switch-checkbox" name="checkbox" id="checkbox" onChange={handleChange} /> Vacancy / Duration
                </div>
            </div>
        </div>
    )


    
}



