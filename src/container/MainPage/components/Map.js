import React, {useState, useEffect} from 'react';
import {Map, InfoWindow, GoogleApiWrapper, Marker} from 'google-maps-react'

const style = {
    width: '100%',
    height: '100vh'
};

const MapDirection = (props) => {
    const { places, travelMode } = props
    const [selectedPlace, setPlaces] = useState(null)
    const [activeMarker, setMarker] = useState(null)
    const [bounds, setBounds] = useState(null)
    const [error, setError] = useState(null)

    
    const initPlace = places.length > 0 ? { lat: places[0].lat, lng: places[0].lng }: { lat: -134, lng: -134 }
    console.log('initplace', initPlace);
    useEffect(() => {
        var bounds1 = new window.google.maps.LatLngBounds();
        for (var i = 0; i < places.length; i++) {
            bounds1.extend(places[i]);
        }
        setBounds(bounds1)
        console.log('bounds', bounds);
    }, [places])


    useEffect(() => {
        if(places.length > 0) {

            const waypoints = places.map(p => ({
                location: { lat: p.lat, lng: p.lng },
                stopover: true
            }))
    
            
            // let point = waypoints.shift()
            // console.log('shift', point);
            // let point1 = waypoints.pop()
            // console.log('pop', point1);
            // if (point !== undefined && point1 !== undefined) {
                const origin = waypoints[0].location;
                const destination = waypoints[2].location;
                const directionsService = new window.google.maps.DirectionsService();
                const directionsDisplay = new window.google.maps.DirectionsRenderer();
    
                directionsDisplay.setMap(null);
    
                directionsService.route(
                    {
                        origin: origin,
                        destination: destination,
                        // travelMode: travelMode,
                        // travelMode: 'DRIVING',
                        travelMode: window.google.maps.DirectionsTravelMode.WALKING,
                        // travelMode: 'WALKING',
                        waypoints: waypoints
                    },
                    (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            // setDirection(result)
                            console.log('result', result);
                            directionsDisplay.setDirections(result)
                        } else {
                            setError(result)
                        }
                    }
                );
        }
        // }
    }, [])

    const onMarkerClick = (props, marker, e) => {
        setPlaces(props)
        setMarker(marker)
    }

    return ( 
        <div className="col-md-12">
            {error && <p>{error.status}</p>}
            <Map
                google={window.google}
                // zoom={12}
                bounds={bounds}
                style={style}
                initialCenter={initPlace}
            >
                {places.map((p, index) => (
                    <Marker
                        key={index}
                        name={'Dolores park'+index}
                        onClick={onMarkerClick}
                        position={{lat: p.lat, lng: p.lng}} />
                    ))}
                    <InfoWindow
                        marker={activeMarker}
                        visible={true}
                        >
                        <div>
                            <h1>{selectedPlace && selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
            </Map>
        </div>
     );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDdPAhHXaBBh2V5D2kQ3Vy7YYrDrT7UW3I'
    // apiKey: 'AIzaSyAkhD0FzDxe7D6b4TNuAL6mOkDWZ9Jt7Vk'
  })(MapDirection)