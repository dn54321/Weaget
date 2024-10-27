import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Box, Container, Divider, IconButton, Link, MenuItem, Select, SelectChangeEvent, ToggleButton, ToggleButtonGroup, Toolbar } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { NSXContainer, SXContainer } from "@styles/globals";
import React, { useState } from "react";
import { SearchBar } from "@components/ui/search-bar";
import MenuIcon from "@mui/icons-material/Menu";
import { Icon, OutlinedLogo } from "./navbar.styles";
import { MeasurementScale } from "@src/types/measurement.types";
import { SystemLocale, SystemTheme } from "@src/types/system.types";
import { TemperatureScale } from "@src/types/weather.types";
import { useSettingStore } from "@src/hooks//stores/use-setting-store";
import { ThemeToggleButton } from "@components/ui/theme-toggle-button";
import { useSystemSettings } from "@src/hooks/use-system-settings";
import NextLink from "next/link";
import { LocalisationDropdownButton } from "@components/ui/localisation-dropdown-button/localisation-dropdown-button.component";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export interface NavbarStateProp {
    mobileBurgerFn?: () => void;
    setState: (state: NavbarStates) => void;
}

export enum NavbarStates {
    DEFAULT = "default",
    SEARCH = "search",
}

// Default Navbar seen normally on every device
function DefaultNavbar(props: NavbarStateProp) {
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
            <Link component={NextLink} href="/"><OutlinedLogo fontSize="25px" hideShadow /></Link>
            <NSXContainer ml="60px" width="100%" alignItems="center">
                <SearchBar maxWidth="400px" />
                <Box className="seperator" ml="auto" />
                <LocalisationDropdownButton />
                <ThemeToggleButton />
            </NSXContainer>
            <SXContainer ml="auto">
                <Icon
                    color="inherit"
                    aria-label="Search Weather"
                    onClick={() => props.setState(NavbarStates.SEARCH)}
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
function SearchNavbar(props: NavbarStateProp) {
    const { t } = useSystemTranslation();
    return (
        <>
            <IconButton
                title={t("directions.goBack")}
                aria-label={t("directions.goBack")}
                sx={{ color: "white", mr: "20px" }}
                onClick={() => props.setState(NavbarStates.DEFAULT)}
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
export interface SettingsDialogProps {
    setDialog: (setOpen: boolean) => void;
    open: boolean;
}
function SettingsDialog(props: SettingsDialogProps) {
    const { t } = useSystemTranslation();
    const temperatureScale = useSettingStore(state => state.temperatureScale);
    const measurementScale = useSettingStore(state => state.measurementScale);
    const setTemperatureScale = useSettingStore(state => state.setTemperatureScale);
    const setMeasurementScale = useSettingStore(state => state.setMeasurementScale);
    const { themeColour, toggleTheme, locale, setLocale } = useSystemSettings();
    const handleClose = () => {
        props.setDialog(false);
    };

    const deltaTemp = (_: any, v: TemperatureScale) => v && setTemperatureScale(v);
    const deltaMeas = (_: any, v: MeasurementScale) => v && setMeasurementScale(v);
    const languageNames = new Intl.DisplayNames(["en"], {
        type: "language",
    });

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
                        {t("settings.text")}
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
                <Box sx={{ m: "5px" }}><b>{t("settings.temperatureScale")}</b></Box>
                <ToggleButtonGroup value={temperatureScale} onChange={deltaTemp} exclusive>
                    <ToggleButton value={TemperatureScale.CELSIUS}>
                        {t("temperature.celsius.text")}
                        {" (°C)"}
                    </ToggleButton>
                    <ToggleButton value={TemperatureScale.FAHRENHEIT}>
                        {t("temperature.fahrenheit.text")}
                        {" (°F)"}
                    </ToggleButton>
                </ToggleButtonGroup>
                <Divider sx={{ mt: "15px" }} />
                <Box sx={{ m: "5px" }}><b>{t("settings.measurementScale")}</b></Box>
                <ToggleButtonGroup value={measurementScale} onChange={deltaMeas} exclusive>
                    <ToggleButton value={MeasurementScale.METRIC}>
                        {t("measurement.metric")}
                        {" (M/S)"}
                    </ToggleButton>
                    <ToggleButton value={MeasurementScale.IMPERIAL}>
                        {t("measurement.imperial")}
                        {" (MPH)"}
                    </ToggleButton>
                </ToggleButtonGroup>
                <Divider sx={{ mt: "15px" }} />
                <Box sx={{ m: "5px" }}><b>{t("settings.themeColor")}</b></Box>
                <ToggleButtonGroup value={themeColour} onChange={toggleTheme} exclusive>
                    <ToggleButton value={SystemTheme.DARK}>{t("theme.darkTheme")}</ToggleButton>
                    <ToggleButton value={SystemTheme.LIGHT}>{t("theme.lightTheme")}</ToggleButton>
                </ToggleButtonGroup>
                <Divider sx={{ mt: "15px" }} />
                <Box sx={{ m: "5px" }}><b>{t("settings.locale")}</b></Box>
                <Select
                    value={locale}
                    onChange={(event: SelectChangeEvent) => setLocale(event.target.value as SystemLocale)}
                    displayEmpty
                >
                    {Object.values(SystemLocale).map(currentLocale => (
                        <MenuItem
                            value={currentLocale}
                            key={currentLocale}
                        >
                            {t(`language.${languageNames.of(currentLocale)?.toLowerCase()}`)}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        </Dialog>
    );
}

export interface NavbarProps {
    mobileBurgerFn?: () => void;
}

export default function Navbar(props: NavbarProps) {
    const [navStateID, setNavStateID] = useState(NavbarStates.DEFAULT);
    const navState = {
        [NavbarStates.DEFAULT]: <DefaultNavbar setState={setNavStateID} mobileBurgerFn={props.mobileBurgerFn} />,
        [NavbarStates.SEARCH]: <SearchNavbar setState={setNavStateID} />,
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
