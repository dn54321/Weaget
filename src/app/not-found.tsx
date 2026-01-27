"use client";
import { ThemeToggleButton } from "@components/ui/theme-toggle-button";
import CloudIcon from "@mui/icons-material/Cloud";
import { Box, Button, Container, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styled from "@mui/system/styled";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

interface IconBoxProps {
    children: Array<JSX.Element> | JSX.Element
}
function IconBox(props: IconBoxProps) {
    return (
        <Box
            height="100%"
            sx={{ display: "grid", fontSize: {
                lg: "562px",
                md: "40vw",
                sm: "400px",
                xs: "300px"
            },
            placeItems: "center" }}
        >
            <Box sx={{
                "& svg": {
                    color: "gray",
                    position: "absolute",
                    transform: "translate(-50%,-50%)"
                },
                "& svg:nth-child(1)": {
                    filter: "brightness(80%) drop-shadow(0px 0px 2em #eee)",
                    fontSize: "20rem",
                    left: "50%",
                    top: "45%"
                },
                "& svg:nth-child(2)": {
                    filter: "drop-shadow(0px 0px 2em #eee)",
                    fontSize: "16rem",
                    left: "60%",
                    top: "60%"
                },
                "height": "20rem",
                "position": "relative",
                "width": "20rem"
            }}
            >
                {props.children}
            </Box>
        </Box>
    );
}

const Page = styled(Box) (() => ({
    height: "100%"
}));

export default function NotFound() {
    const { t } = useSystemTranslation();
    return (
        <Page>
            <title>{`${t("webapp.name")} - ${t("page.404.pageNotFound")}` }</title>
            <Container disableGutters maxWidth="lg" sx={{ height: "100%" }}>
                <Box position="absolute" right={10} top={10}>
                    <ThemeToggleButton />
                </Box>
                <Grid
                    container
                    gap={0}
                    sx={{
                        height: "100%",
                        width: "100%"
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
                            height="100%"
                            justifyContent={{ md: "center", sm: "initial" }}
                            sx={{ color: "text.primary", px: "10px" }}
                        >
                            <Box component="h1" sx={{ fontSize: "100px", margin: "0px" }}>404</Box>
                            <Box fontSize="16px" sx={{ textAlign: "center" }}>{t("page.404.description")}</Box>
                            <Button href="/" sx={{ mt: "40px" }} variant="contained">{t("page.404.goBackToHomeButton")}</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
