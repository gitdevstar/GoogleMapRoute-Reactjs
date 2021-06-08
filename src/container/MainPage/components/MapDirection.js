import React, { useState, useEffect } from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
    DirectionsRenderer
} from "react-google-maps";

import Autocomplete from 'react-google-autocomplete';

const MapDirection = (props) => {
    const { places, travelMode } = props
    const [directions, setDirection] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const waypoints = places.map(p => ({
            location: { lat: p.latitude, lng: p.longitude },
            stopover: true
        }))

        console.log('here', waypoints);
        let point = waypoints.shift()
        let point1 = waypoints.pop()
        if (point !== undefined && point1 !== undefined) {
            const origin = point.location;
            const destination = point1.location;
            const directionsService = new window.google.maps.DirectionsService();
            console.log('here');

            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    // travelMode: travelMode,
                    travelMode: 'DRIVING',
                    waypoints: waypoints
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirection(result)
                    } else {
                        setError(result)
                    }
                }
            );
        }
    }, [])


    if (error) {
        return <h1>{error}</h1>;
    }

    const AsyncMap = withScriptjs(
        withGoogleMap(
            props => (
                <GoogleMap 
                // google={props.google}
                    defaultZoom={15}
                    // defaultZoom={props.zoom}
                    defaultCenter={{ lat: -34, lng: 150 }}
                >
                    {/* For Auto complete Search Box */}
                    <Autocomplete
                        style={{
                            width: '100%',
                            height: '40px',
                            paddingLeft: '16px',
                            marginTop: '2px',
                            marginBottom: '100px'
                        }}
                        // onPlaceSelected={this.onPlaceSelected}
                        types={['(regions)']}
                    />
                    {/*Marker*/}
                    <Marker google={props.google}
                        name={'Dolores park'}
                        draggable={true}
                        // onDragEnd={this.onMarkerDragEnd}
                        position={{ lat: -34, lng: 150 }}
                    />
                    <Marker />
                    {/* InfoWindow on top of marker */}
                    {/* <InfoWindow
                        onClose={this.onInfoWindowClose}
                        position={{ lat: (-34 + 0.0018), lng: 150 }}
                    >
                        <div>
                            <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                        </div>
                    </InfoWindow> */}
                </GoogleMap>
            )
        )
    );

    return (
        // directions && (
            <DirectionsRenderer directions={directions} />
         // )
        // <AsyncMap
        //     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGe5vjL8wBmilLzoJ0jNIwe9SAuH2xS_0&libraries=places"
        //     // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAkhD0FzDxe7D6b4TNuAL6mOkDWZ9Jt7Vk&libraries=places"
        //     loadingElement={
        //         <div style={{ height: `100%` }} />
        //     }
        //     containerElement={
        //         <div style={{ height: `100vh` }} />
        //     }
        //     mapElement={
        //         <div style={{ height: `100%` }} />
        //     }
        // />
    );
}

export default MapDirection;