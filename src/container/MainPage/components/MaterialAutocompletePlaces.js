import React from 'react';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import { GoogleApiWrapper } from 'google-maps-react'
import { makeStyles, Typography, Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import Geocode from "react-geocode";

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

const MaterialAutocompletePlaces = (props) => {
    const {addLocation, format} = props
    const classes = useStyles();
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);

    // if (typeof window !== 'undefined' && !loaded.current) {
    //     if (!document.querySelector('#google-maps')) {
    //         loadScript(
    //             'https://maps.googleapis.com/maps/api/js?key=AIzaSyDdPAhHXaBBh2V5D2kQ3Vy7YYrDrT7UW3I&libraries=places',
    //             document.querySelector('head'),
    //             'google-maps',
    //         );
    //     }

    //     loaded.current = true;
    // }

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            style={{ width: '100%' }}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={format? null: value}
            onChange={(event, newValue) => {
                // console.log('auto change',newValue);
                Geocode.setApiKey("AIzaSyDdPAhHXaBBh2V5D2kQ3Vy7YYrDrT7UW3I");
                Geocode.fromAddress(newValue.description).then(
                    (response) => {
                      const { lat, lng } = response.results[0].geometry.location;
                      console.log(lat, lng);
                      addLocation({lat: lat, lng: lng});
                    },
                    (error) => {
                      console.error(error);
                    }
                );
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label="Add a location" variant="outlined" fullWidth />
            )}
            renderOption={(option) => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            {/* <LocationOnIcon className={classes.icon} /> */}
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
                            ))}

                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDdPAhHXaBBh2V5D2kQ3Vy7YYrDrT7UW3I'
    // apiKey: 'AIzaSyAkhD0FzDxe7D6b4TNuAL6mOkDWZ9Jt7Vk'
  })(MaterialAutocompletePlaces)