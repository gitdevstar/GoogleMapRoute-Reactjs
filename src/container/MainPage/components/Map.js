import React, {useState, useEffect} from 'react';
import {Map, InfoWindow, GoogleApiWrapper, Marker, Polyline} from 'google-maps-react'

const style = {
    width: '100%',
    height: '100vh'
};

const MapDirection = (props) => {
    const { places, travelMode } = props
    const [path, setPath] = useState([])
    const [selectedPlace, setPlaces] = useState(null)
    const [activeMarker, setMarker] = useState(null)
    const [bounds, setBounds] = useState(null)
    const [error, setError] = useState(null)

    const initPlace = places.length > 0 ? { lat: places[0].lat, lng: places[0].lng }: { lat: -134, lng: -134 }

    useEffect(() => {
        var bounds1 = new window.google.maps.LatLngBounds();
        for (var i = 0; i < places.length; i++) {
            bounds1.extend(places[i]);
        }
        setBounds(bounds1)
    }, [places])


    useEffect(() => {
        if(places.length > 1) {

            const waypoints = places.map(p => ({
                location: { lat: p.lat, lng: p.lng },
                stopover: true
            }))
    
            
            let first = waypoints.shift()
            let last = waypoints.pop()
                const origin = first.location;
                const destination = last.location;
                const directionsService = new window.google.maps.DirectionsService();
                const directionsDisplay = new window.google.maps.DirectionsRenderer();
    
                directionsDisplay.setMap(null);
    
                directionsService.route(
                    {
                        origin: origin,
                        destination: destination,
                        // travelMode: travelMode,
                        // travelMode: 'DRIVING',
                        // travelMode: window.google.maps.DirectionsTravelMode.WALKING,
                        travelMode: window.google.maps.DirectionsTravelMode.DRIVING,
                        // travelMode: 'WALKING',
                        waypoints: waypoints
                    },
                    (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            // setDirection(result)
                            console.log('result', result);
                            var tempArray = []
                            for(var i = 0; i < result.routes[0].overview_path.length; i ++) {
                                var temp = {lat: result.routes[0].overview_path[i].lat(), lng: result.routes[0].overview_path[i].lng()}
                                tempArray.push(temp)
                            }
                            setPath(tempArray)
                            console.log('overview', result.routes[0].overview_path[0].lat());
                            directionsDisplay.setDirections(result)
                        } else {
                            setError(result)
                        }
                    }
                );
        }
    }, [places])

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
                    {path.length > 0 && 
                        <Polyline
                            path={path}
                            strokeColor="#0000FF"
                            strokeOpacity={0.8}
                            strokeWeight={2} />
                    }
            </Map>
        </div>
     );
}

export default MapDirection