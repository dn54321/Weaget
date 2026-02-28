import { Box, Paper, styled } from "@mui/material";

export const High = styled(Box)(({ theme }) => ({
    display: "inline",
    fontSize: "1em",
    color: theme.vars.palette.text.primary,
}));

export const Low = styled(Box)(({ theme }) => ({
    color: theme.vars.palette.grey[600],
    display: "inline",
    fontSize: "0.8em",
}));

export const PaperContainer = styled(Paper)(({ theme }) => ({
    alignItems: "center",
    color: theme.vars.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    padding: "5px 0px",
    [theme.breakpoints.up("sm")]: {
        aspectRatio: "1",
    },
}));
