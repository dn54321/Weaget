import { Paper, InputBase, IconButton } from "@mui/material";
import { Box, styled } from "@mui/system";

export const MagnifyIconButtonContainer = styled(IconButton)({
    color: "gray",
    margin: "0px 10px",
    display: "flex",
});

export const FormContainer = styled(Box)({
    width: "100%",
});

export const SearchComponent = styled(Paper)({
    display: "flex",
    alignItems: "center",
    padding: 5,
    paddingRight: 0,
});

export const SearchField = styled("div")({
    display: "flex",
    alignItems: "center",
    width: "100%",
});

export const FieldBox = styled(InputBase)(({ theme }) => ({
    "color": theme.palette.text.primary,
    "padding": "5px 5px 0px 10px",
    "width": "100%",
    "textOverflow": "hidden",
    "&:focus": {
        outline: "none !important",
    },
    "& .MuiInputBase-input": {
        textOverflow: "ellipsis",
    },
}));

export const SuggestionText = styled("li")(({ theme }) => ({
    "borderBottom": `1px solid ${theme.palette.divider}`,
    "padding": "5px 10px",
    "userSelect": "none",
    "&.Mui-focused": {
        backgroundColor: theme.palette.action.hover,
    },
}));
