import { IconButton, styled } from "@mui/material";
import Logo from "@components/icon/core/logo-icon/logo-icon.component";

export const OutlinedLogo = styled(Logo)(() => ({
    borderRadius: "5px",
    padding: "1px 5px",
    width: "fit-content",
}));

export const Icon = styled(IconButton)(({ theme }) => ({
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
    },
    "border": `1px solid ${theme.palette.primary.light}`,
    "borderRadius": "15px",
}));
