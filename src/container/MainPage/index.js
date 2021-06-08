import React, {useState} from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import {Button} from '@material-ui/core'
import styled from 'styled-components'

import AutocompletePlaces from './components/MaterialAutocompletePlaces';
import Map from './components/Map';

const Location = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    text-align: center;
`

const MainPage = () => {
    const [places, setPlaces] = useState([])
    const [format, setFormat] = useState(true)
    const [kind, setKind] = useState(0)

    const addLocation = (location) => {
        console.log("location", location);
        setPlaces([...places, location]);//{lat: 20, lng: 23}
        setFormat(false)
        console.log(places);
    }

    const changePath = () => {
        setKind(kind+1)
        setFormat(true)
    }

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-5">
                    <Location>
                        <div className="col-md-12">
                            <h1>{kind === 0 ? "Where from?" : "Where to?"}</h1>
                            <AutocompletePlaces addLocation={addLocation} format={format}/>
                            <Button variant="contained" color="primary" className="mt-3" onClick={changePath}>Next</Button>
                        </div>
                    </Location>
                </div>
                <div className="col-md-7">
                    <Map places={places}/>
                </div>
            </div>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLEMAP_API_KEY
    // apiKey: "AIzaSyDdPAhHXaBBh2V5D2kQ3Vy7YYrDrT7UW3I"
  })(MainPage)