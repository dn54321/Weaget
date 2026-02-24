import { IconButton, InputBase, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

export const MagnifyIconButtonContainer = styled(IconButton)({
    color: "gray",
    display: "flex",
    margin: "0px 10px",
});

export const FormContainer = styled(Box)({
    width: "100%",
});

export const SearchComponent = styled(Paper)({
    alignItems: "center",
    display: "flex",
    padding: 5,
    paddingRight: 0,
});

export const SearchField = styled("div")({
    alignItems: "center",
    display: "flex",
    width: "100%",
});

export const FieldBox = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
        textOverflow: "ellipsis",
    },
    "&:focus": {
        outline: "none !important",
    },
    // "color": theme.vars.palette.text.primary,
    "padding": "5px 5px 0px 10px",
    "textOverflow": "hidden",
    "width": "100%",
}));

export const SuggestionText = styled(Box)(({ theme }) => ({
    borderBottom: `1px solid ${theme.vars.palette.divider}`,
    padding: "5px 10px",
    userSelect: "none",
}));
