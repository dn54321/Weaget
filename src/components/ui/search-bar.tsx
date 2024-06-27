import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, CircularProgress, IconButton, InputBase, List, ListItem, Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import useAutocomplete from '@mui/material/useAutocomplete';
import { Box, styled } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { debounce, throttle } from "throttle-debounce";
import { FetchError } from '../../errors/fetch-error';
import { AutoCompleteSuggestions } from '../../features/weaget/auto-complete.types';
import { useGetCurrentLocation } from '../../hooks/use-get-current-location';
import { queryLocation } from '../../hooks/use-get-location';
import { useGetLocationAutoComplete } from '../../hooks/use-get-location-auto-complete';

// React Components

const ButtonSearchIcon = (props) => {
    return (
        <IconButton aria-label="Search" color="primary" type="submit" {...props}>
            <SearchIcon/>
        </IconButton>
    )
};

const MyLocationButtonIcon = (props: {setErrno: (number: number) => void}) => {
    const router = useRouter();
    const currentLocationQuery = useGetCurrentLocation();

    function onClick() {
        const city = currentLocationQuery.data?.city;
        if (city) {
            router.push(`/weather/${city}`);
        }
        else {
            props.setErrno(3);
        }
    }

    return (
        <IconButton 
            aria-label="Use current location" 
            color="primary" 
            type="button" 
            onClick={()=>onClick()}
            disabled={currentLocationQuery.isLoading}
            sx={{
                color: "gray",
                margin: "0px 10px"
            }}
        >
            <MyLocationIcon/>
        </IconButton>
    )
};

const StyledLoader = (props) => {
    return (
        <Box px="8px" mx="12px" display="flex">
            <CircularProgress {...props}/>
        </Box>
    )
};

// Styled Components 

const errmsg = {
    0: "",
    1: "Invalid Suburb Location",
    2: "Internal Server Error. Please try again later!",
    3: "Could not retrieve current location. Please enter it manually!"
}

export function Error(props) {
    if (!props.errno) return null;
    return (
        <Box position="relative" height="0">
            <Box position="absolute" mt={1}>
                <Alert variant="filled" severity="error">
                    {errmsg[props.errno]}        
                </Alert>
            </Box>
        </Box>
    )
}

export const FormContainer = styled('form')((props: {width: string}) => ({
    maxWidth: props.width || "300px",
    width: "100%",
}));

export const SearchComponent = styled(Paper)({
    display: "flex",
    alignItems: "center",
    padding: 5,
    paddingRight: 0
});

export const SearchField = styled('div')({
    display: "flex",
    alignItems: "center",
    width: "100%"
});

export const SuggestionBox = (props) => {
    return (
        <Box component="ul" sx={{
            position: "relative",
            zIndex: "1",
            listStyleType: "none",
            p: 0,
            m: 0, 
            "& .Mui-focused": {
                backgroundColor: "#e9e9e9",
            },      
        }} {...props.listprops}>
        <Paper sx={{position: "absolute", width: "100%",  mt:"10px"}}>
            <List sx={{p: 0}}>
                {props.children}
            </List>
        </Paper>
        </Box>
    )
};



export const FieldBox = styled(InputBase)(({ theme }) => ({
    color: theme.palette.text.primary,
    padding: "5px 5px 0px 10px",
    width: "100%",
    "&:focus": {
        outline: "none !important"
    }
}));

export const LoadingIcon = styled(StyledLoader)({
    color: "gray"
});

export const MagnifyIconButton = styled(ButtonSearchIcon)({
    marginRight: 10,
    color: "gray"
});


const SuggestionText = styled(ListItem)(({theme}) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: "5px 10px",
    "&:hover": {
        backgroundColor: theme.palette.action.hover
    }
}));

const throttleFunc = throttle(500, (func, query) => {
    if (query !== undefined) func(query)
});

const debounceFunc = debounce(500, (func, query) => {
    if (query !== undefined) func(query)
});


export default function SearchBar(props) {
    const currentLocationQuery = useGetCurrentLocation();
    const coords = `${currentLocationQuery.data?.lat},${currentLocationQuery.data?.lng}`;
    const [searchQuery, setQuery] = useGetLocationAutoComplete('', coords);
    const [errno, setErrno] = useState(0);
    const [icon, setIcon] = useState(<MyLocationButtonIcon setErrno={setErrno}/>);

    const mounted = useRef(false);
    const router = useRouter();

    // Changes SessionID for Autocomplete.
    // Shows Loading Icon && Determines if Location Exist.
    // Returns Weather details if exist.
    // Provide an error if it does not exist.
    async function onSubmit(e) {
        e.preventDefault();
        setIcon(<LoadingIcon size={20}/>);
        const { suburb } = e.target.elements;
        const location = suburb.value;
        await queryLocation(location)
            .then(_ => {
                router.push(`/weather/${location}`);
            })
            .catch((err: FetchError) => {
                if (err.res.status === 404) return setErrno(1);
                if (err.res.status === 500) return setErrno(2);
            })
            .finally(() => mounted && setIcon(<MyLocationButtonIcon setErrno={setErrno}/>));
    }

    // Get a location query and finds location that match the query.
    // Bia results based on user's location via lat, lon.
    function getSuggestion(query: string) {
        setQuery(query);
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
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete<AutoCompleteSuggestions>({
        id: 'search-menu',
        options: searchQuery.data ?? [],
        onInputChange: (_,v) => DebounceAndThrottleAutoComplete(v),
        onChange: (_,v) => (v && router.push(`/weather/${v.main} ${v.secondary}`)),
        getOptionLabel: (x) => `${x.main} ${x.secondary}`,
        clearOnBlur: false,
        isOptionEqualToValue: (i,o) => (i.main === o.main && i.secondary === o.secondary)
    });

    return (
        <FormContainer {...props} {...getRootProps()} onSubmit={onSubmit}>
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
                <SuggestionText
                    {...getOptionProps({ option, index })}
                    key={option.main+option.secondary}
                >
                    <Box display="inline" color="text.main"><b>{option.main}</b></Box>
                    <Box display="inline" color="text.secondary" ml="1ch">{option.secondary}</Box>
                </SuggestionText>
            ))}
            </SuggestionBox>
            ) : null }
            <Error errno={errno}/>
        </FormContainer>
    );
}