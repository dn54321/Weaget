import Box from "@mui/material/Box";
import styled from "@mui/system/styled";

export const Page = styled(Box)`
    min-height: 100%;
    position: relative;
    backgroundColor: #f7f7f7;
`;

export const SXContainer = (props) => {
    return (
        <Box sx={{ display: { xs: "inline", md: "none" } }} {...props}>
            {props.children}
        </Box>
    );
};

export const NSXContainer = (props) => {
    return (
        <Box sx={{ display: { xs: "none", md: "flex" } }} {...props}>
            {props.children}
        </Box>
    );
};
