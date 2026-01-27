"use client";
import { WeatherIcon } from "@components/ui/weather-icon";
import { Box, Container, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { weatherIconShowcase } from "@src/app/icons/layout";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { use } from "react";

export interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default function Page(props: PageProps) {
    const params = use(props.params);
    const weatherId = parseInt(params.id);
    const weatherDetails = weatherIconShowcase.find(weather => weather.id === weatherId);
    const { t } = useSystemTranslation();
    const weatherName = weatherDetails ? t(weatherDetails.name) : "";
    return (
        <Container maxWidth="lg">
            <Toolbar />
            <title>{`${weatherName} - ${t("webapp.name")}`}</title>
            <Stack alignItems="center" direction={{ md: "row", xs: "column" }}>
                <Box fontSize="15em"><WeatherIcon id={weatherId} /></Box>
                <Grid fontSize="20em" size={{ sm: 6, xs: 12 }}>
                    {
                        weatherDetails === undefined
                            ? <Typography variant="body2">{t("page.iconGallery.invalidIcon")}</Typography>
                            : (
                                <Box>
                                    <Typography variant="body2">
                                        <b>
                                            {t("page.iconGallery.name")}
                                            :
                                            {" "}
                                        </b>
                                        {weatherName}
                                    </Typography>
                                    <Typography variant="body2">
                                        <b>
                                            {t("page.iconGallery.description")}
                                            :
                                            {" "}
                                        </b>
                                        {t(weatherDetails.description)}
                                    </Typography>
                                </Box>
                            )
                    }
                </Grid>
            </Stack>
        </Container>

    );
}
