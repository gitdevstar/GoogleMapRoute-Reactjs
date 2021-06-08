import React, { useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

const AutocompletePlaces = () => {
    const [address, setAddress] = useState(null)

    const handleChange = address => {
        setAddress(address)
    };
    
    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
        <div className="autocomplete-root">
          <input {...getInputProps()}/>
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => (
              <div {...getSuggestionItemProps(suggestion)}>
                <span>{suggestion.description}</span>
              </div>
            ))}
          </div>
        </div>
      );
    
    return ( 
        <div className="col-md-12">
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {renderFunc}
            </PlacesAutocomplete>
        </div>
     );
}
 
export default AutocompletePlaces;