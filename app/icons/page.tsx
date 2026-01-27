"use client";
import { Box, Card, CardActionArea, CardContent, Container, Divider, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import Stack from "@mui/material/Stack";
import { WeatherIcon } from "@components/ui/weather-icon";
import { useRouter } from "next/navigation";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { weatherIconShowcase } from "./layout";

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
                    <Grid key={weatherIcon.id} size={{ lg: 3, md: 4, xs: 6 }}>
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
