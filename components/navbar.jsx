import Link from '@components/link';
import Logo from '@components/logo';
import SearchBar from '@components/search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Box, Container, Divider, IconButton, ToggleButton, ToggleButtonGroup, Toolbar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import styled from '@mui/system/styled';
import { SettingContext } from '@src/settings';
import { NSXContainer, SXContainer } from '@styles/globals';
import React, { useContext, useState } from 'react';

/*
    The navbar seen in /weather/[location].
    Has 2 states:
        A navbar State
        A search State
    And Can open up the settings menu.
    Note, Changing States and modifying settings can only
    be done in mobile view.

*/

// Logo displayed on left of NAVBAR.
// Clicking Returns to home.
const OutlinedLogo = styled(Logo)(({ theme }) => ({
    padding: "1px 5px",
    backgroundColor: theme.palette.primary.dark,
    width: "fit-content",
    borderRadius: "5px"
}));

const Icon = styled(IconButton)(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: "15px",
    
    "&:hover": {
        backgroundColor: theme.palette.primary.light
    }
}))

// Default Navbar seen normally on every device
function DefaultNavbar(props) {
    const [settingDialog, setDialog] = useState(false);
    return (
        <>
            <Link href="/"><Logo fontSize="25px"/></Link>
            <NSXContainer ml="60px" width="min(400px, 95%)"><SearchBar width="400px"/></NSXContainer>
            <SXContainer ml="auto">
                <Icon color="inherit" aria-label="Search Weather" component="span"
                onClick={() => props.setState('search')}>
                    <SearchIcon sx={{fontSize:"1.2em"}}/>
                </Icon>
                <Icon color="inherit" aria-label="Settings" component="span" sx={{ml:"4px"}}
                onClick={() => setDialog(true)}>
                    <SettingsIcon sx={{fontSize:"1.2em"}}/>
                </Icon>
            </SXContainer>
            <SettingDialog open={settingDialog} setDialog={setDialog}/>
        </>
    )
}

// Search Navbar seen only during mobile use when the search icon is pressed.
function SearchNavbar(props) {
    return (
        <>
            <IconButton aria-label="back" sx={{color: "white",mr:"20px"}}
            onClick={() => props.setState('default')}>
                <ArrowBackIosNewIcon/>
            </IconButton>
            <SearchBar width="100%"/>
        </>
    )
}

// Settings Dialogue to modify TEMP/MEAS context
const dialogueTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Dialogue
function SettingDialog(props) { 
    const {temperature_scale, measurement_system, toggler} = useContext(SettingContext);
    const handleClose = () => {
        props.setDialog(false);
    };

    const deltaTemp = (e,v) => {v && toggler({temperature_scale: v})};
    const deltaMeas = (e,v) => {v && toggler({measurement_system: v})};
    return (
        <Dialog
        fullScreen
        open={props.open}
        onClose={handleClose}
        TransitionComponent={dialogueTransition}
        >
        <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                sx={{position: "absolute"}}
            >
            <CloseIcon />
            </IconButton>
            <Box display="flex" justifyContent="center" width="100%">
                Settings
            </Box>
            </Toolbar>
        </AppBar>
        <Box color="black" p="20px" sx={{
            "& .MuiToggleButton-root.Mui-selected": {
                color: "white",
                backgroundColor: "primary.dark",
                "&:hover": {
                    backgroundColor: "primary.dark",
                }
            },
            "& .MuiToggleButton-root:hover": {
                color: "white",
                backgroundColor: "primary.light",
                boxShadow: 2
            }
        }}>
            <Box sx={{m:"5px"}}><b>Temperature Scale</b></Box>
            <ToggleButtonGroup value={temperature_scale} onChange={deltaTemp} exclusive> 
                <ToggleButton value="celcius">Celcius (C°)</ToggleButton>
                <ToggleButton value="fahrenheit">Fahrenenheit (F°)</ToggleButton>
            </ToggleButtonGroup> 
            <Divider sx={{mt:"15px"}}/>
            <Box sx={{m:"5px"}}><b>Measurement System</b></Box>
            <ToggleButtonGroup value={measurement_system} onChange={deltaMeas} exclusive> 
                <ToggleButton value="metric">Metric (M/S)</ToggleButton>
                <ToggleButton value="imperial">Imperial (MPH)</ToggleButton>
            </ToggleButtonGroup> 
            <Divider sx={{mt:"15px"}}/>
        </Box>
        </Dialog>
    )
}

export default function Navbar(props) {
    const [navStateID, setNavStateID] = useState('default');
    const navState = {
        'default': <DefaultNavbar setState={setNavStateID}/>,
        'search': <SearchNavbar setState={setNavStateID}/>
    }
    return (
        <AppBar>
            <Container maxWidth="lg">
            <Toolbar variant="dense" sx={{height:"80px"}}>
                {navState[navStateID]}
            </Toolbar>
            </Container>
        </AppBar>
    )
}