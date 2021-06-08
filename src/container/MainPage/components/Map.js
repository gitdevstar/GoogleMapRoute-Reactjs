import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react'

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
            const directionsDisplay = new window.google.maps.DirectionsRenderer();
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
                        // setDirection(result)
                        directionsDisplay.setDirections(result)
                    } else {
                        setError(result)
                    }
                }
            );
        }
    }, [])

    return ( 
        <div>
            <Map
                google={window.google}
                zoom={15}
                initialCenter={{ lat: -34, lng: 150 }}
            />
        </div>
     );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDdPAhHXaBBh2V5D2kQ3Vy7YYrDrT7UW3I'
  })(MapDirection)