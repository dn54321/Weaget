import { Box, Paper, styled } from "@mui/material";

export const High = styled(Box)(() => ({
    fontSize: "1em",
    display: "inline",
}));

export const Low = styled(Box)(({ theme }) => ({
    fontSize: "0.8em",
    display: "inline",
    color: theme.palette.grey[600],
}));

export const PaperContainer = styled(Paper)(({ theme }) => ({
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    aspectRatio: "1",
    justifyContent: "center",
}));
