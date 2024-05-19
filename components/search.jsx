import {Container, SuggestionBox, SearchField, FieldBox, MagnifyIconButton, SearchComponent, SuggestionText, MyLocationButton, Error, LoadingIcon} from './search.style';
import Divider from '@mui/material/Divider';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import searchWeather from '@src/weatherSearch';
import useAutocomplete from '@mui/material/useAutocomplete';
import { throttle, debounce } from "throttle-debounce";
import { SettingContext } from "@src/settings";
import { v4 as uuidv4 } from "uuid";

const throttleFunc = throttle(500, (func, query) => {
    if (query !== undefined) func(query)
});

const debounceFunc = debounce(500, (func, query) => {
    if (query !== undefined) func(query)
});


export default function SearchBar(props) {
    const [errno, setErrno] = useState(0);
    const [icon, setIcon] = useState(<MyLocationButton setErrno={setErrno}/>);
    const [suggestions, setSuggestions] = useState([])
    const [sessionID, setSessionID] = useState(uuidv4());
    const settings = useContext( SettingContext );
    const mounted = useRef(false);
    const router = useRouter();

    // Changes SessionID for Autocomplete.
    // Shows Loading Icon && Determines if Location Exist.
    // Returns Weather details if exist.
    // Provide an error if it does not exist.
    async function onSubmit(e) {
        e.preventDefault();
        setIcon(<LoadingIcon size={20}/>);
        setSessionID(uuidv4());
        const location = e.target.suburb.value;
        await searchWeather(location)
        .then(res => {
            if (res.response == 404 && errno !== 1) return setErrno(1);
            if (res.response !== 200 && !errno) return setErrno(2);
            if (errno) setErrno(0);
            router.push(`/weather/${location}`);
        })
        .then(_ => mounted && setIcon(<MyLocationButton setErrno={setErrno}/>))
        .catch(err => setErrno(2));
    }

    // Get a location query and finds location that match the query.
    // Bia results based on user's location via lat, lon.
    async function getSuggestion(query) {
        // If query is empty, no suggestions.
        if (query.length === 0) setSuggestions([]);
        let lat, lng;

        // Get Lat & Lng
        lat = settings.lat;
        lng = settings.lng;

        // Fetch Suggestions & Update Suggestions.
        await fetch(`/api/suggestion?input=${query}&lat=${lat}&lng=${lng}&uuid=${sessionID}`)
        .then(data => data.json())
        .then(data => {setSuggestions(data.results)})
    }

    // Debounce && Throttle Queries for Reduce API Calls.
    function DebounceAndThrottleAutoComplete(query) {
        if (query.length < 5) {
            debounceFunc(getSuggestion, undefined);
            throttleFunc(getSuggestion, query);

          } else {
            throttleFunc(getSuggestion, undefined);
            debounceFunc(getSuggestion, query);
          }
    }

    // Remove memory Leaks
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    // Autocomplete Props from MaterialUI
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
      } = useAutocomplete({
        id: 'Search-Menu',
        options: suggestions,
        onInputChange: (_,v) => DebounceAndThrottleAutoComplete(v),
        onChange: (_,v) => (v && router.push(`/weather/${v.main} ${v.secondary}`)),
        getOptionLabel: (x) => `${x.main} ${x.secondary}`,
        clearOnBlur: false,
        isOptionEqualToValue: (i,o) => {
            if (i.main === o.main && i.secondary === o.secondary) return true;
            return false;
        }
      });

    return (
        <Container {...props} {...getRootProps()} onSubmit={onSubmit}>
            <SearchComponent>
                <SearchField> 
                    <FieldBox name="suburb" placeholder="Search Weather Location" 
                        required inputProps={{...getInputProps()}}/>
                    <MagnifyIconButton/>
                </SearchField>
                <Divider orientation="vertical" sx={{height: 28}}/>
                {icon}
            </SearchComponent>
    
            {groupedOptions.length > 0 ? (
            <SuggestionBox listprops={getListboxProps()}>
            {groupedOptions.map((option, index) => (
            <SuggestionText optionProps={getOptionProps({ option, index })}
            main={option.main} secondary={option.secondary} 
            key={option.main+option.secondary}/>
            ))}
            </SuggestionBox>
            ) : null }
            <Error errno={errno}/>
        </Container>
    );
}