"use client";
import { Logo } from "@components/icon/core/logo-icon";
import { Footer } from "@components/layout/footer";
import { LocalisationDropdownButton } from "@components/ui/localisation-dropdown-button/localisation-dropdown-button.component";
import { SearchBar } from "@components/ui/search-bar";
import { SettingsFab } from "@components/ui/settings-fab";
import { ThemeToggleButton } from "@components/ui/theme-toggle-button";
import { DailyCompactWeatherWidget } from "@components/widgets/daily-compact-weather-widget";
import LocationGridWidget from "@components/widgets/location-grid-widget/location-grid-widget.component";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import styled from "@mui/system/styled";
import { useWidgetStore } from "@src/hooks/stores/use-widget-store";
import { useAlert } from "@src/hooks/use-alert";
import { useGetCurrentLocation } from "@src/hooks/use-get-current-location";
import { useGetNearbyLocation } from "@src/hooks/use-get-nearby-location";
import { useGetWeather } from "@src/hooks/use-get-weather";
import { useSystemSettings } from "@src/hooks/use-system-settings";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { useEffect } from "react";
const Loader = () => {
    const { t } = useSystemTranslation();
    return (
        <Stack
            alignItems="center"
            data-testid="loader"
            sx={{
                color: "primary.text",
                height: "100%",
                mt: "50px"
            }}
        >
            <div className="dot-falling"></div>
            <Box mt="20px">{t("weather.loader")}</Box>
        </Stack>
    );
};

const Section = styled(Container)(({ theme }) => ({
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    position: "relative",
    [theme.breakpoints.down("md")]: {
        "& ul,ol": {
            justifyContent: "center"
        },
        "flexDirection": "column",
        "gap": "50px"
    },
    top: "20px"
}));

const SearchContainer = styled("main")(({ theme }) => ({
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    height: "400px",
    justifyContent: "center"
}));

const PageDivider = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.divider,
    height: "50px"
}));

const ResponsiveLogo = styled(Logo)(({ theme }) => ({
    fontSize: "min(13vw, 60px)",
    mb: "30px",
    pt: "100px",
    [theme.breakpoints.up("sm")]: {
        fontSize: "60px"
    },
    zIndex: "0"
}));

const PaddedSearchBar = () => (
    <Box sx={{
        display: "grid",
        mt: "40px",
        placeItems: "center",
        px: "10%",
        width: "100%",
        zIndex: "2"
    }}
    >
        <SearchBar maxWidth="500px" />
    </Box>
);

export default function Home() {
    const { locale } = useSystemSettings();
    const { t } = useSystemTranslation();
    const currentLocationQuery = useGetCurrentLocation();
    const weatherQuery = useGetWeather(currentLocationQuery.data?.city);
    const locationQuery = useGetNearbyLocation(currentLocationQuery.data?.lat, currentLocationQuery.data?.lng, locale);
    const location = `${currentLocationQuery.data?.city}, ${currentLocationQuery.data?.region}, ${currentLocationQuery.data?.country}`;
    const resetWeather = useWidgetStore(state => state.resetState);
    const { addAlert, AlertBox } = useAlert();

    useEffect(() => {
        if (weatherQuery.isError) {
            addAlert({
                duration: Infinity,
                message: "Error fetching weather data. Please try again later.",
                type: "error"
            });
        }
        if (locationQuery.isError || currentLocationQuery.isError) {
            addAlert({
                duration: Infinity,
                message: "Error fetching location data. Please try again later.",
                type: "error"
            });
        }
    }, [weatherQuery.isError, locationQuery.isError, currentLocationQuery.isError, addAlert]);

    useEffect(() => {
        if (currentLocationQuery.isFetching) {
            resetWeather();
        }
    }, [currentLocationQuery, resetWeather]);

    return (
        <Box height="100%">
            <title>{t("webapp.name")}</title>
            <meta content={t("webapp.description")} name="description" />
            <Box display="grid" gridTemplateRows="1fr auto" height="100%" position="relative" width="100%">
                <Stack alignItems="center" direction="row" position="absolute" right={10} top={10}>
                    <LocalisationDropdownButton />
                    <ThemeToggleButton />
                </Stack>
                <Stack height="100%">
                    <SearchContainer>
                        <ResponsiveLogo />
                        <PaddedSearchBar />
                    </SearchContainer>
                    <PageDivider />
                    <Section
                        maxWidth="md"
                        sx={{
                            alignItems: { md: "initial", xs: "center" }
                        }}
                    >
                        { weatherQuery.data && locationQuery.data && currentLocationQuery.data
                            ? (
                                <>
                                    <DailyCompactWeatherWidget
                                        location={location}
                                        subtitle={location}
                                        sx={{ maxWidth: "550px" }}
                                        title={t("weather.localWeather")}
                                        weatherData={weatherQuery.data}
                                    />
                                    <LocationGridWidget
                                        locationData={locationQuery.data}
                                        sx={{ maxWidth: "550px" }}
                                    />
                                </>
                            )
                            : <Loader />}
                    </Section>
                    <SettingsFab mt="auto" temperature />
                    <AlertBox />
                </Stack>
                <Box>
                    <Footer />
                </Box>
            </Box>
        </Box>
    );
}
