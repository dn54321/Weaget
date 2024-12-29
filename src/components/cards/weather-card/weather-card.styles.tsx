import { Box, Card, styled } from "@mui/material";

export const Day = styled(Box)(() => ({
    fontWeight: "bold",
}));

export const ShortDate = styled(Box)(() => ({
    color: "#ddd",
    fontSize: "0.8em",
}));

export const WeatherDescription = styled(Box)(() => ({
    fontSize: "0.65em",
}));

export const Temperature = styled(Box)(() => ({
    marginTop: "5px",
}));

export const High = styled(Box)(() => ({
    "--fontSize": "2em",
    "display": "inline",
    "fontSize": "var(--fontSize)",
}));

export const Low = styled(Box)(({ theme }) => ({
    color: theme.palette.grey?.[200],
    display: "inline",
}));

export const IconBox = styled(Box)(() => ({
    position: "relative",
}));

export const CardContainer = styled(Card)(({ theme }) => ({
    "& .MuiCardActionArea-root": {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        fontSize: "16px",
        padding: "10px 5px",
    },
    "backgroundColor": theme.palette.primary.light,
    "borderRadius": "10px",
    "boxShadow": theme.shadows?.[3],
    "color": theme.palette.primary.contrastText,
    "minWidth": "120px",
    "width": "100%",
}));
