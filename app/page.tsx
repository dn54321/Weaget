"use client";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { DailyCompactWeatherWidget } from "@components/widgets/daily-compact-weather-widget";
import { Footer } from "@components/layout/footer";
import { LocalisationDropdownButton } from "@components/ui/localisation-dropdown-button/localisation-dropdown-button.component";
import LocationGridWidget from "@components/widgets/location-grid-widget/location-grid-widget.component";
import { Logo } from "@components/icon/core/logo-icon";
import { SearchBar } from "@components/ui/search-bar";
import { SettingsFab } from "@components/ui/settings-fab";
import Stack from "@mui/material/Stack";
import { ThemeToggleButton } from "@components/ui/theme-toggle-button";
import { styled } from "@mui/material/styles";
import { useAlert } from "@src/hooks/use-alert";
import { useEffect } from "react";
import { useGetCurrentLocation } from "@src/hooks/use-get-current-location";
import { useGetNearbyLocation } from "@src/hooks/use-get-nearby-location";
import { useGetWeather } from "@src/hooks/use-get-weather";
import { useSystemSettings } from "@src/hooks/use-system-settings";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { useWidgetStore } from "@src/hooks/stores/use-widget-store";
const Loader = () => {
    const { t } = useSystemTranslation();
    return (
        <Stack
            data-testid="loader"
            alignItems="center"
            sx={{
                color: "primary.text",
                height: "100%",
                mt: "50px",
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
    top: "20px",
    [theme.breakpoints.down("md")]: {
        "& ul,ol": {
            justifyContent: "center",
        },
        "flexDirection": "column",
        "gap": "50px",
    },
}));

const SearchContainer = styled("main")(({ theme }) => ({
    alignItems: "center",
    backgroundColor: theme.vars.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    height: "400px",
    justifyContent: "center",
}));

const PageDivider = styled(Box)(({ theme }) => ({
    backgroundColor: theme.vars.palette.divider,
    height: "50px",
}));

const ResponsiveLogo = styled(Logo)(({ theme }) => ({
    fontSize: "min(13vw, 60px)",
    mb: "30px",
    pt: "100px",
    zIndex: "0",
    [theme.breakpoints.up("sm")]: {
        fontSize: "60px",
    },
}));

const PaddedSearchBar = () => (
    <Box sx={{
        display: "grid",
        mt: "40px",
        placeItems: "center",
        px: "10%",
        width: "100%",
        zIndex: "2",
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
    const { AlertBox, addAlert } = useAlert();

    useEffect(() => {
        if (weatherQuery.isError) {
            addAlert({
                duration: Infinity,
                message: "Error fetching weather data. Please try again later.",
                type: "error",
            });
        }
        if (locationQuery.isError || currentLocationQuery.isError) {
            addAlert({
                duration: Infinity,
                message: "Error fetching location data. Please try again later.",
                type: "error",
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
            <meta name="description" content={t("webapp.description")} />
            <Box display="grid" gridTemplateRows="1fr auto" width="100%" height="100%" position="relative">
                <Stack alignItems="center" direction="row" position="absolute" top={10} right={10}>
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
                            alignItems: { md: "initial", xs: "center" },
                        }}
                    >
                        { weatherQuery.data && locationQuery.data && currentLocationQuery.data
                            ? (
                                    <>
                                        <DailyCompactWeatherWidget
                                            title={t("weather.localWeather")}
                                            subtitle={location}
                                            weatherData={weatherQuery.data}
                                            location={location}
                                            sx={{ maxWidth: "550px" }}
                                        />
                                        <LocationGridWidget
                                            locationData={locationQuery.data}
                                            sx={{ maxWidth: "550px" }}
                                        />
                                    </>
                                )
                            : <Loader />}
                    </Section>
                    <SettingsFab temperature mt="auto" />
                    <AlertBox />
                </Stack>
                <Box>
                    <Footer />
                </Box>
            </Box>
        </Box>
    );
}
