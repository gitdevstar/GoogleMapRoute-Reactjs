import React from 'react';
import {withRouter} from 'react-router-dom'
import AutocompletePlaces from './components/AutocompletePlaces';
import Map from './components/Map';

const MainPage = () => {
    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-5">
                    <AutocompletePlaces />
                </div>
                <div className="col-md-7">
                    <Map places={[{lat: -34.1352, lng: 149.3242}, {lat: -34.1721, lng: 149.3323}, {lat: -34.2121, lng: 149.3423}]}/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;