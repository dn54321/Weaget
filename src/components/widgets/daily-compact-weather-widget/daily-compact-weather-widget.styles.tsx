import { Button, styled } from "@mui/material";

/*
    Compact weather card list is a grid containing simplified weather cards.
    Each weather card is a square box that contains:
        Name
        Icon
        Rain Information (If Applicable)
        Temp High, Temp Low

    This component is to provide basic weather information and a button that
    leads to more weather details on the user's request.
*/

export const StyledButton = styled(Button)(({ theme }) => ({
    "&:hover": {
        backgroundColor: theme.palette.primary.main,
    },
    "backgroundColor": theme.palette.primary.dark,
    "color": theme.palette.primary.contrastText,
    "marginTop": "20px",
    "width": "fit-content",
}));
