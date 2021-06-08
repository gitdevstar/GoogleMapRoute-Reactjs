import React from 'react';
import {withRouter} from 'react-router-dom'
import AutocompletePlaces from './components/AutocompletePlaces';
// import MapDirection from './components/MapDirection';
import Map from './components/Map';

const MainPage = () => {
    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-5">
                    {/* <AutocompletePlaces /> */}
                </div>
                <div className="col-md-7">
                    {/* <MapDirection places={[{latitude: -34, longitude: 151}, {latitude: -34, longitude: 151}]}/> */}
                    <Map places={[{latitude: -34, longitude: 151}, {latitude: -34, longitude: 151}]}/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;