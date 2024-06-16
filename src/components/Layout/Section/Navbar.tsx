import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Box, Container, Divider, IconButton, Link, ToggleButton, ToggleButtonGroup, Toolbar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import styled from '@mui/system/styled';
import { NSXContainer, SXContainer } from '@styles/globals';
import React, { useState } from 'react';
import { useSettingStore } from '../../../hooks/stores/useSettingStore';
import Logo from '../../Icon/LogoIcon';
import { TemperatureScale } from '../../../types/weather.types';
import { MeasurementScale } from '../../../types/measurement.types';
import SearchBar from '../../SearchBar';
import { ThemeToggleButton } from '../../ThemeToggleButton';
import { SystemTheme } from '../../../types/system.types';

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
const OutlinedLogo = styled(Logo)(() => ({
    padding: "1px 5px",
    width: "fit-content",
    borderRadius: "5px",
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
            <Link href="/"><OutlinedLogo fontSize="25px"/></Link>
                <NSXContainer ml="60px" width="100%" alignItems="center">
                    <SearchBar width="400px"/>
                    <Box className="seperator" ml="auto"/>
                    <ThemeToggleButton/>
                </NSXContainer>
                <SXContainer ml="auto">
                    <Icon 
                        color="inherit" 
                        aria-label="Search Weather" 
                        onClick={() => props.setState('search')}
                    >
                        <SearchIcon sx={{fontSize:"1.2em"}}/>
                    </Icon>
                    <Icon color="inherit" aria-label="Settings" sx={{ml:"4px"}} onClick={() => setDialog(true)}>
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
const dialogueTransition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

// Dialogue
function SettingDialog(props) { 
    const temperatureScale = useSettingStore((state) => state.temperatureScale);
    const measurementScale = useSettingStore((state) => state.measurementScale);
    const themeColour = useSettingStore((state) => state.theme);
    const setTemperatureScale = useSettingStore((state) => state.setTemperatureScale);
    const setMeasurementScale = useSettingStore((state) => state.setMeasurementScale);
    const toggleThemeColour = useSettingStore((state) => state.toggleTheme);
    const handleClose = () => {
        props.setDialog(false);
    };

    const deltaTemp = (_, v: TemperatureScale) => {v && setTemperatureScale(v)};
    const deltaMeas = (_, v: MeasurementScale) => {v && setMeasurementScale(v)};
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
        <Box color="text.primary" p="20px" sx={{
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
            <ToggleButtonGroup value={temperatureScale} onChange={deltaTemp} exclusive> 
                <ToggleButton value={TemperatureScale.CELSIUS}>Celcius (C°)</ToggleButton>
                <ToggleButton value={TemperatureScale.FAHRENHEIT}>Fahrenenheit (F°)</ToggleButton>
            </ToggleButtonGroup> 
            <Divider sx={{mt:"15px"}}/>
            <Box sx={{m:"5px"}}><b>Measurement System</b></Box>
            <ToggleButtonGroup value={measurementScale} onChange={deltaMeas} exclusive> 
                <ToggleButton value={MeasurementScale.METRIC}>Metric (M/S)</ToggleButton>
                <ToggleButton value={MeasurementScale.IMPERIAL}>Imperial (MPH)</ToggleButton>
            </ToggleButtonGroup> 
            <Divider sx={{mt:"15px"}}/>
            <Box sx={{m:"5px"}}><b>Theme Colour</b></Box>
            <ToggleButtonGroup value={themeColour} onChange={toggleThemeColour} exclusive> 
                <ToggleButton value={SystemTheme.DARK}>Dark Theme</ToggleButton>
                <ToggleButton value={SystemTheme.LIGHT}>Light Theme</ToggleButton>
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