import { Box, Paper, styled } from "@mui/material";

export const High = styled(Box)(() => ({
    display: "inline",
    fontSize: "1em"
}));

export const Low = styled(Box)(({ theme }) => ({
    color: theme.palette.grey[600],
    display: "inline",
    fontSize: "0.8em"
}));

export const PaperContainer = styled(Paper)(({ theme }) => ({
    alignItems: "center",
    aspectRatio: "1",
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative"
}));
