"use client";
import { Box, Container, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import Stack from "@mui/material/Stack";
import { WeatherIcon } from "@components/ui/weather-icon";
import { use } from "react";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { weatherIconShowcase } from "@project/app/icons/layout";

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
            <Stack direction={{ md: "row", xs: "column" }} alignItems="center">
                <Box fontSize="15em"><WeatherIcon id={weatherId} /></Box>
                <Grid size={{ sm: 6, xs: 12 }} fontSize="20em">
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
