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
    const map_focus_list = ['Duration', 'NAICS', 'Vacancy', 'Turnover']
    const map_focus = map_focus_list[2]

    const map_focus_dict = {
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

    const popup_style = {
        maxWidth: "400px",
        font: "12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif"
    }

    var map_string_dict = {}

    if (map_focus == "NAICS"){
        map_string_dict = naics_string_dict
    } else if (map_focus == "Duration"){
        map_string_dict = duration_string_dict
    } else if (map_focus == "Vacancy"){
        map_string_dict = vacancy_string_dict
    } else if (map_focus == "Turnover"){
        map_string_dict = turnover_string_dict
    }

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            zoom: 10.5,
            center: [-73.962141,40.72796]
        });

        
        var place_data = {}
        if (map_focus == "NAICS" || map_focus == "Duration"){
            place_data = LLIDPlaces;
        } else {
            place_data = BBLPlaces;
        }
        console.log(place_data.default)
        map.on('load', () => {

            map.addSource('places', {
                type: 'geojson',
                data: place_data.default
            });

            map.addLayer({
                'id': 'places',
                'type': 'circle',
                'source': 'places',
                // 'source-layer': 'sf2010',
                'paint': {
                    // Make circles larger as the user zooms from z12 to z22.
                    'circle-radius': {
                        'base': 1.75,
                        'stops': [
                            [12, 2],
                            [22, 50]
                        ]
                    },
                    // Color circles by ethnicity, using a `match` expression.
                    'circle-color': [
                        'match',
                        ['get', map_focus],
                        "0", map_focus_dict['0'],
                        "1", map_focus_dict['1'],
                        "2", map_focus_dict['2'],
                        "3", map_focus_dict['3'],
                        "4", map_focus_dict['4'],
                        "5", map_focus_dict['5'],
                        "6", map_focus_dict['6'],
                        "7", map_focus_dict['7'],
                        "8", map_focus_dict['8'],
                        "9", map_focus_dict['9'],
                        /* other */ map_focus_dict['10']
                    ]
                }
            });

            // Create a popup, but don't add it to the map yet.
            var popup = new mapboxgl.Popup({
                offset: [0, -7],
                closeButton: false,
                closeOnClick: false
            });
                
            map.on('mouseenter', 'places', (e) => {
                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'pointer';
                
                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();

                if (map_focus == "NAICS" || map_focus == "Duration"){
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
                
            map.on('mouseleave', 'places', () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });
        });
            
    },[])

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
                    <h4 style={legend_h4_style}>{map_focus}</h4>
                    {Object.entries(map_string_dict).map((item, index) => 
                        <div><span style={{...legend_div_span_style, backgroundColor: map_focus_dict[index]}}></span>{map_string_dict[index]}</div>
                    )}
                </div>
                <div id="state-legend" className="legend" style={legend_style_left}>
                    {(map_focus == "Vacancy" || map_focus == "Turnover") ? bbl_htm : llid_htm}
                </div>
            </div>
        </div>
    )

}