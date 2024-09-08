"use client";
import { Button, Stack, Box, Container } from "@mui/material";
import Head from "next/head";
import CloudIcon from "@mui/icons-material/Cloud";
import styled from "@mui/system/styled";
import { ThemeToggleButton } from "@components/ui/theme-toggle-button";
import Grid from "@mui/material/Grid2";
import React from "react";

interface IconBoxProps {
    children: JSX.Element | Array<JSX.Element>;
}
function IconBox(props: IconBoxProps) {
    return (
        <Box
            sx={{ display: "grid", placeItems: "center",
                fontSize: {
                    lg: "562px",
                    md: "40vw",
                    sm: "400px",
                    xs: "300px",
                } }}
            height="100%"
        >
            <Box sx={{
                "position": "relative",
                "width": "20rem",
                "height": "20rem",
                "& svg": {
                    color: "gray",
                    position: "absolute",
                    transform: "translate(-50%,-50%)",
                },
                "& svg:nth-child(1)": {
                    top: "45%",
                    left: "50%",
                    fontSize: "20rem",
                    filter: "brightness(80%) drop-shadow(0px 0px 2em #eee)",
                },
                "& svg:nth-child(2)": {
                    top: "60%",
                    left: "60%",
                    fontSize: "16rem",
                    filter: "drop-shadow(0px 0px 2em #eee)",
                },
            }}
            >
                {props.children}
            </Box>
        </Box>
    );
}

const Page = styled(Box) (() => ({
    height: "100%",
}));

export default function NotFound() {
    return (
        <Page>
            <Head>
                <title>Weaget - Not Found</title>
            </Head>
            <Container maxWidth="lg" sx={{ height: "100%" }} disableGutters>
                <Box position="absolute" top={10} right={10}>
                    <ThemeToggleButton />
                </Box>
                <Grid
                    container
                    gap={0}
                    sx={{
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <Grid size={{ xs: 12, md: 6 }}>
                        <IconBox>
                            <CloudIcon />
                            <CloudIcon />
                        </IconBox>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack
                            alignItems="center"
                            justifyContent={{ sm: "initial", md: "center" }}
                            height="100%"
                            sx={{ color: "text.primary", px: "10px" }}
                        >
                            <Box component="h1" sx={{ fontSize: "100px", margin: "0px" }}>404</Box>
                            <Box fontSize="16px" sx={{ textAlign: "center" }}>The page you have been looking for could not be found.</Box>
                            <Button href="/" variant="contained" sx={{ mt: "40px" }}>Go back to home</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
