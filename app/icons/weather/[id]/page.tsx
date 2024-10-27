"use client";
import { Box, Container, Toolbar, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react";
import Grid from "@mui/material/Grid2";
import { WeatherIcon } from "@components/ui/weather-icon";
import { weatherIconShowcase } from "@project/app/icons/layout";
import { use } from "react";
import { useTranslation } from "react-i18next";

export interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function Page(props: PageProps) {
    const params = use(props.params);
    const weatherId = parseInt(params.id);
    const weatherDetails = weatherIconShowcase.find(weather => weather.id === weatherId);
    const { t } = useTranslation();
    return (
        <Container maxWidth="lg">
            <Toolbar />
            <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
                <Box fontSize="15em"><WeatherIcon id={weatherId} /></Box>
                <Grid size={{ xs: 12, sm: 6 }} fontSize="20em">
                    {
                        weatherDetails === undefined
                            ? <Typography variant="body2">Invalid ID. Please try again later.</Typography>
                            : (
                                    <Box>
                                        <Typography variant="body2">
                                            <b>
                                                {t("page.iconGallery.name")}
                                                :
                                                {" "}
                                            </b>
                                            {t(weatherDetails.name)}
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
