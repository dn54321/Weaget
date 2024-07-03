import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const StatContainer = styled(Box)(({ theme }) => ({
    "width": "150px",
    "margin": "10px",
    "display": "inline-grid",
    "gridTemplateColumns": "60px auto",
    "gridTemplateRows": "1fr 1fr",
    "whiteSpace": "nowrap",
    "& svg:nth-of-type(1)": {
        gridColumn: "1",
        gridRow: "1 / 3",
        fontSize: "2em",
        placeSelf: "center",
        color: theme.palette.primary.light,
    },
    "& div:nth-of-type(2)": {
        gridColumn: "2",
        color: theme.palette.text.color,
    },
    "& div:nth-of-type(3)": {
        gridColumn: "2",
        gridRow: "2",
        fontWeight: "bold",
    },
}));

export const CardContainer = styled(Box)(() => ({
    display: "grid",
    justifyContent: "space-around",
    gridTemplateColumns: "repeat(auto-fill, 170px)",
    padding: "10px 0px",
}));
