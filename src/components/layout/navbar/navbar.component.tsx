import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Box, Container, Divider, IconButton, Link, ToggleButton, ToggleButtonGroup, Toolbar, useTheme } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { NSXContainer, SXContainer } from "@styles/globals";
import React, { useState } from "react";
import SearchBar from "@components/ui/search-bar/search-bar.component";
import { ThemeToggleButton } from "@components/ui/theme-toggle-button/theme-toggle-button";
import MenuIcon from "@mui/icons-material/Menu";
import { Icon, OutlinedLogo } from "./navbar.styles";
import { MeasurementScale } from "@src/types/measurement.types";
import { SystemTheme } from "@src/types/system.types";
import { TemperatureScale } from "@src/types/weather.types";
import { useSettingStore } from "@src/hooks//stores/use-setting-store";

// Default Navbar seen normally on every device
function DefaultNavbar(props: NavbarProps & { setState: (str: string) => void }) {
    const [settingDialog, setDialog] = useState(false);
    return (
        <>
            {
                props.mobileBurgerFn
                    ? (
                            <IconButton
                                aria-label="open menu"
                                onClick={props.mobileBurgerFn}
                                sx={{
                                    display: { xs: "grid", md: "none" },
                                    width: "50px",
                                    height: "50px",
                                    placeItems: "center",
                                    mr: "15px",
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )
                    : ""
            }
            <Link href="/"><OutlinedLogo fontSize="25px" hideShadow /></Link>
            <NSXContainer ml="60px" width="100%" alignItems="center">
                <SearchBar maxWidth="400px" />
                <Box className="seperator" ml="auto" />
                <ThemeToggleButton />
            </NSXContainer>
            <SXContainer ml="auto">
                <Icon
                    color="inherit"
                    aria-label="Search Weather"
                    onClick={() => props.setState("search")}
                >
                    <SearchIcon sx={{ fontSize: "1.2em" }} />
                </Icon>
                <Icon color="inherit" aria-label="settings" sx={{ ml: "4px" }} onClick={() => setDialog(true)}>
                    <SettingsIcon sx={{ fontSize: "1.2em" }} />
                </Icon>
            </SXContainer>
            <SettingsDialog open={settingDialog} setDialog={setDialog} />
        </>
    );
}

// Search Navbar seen only during mobile use when the search icon is pressed.
function SearchNavbar(props) {
    return (
        <>
            <IconButton
                aria-label="back"
                sx={{ color: "white", mr: "20px" }}
                onClick={() => props.setState("default")}
            >
                <ArrowBackIosNewIcon />
            </IconButton>
            <SearchBar maxWidth="100%" />
        </>
    );
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
function SettingsDialog(props) {
    const temperatureScale = useSettingStore(state => state.temperatureScale);
    const measurementScale = useSettingStore(state => state.measurementScale);
    const setTemperatureScale = useSettingStore(state => state.setTemperatureScale);
    const setMeasurementScale = useSettingStore(state => state.setMeasurementScale);
    const { themeColour, toggleTheme } = useTheme();
    const handleClose = () => {
        props.setDialog(false);
    };

    const deltaTemp = (_, v: TemperatureScale) => v && setTemperatureScale(v);
    const deltaMeas = (_, v: MeasurementScale) => v && setMeasurementScale(v);

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={handleClose}
            TransitionComponent={dialogueTransition}
        >
            <AppBar sx={{ position: "relative" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{ position: "absolute" }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box display="flex" justifyContent="center" width="100%">
                        Settings
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                color="text.primary"
                p="20px"
                sx={{
                    "& .MuiToggleButton-root.Mui-selected": {
                        "color": "white",
                        "backgroundColor": "primary.dark",
                        "&:hover": {
                            backgroundColor: "primary.dark",
                        },
                    },
                    "& .MuiToggleButton-root:hover": {
                        color: "white",
                        backgroundColor: "primary.light",
                        boxShadow: 2,
                    },
                }}
            >
                <Box sx={{ m: "5px" }}><b>Temperature Scale</b></Box>
                <ToggleButtonGroup value={temperatureScale} onChange={deltaTemp} exclusive>
                    <ToggleButton value={TemperatureScale.CELSIUS}>Celcius (C°)</ToggleButton>
                    <ToggleButton value={TemperatureScale.FAHRENHEIT}>Fahrenenheit (F°)</ToggleButton>
                </ToggleButtonGroup>
                <Divider sx={{ mt: "15px" }} />
                <Box sx={{ m: "5px" }}><b>Measurement System</b></Box>
                <ToggleButtonGroup value={measurementScale} onChange={deltaMeas} exclusive>
                    <ToggleButton value={MeasurementScale.METRIC}>Metric (M/S)</ToggleButton>
                    <ToggleButton value={MeasurementScale.IMPERIAL}>Imperial (MPH)</ToggleButton>
                </ToggleButtonGroup>
                <Divider sx={{ mt: "15px" }} />
                <Box sx={{ m: "5px" }}><b>Theme Colour</b></Box>
                <ToggleButtonGroup value={themeColour} onChange={toggleTheme} exclusive>
                    <ToggleButton value={SystemTheme.DARK}>Dark Theme</ToggleButton>
                    <ToggleButton value={SystemTheme.LIGHT}>Light Theme</ToggleButton>
                </ToggleButtonGroup>
                <Divider sx={{ mt: "15px" }} />
            </Box>
        </Dialog>
    );
}

export interface NavbarProps {
    mobileBurgerFn?: () => void;
}

export default function Navbar(props: NavbarProps) {
    const [navStateID, setNavStateID] = useState("default");
    const navState = {
        default: <DefaultNavbar setState={setNavStateID} mobileBurgerFn={props.mobileBurgerFn} />,
        search: <SearchNavbar setState={setNavStateID} />,
    };
    return (
        <AppBar sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
            <Container maxWidth="lg">
                <Toolbar variant="dense" sx={{ height: "80px" }} disableGutters>
                    {navState[navStateID]}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
