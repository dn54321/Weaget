"use client";
import { Box, Card, CardActionArea, CardContent, Container, Divider, Toolbar, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react";
import Grid from "@mui/material/Grid2";
import { weatherIconShowcase } from "./layout";
import { useRouter } from "next/navigation";
import { WeatherIcon } from "@components/ui/weather-icon";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export default function Page() {
    const router = useRouter();
    const { t } = useSystemTranslation();
    return (
        <Container maxWidth="lg">
            <Toolbar />
            <title>{`${t("webapp.name")} - ${t("weather.icon.text")}`}</title>
            <Typography component="h2" variant="h3">{t("weather.icon.text")}</Typography>
            <Divider />
            <Grid container spacing={2} mt="20px">
                {weatherIconShowcase.map(weatherIcon => (
                    <Grid key={weatherIcon.id} size={{ xs: 6, md: 4, lg: 3 }}>
                        <Card data-testid="icon-card">
                            <CardActionArea onClick={() => router.push(`icons/weather/${weatherIcon.id}`)}>
                                <CardContent>
                                    <Stack alignItems="center">
                                        <Box fontSize="8em"><WeatherIcon id={weatherIcon.id} decoration /></Box>
                                        <Typography variant="body1">{t(weatherIcon.name)}</Typography>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>

    );
}
