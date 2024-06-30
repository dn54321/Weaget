"use client";
import { Box, Card, CardActionArea, CardContent, Container, Divider, Toolbar, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react";
import Grid from "@mui/system/Unstable_Grid";
import { weatherIconShowcase } from "./layout";
import { useRouter } from "next/navigation";
import { WeatherIcon } from "@components/ui/weather-icon";

export default function Page() {
    const router = useRouter();
    return (
        <Container maxWidth="lg">
            <Toolbar />
            <Typography component="h2" variant="h3">Weather Icons</Typography>
            <Divider />
            <Grid container spacing={2} mt="20px">
                {weatherIconShowcase.map(weatherIcon => (
                    <Grid key={weatherIcon.id} xs={6} md={4} lg={3}>
                        <Card data-testid="icon-card">
                            <CardActionArea onClick={() => router.push(`icons/weather/${weatherIcon.id}`)}>
                                <CardContent>
                                    <Stack alignItems="center">
                                        <Box fontSize="8em"><WeatherIcon id={weatherIcon.id} decoration /></Box>
                                        <Typography variant="body1">{weatherIcon.name}</Typography>
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
