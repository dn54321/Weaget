import { IconButton } from "@mui/material";
import { styled } from "@mui/system";

export const StyledFooter = styled("footer")((props: any) => ({
    backgroundColor: props.theme.palette.primary.dark,
    color: props.theme.palette.primary.contrastText,
    height: "fit-content",
    boxShadow: props.theme.shadows[1],
    position: "relative",
    bottom: "0px",
    left: "0px",
    right: "0px",
    zIndex: 1300,
}));

export const StyledIconButton = styled(IconButton)((props: any) => ({
    "backgroundColor": props.theme.palette.background.paper,
    "fontSize": "30px",
    "&:hover": {
        color: "white",
    },
}));
