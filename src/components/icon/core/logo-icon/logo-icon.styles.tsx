import { Box, styled } from "@mui/material";

export const LogoIconStyle = styled(Box)(({ theme }) => ({
    "&::after": {
        "--width": "2.5em",
        "borderRadius": "calc(var(--width) * 0.5)",
        "top": "1.3em",
        "width": "var(--width)"
    },
    "&::before": {
        "--width": "1.5em",
        "borderRadius": "calc(var(--width) * 0.5)",
        "left": "1.3em",
        "top": "0.7em",
        "width": "var(--width)"
    },

    // Clouds Icon
    "&:after, &:before": {
        backgroundColor: "white",
        boxShadow: theme.shadows?.[1],
        content: "''",
        display: "inline-block",
        filter: "drop-shadow(0px 0px 2em #eee)",
        height: "0.5em",
        position: "absolute"
    },
    "backgroundColor": "#fada5e",
    "borderRadius": "1em",
    "boxShadow": theme.shadows?.[1],
    "height": "2em",
    "position": "relative",
    // Sun Icon
    "width": "2em"
}));

export const Text = styled(Box) (() => ({
    display: "inline-block",
    fontSize: "1em",
    paddingLeft: "0.1em",
    textShadow: "-1px 1px 2px rgba(0,0,0,0.2)",
    transform: "translateY(15%)",
    whiteSpace: "nowrap",
    zIndex: "1"
}));
