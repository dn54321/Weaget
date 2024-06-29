import { styled, Box, Card } from "@mui/material";

export const Day = styled(Box)(() => ({
    fontWeight: "bold",
}));

export const ShortDate = styled(Box)(() => ({
    color: "#ddd",
    fontSize: "0.8em",
}));

export const WeatherDescription = styled(Box)(() => ({
    fontSize: "0.5em",
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
    display: "inline",
    color: theme.palette.grey?.[200],
}));

export const IconBox = styled(Box)(() => ({
    position: "relative",
}));

export const CardContainer = styled(Card)(({ theme }) => ({
    "backgroundColor": theme.palette.primary.light,
    "color": theme.palette.primary.contrastText,
    "boxShadow": theme.shadows[3],
    "minWidth": "120px",
    "width": "100%",
    "borderRadius": "10px",
    "& .MuiCardActionArea-root": {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        padding: "10px 5px",
        fontSize: "16px",
    },
}));
