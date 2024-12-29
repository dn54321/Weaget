"use client";
import { Box, Button, Container, Stack } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import Grid from "@mui/material/Grid2";
import React from "react";
import { ThemeToggleButton } from "@components/ui/theme-toggle-button";
import styled from "@mui/system/styled";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

interface IconBoxProps {
    children: JSX.Element | Array<JSX.Element>;
}
function IconBox(props: IconBoxProps) {
    return (
        <Box
            sx={{ display: "grid", fontSize: {
                lg: "562px",
                md: "40vw",
                sm: "400px",
                xs: "300px",
            },
            placeItems: "center" }}
            height="100%"
        >
            <Box sx={{
                "& svg": {
                    color: "gray",
                    position: "absolute",
                    transform: "translate(-50%,-50%)",
                },
                "& svg:nth-child(1)": {
                    filter: "brightness(80%) drop-shadow(0px 0px 2em #eee)",
                    fontSize: "20rem",
                    left: "50%",
                    top: "45%",
                },
                "& svg:nth-child(2)": {
                    filter: "drop-shadow(0px 0px 2em #eee)",
                    fontSize: "16rem",
                    left: "60%",
                    top: "60%",
                },
                "height": "20rem",
                "position": "relative",
                "width": "20rem",
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
    const { t } = useSystemTranslation();
    return (
        <Page>
            <title>{`${t("webapp.name")} - ${t("page.404.pageNotFound")}` }</title>
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
                    <Grid size={{ md: 6, xs: 12 }}>
                        <IconBox>
                            <CloudIcon />
                            <CloudIcon />
                        </IconBox>
                    </Grid>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <Stack
                            alignItems="center"
                            justifyContent={{ md: "center", sm: "initial" }}
                            height="100%"
                            sx={{ color: "text.primary", px: "10px" }}
                        >
                            <Box component="h1" sx={{ fontSize: "100px", margin: "0px" }}>404</Box>
                            <Box fontSize="16px" sx={{ textAlign: "center" }}>{t("page.404.description")}</Box>
                            <Button href="/" variant="contained" sx={{ mt: "40px" }}>{t("page.404.goBackToHomeButton")}</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
