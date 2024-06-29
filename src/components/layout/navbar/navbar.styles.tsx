import { IconButton, styled } from "@mui/material";
import Logo from "@components/icon/core/logo-icon/logo-icon.component";

export const OutlinedLogo = styled(Logo)(() => ({
    padding: "1px 5px",
    width: "fit-content",
    borderRadius: "5px",
}));

export const Icon = styled(IconButton)(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: "15px",
    "&:hover": {
        backgroundColor: theme.palette.primary.light
    }
}))