"use client";
import { Box, Container, Toolbar, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react";
import Grid from "@mui/material/Grid2";
import { WeatherIcon } from "@components/ui/weather-icon";
import { weatherIconShowcase } from "@project/app/icons/layout";
import { use } from "react";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export interface PageProps {
    params: Promise<{
        id: string;
    }>;
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
            <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
                <Box fontSize="15em"><WeatherIcon id={weatherId} /></Box>
                <Grid size={{ xs: 12, sm: 6 }} fontSize="20em">
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
