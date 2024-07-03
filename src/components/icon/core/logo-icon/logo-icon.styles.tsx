import { Box, styled } from "@mui/material";

export const LogoIconStyle = styled(Box)(({ theme }) => ({
    // Sun Icon
    "width": "2em",
    "height": "2em",
    "borderRadius": "1em",
    "boxShadow": theme.shadows?.[1],
    "backgroundColor": "#fada5e",
    "position": "relative",

    // Clouds Icon
    "&:after, &:before": {
        position: "absolute",
        display: "inline-block",
        content: "''",
        backgroundColor: "white",
        filter: "drop-shadow(0px 0px 2em #eee)",
        height: "0.5em",
        boxShadow: theme.shadows?.[1],
    },
    "&::before": {
        "--width": "1.5em",
        "width": "var(--width)",
        "borderRadius": "calc(var(--width) * 0.5)",
        "top": "0.7em",
        "left": "1.3em",
    },
    "&::after": {
        "--width": "2.5em",
        "width": "var(--width)",
        "borderRadius": "calc(var(--width) * 0.5)",
        "top": "1.3em",
    },
}));

export const Text = styled(Box) (() => ({
    "fontSize": "1em",
    "paddingLeft": "0.1em",
    "transform": "translateY(15%)",
    "zIndex": "1",
    "textShadow": "-1px 1px 2px rgba(0,0,0,0.2)",
    "whiteSpace": "nowrap",
    "&:after, &:before": {
        display: "inline-block",
    },
    "&::before": {
        content: "'Wea'",
        color: "lightblue",
    },
    "&::after": {
        content: "'get'",
        color: "lightpink",
    },
}));
