import { IconButton } from "@mui/material";
import { styled } from "@mui/system";

export const StyledFooter = styled("footer")((props: any) => ({
    backgroundColor: props.theme.palette.primary.dark,
    color: props.theme.palette.primary.contrastText,
    height: "fit-content",
    boxShadow: props.theme.shadows[1],
}));

export const StyledIconButton = styled(IconButton)((props: any) => ({
    "backgroundColor": props.theme.palette.background.paper,
    "fontSize": "30px",
    "&:hover": {
        color: "white",
    },
}));
