import { IconButton, styled } from "@mui/material";
import type { Theme } from "@mui/material";

export const StyledFooter = styled("footer")((props: { theme: Theme }) => ({
    backgroundColor: props.theme.palette.primary.dark,
    bottom: "0px",
    boxShadow: props.theme.shadows?.[1],
    color: props.theme.palette.primary.contrastText,
    height: "fit-content",
    left: "0px",
    position: "relative",
    right: "0px",
    zIndex: 1300,
}));

export const StyledIconButton = styled(IconButton)((props: { theme: Theme }) => ({
    "&:hover": {
        color: "white",
    },
    "backgroundColor": props.theme.palette.background.paper,
    "fontSize": "30px",
}));
