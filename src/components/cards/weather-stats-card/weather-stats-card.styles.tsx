import { styled } from "@mui/system";

export const StatContainerListItem = styled("li")(({ theme }) => ({
    "& div:nth-of-type(2)": {
        color: theme.palette.text.color,
        gridColumn: "2"
    },
    "& div:nth-of-type(3)": {
        fontWeight: "bold",
        gridColumn: "2",
        gridRow: "2"
    },
    "& svg:nth-of-type(1)": {
        color: theme.palette.primary.light,
        fontSize: "2em",
        gridColumn: "1",
        gridRow: "1 / 3",
        placeSelf: "center"
    },
    "display": "inline-grid",
    "gridTemplateColumns": "60px auto",
    "gridTemplateRows": "1fr 1fr",
    "margin": "10px",
    "whiteSpace": "nowrap",
    "width": "150px"
}));

export const CardUnorderedList = styled("ul")(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 170px)",
    justifyContent: "space-around",
    padding: "10px 0px",
    width: "100%"
}));
