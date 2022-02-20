import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import { Box, CircularProgress, IconButton, InputBase, List, ListItem, Paper } from '@mui/material';
import styled from '@mui/system/styled';
import { SettingContext } from "@src/settings";
import { useRouter } from 'next/router';
import { useContext } from 'react';
 // React Components

const ButtonSearchIcon = (props) => {
    return (
        <IconButton aria-label="Search" color="primary" type="submit" {...props}>
            <SearchIcon/>
        </IconButton>
    )
};

const ButtonMyLocationIcon = (props) => {
    const router = useRouter();
    const settings = useContext( SettingContext );
    let city;
    
    function onClick() {
        if (city = settings.city) {
            router.push(`/weather/${city}`);
        }
        else {
            props.setErrno(3)
        }
    }
    return (
        <IconButton aria-label="Use current location" color="primary" type="button" 
        onClick={()=>onClick()} {...props}>
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
    1: "» Invalid Suburb Location",
    2: "» Internal Server Error. Please try again later!",
    3: "» Could not retrieve location. Please enter it manually!"
}

export function Error(props) {
    if (!props.errno) return null;
    return (
        <Box position="relative" height={0} aria-live="polite">
            <Paper sx={{fontSize: '0.75em', color: 'red', 
            top:"5px", position:"absolute", p:"1px", px:"5px"}}>
                {errmsg[props.errno]}        
            </Paper>
        </Box>
    )
}

export const Container = styled('form')((props) => ({
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

export const SuggestionText = (props) => {
    return (
        <ListItem disablePadding {...props.optionProps}
        sx={{
            borderBottom: "1px solid #f1f1f1",
            px: "10px",
            py: "5px",
            "&:hover": {
                backgroundColor: "#e9e9e9"
            }
        }}>
            <Box display="inline" color="black"><b>{props.main}</b></Box>
            <Box display="inline" color="gray" ml="1ch">{props.secondary}</Box>
        </ListItem>
    )
};


export const FieldBox = styled(InputBase)({
    color: 'black',
    padding: "5px 5px 0px 10px",
    width: "100%",
    "&:focus": {
        outline: "none !important"
    }
});

export const LoadingIcon = styled(StyledLoader)({
    color: "gray"
});

export const MagnifyIconButton = styled(ButtonSearchIcon)({
    marginRight: 10,
    color: "gray"
});

export const MyLocationButton = styled(ButtonMyLocationIcon,
    {
        shouldForwardProp: (prop) => prop !== 'setErrno'
    })({
    color: "gray",
    margin: "0px 10px"
});
