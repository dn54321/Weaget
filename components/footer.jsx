
import BrushIcon from '@mui/icons-material/Brush';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styled from '@mui/system/styled';
import theme from '@src/theme';
import {Box, Container, IconButton, Stack, Tooltip} from '@mui/material';
/*
    A very simple footer after many attempts of design .
    Contains copyright information and buttons that when pressed
    takes you to a page.
*/

// Styles

const StyledFooter = styled('footer')({ 
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    height: "fit-content",
    boxShadow: theme.shadows[1]
});


const StyledIconButton = styled(IconButton)((props) => ({
    backgroundColor: "white",
    fontSize:"30px",
    "&:hover": {
        backgroundColor: props.hovercolor,
        color: "white"
    }
}))

const CopyrightMessage = (props) => (
    <Box>
        <Box py="15px" component="span">@{new Date().getFullYear()} DN54321. </Box>
        <Box sx={{display: {xs: "block", sm: "inline"}}}>All Rights Reserved.</Box>
    </Box>
)

export default function Footer(props) {
    return (
        <StyledFooter sx={{fontSize: {sm: "16px", xs: "min(3.5vw, 16px)"}}}>
            <Container maxWidth={props.maxWidth}>
            <Stack direction="row" 
            justifyContent="space-between" alignItems="center" gap="10px" height="80px">

                {/* Copyright Message */}
                <CopyrightMessage/>

                {/* Links to social media / Icons Page */}
                <Stack direction="row" height="fit-content" gap="10px" component="nav">
                    <StyledIconButton aria-label="Access Source Code" hovercolor="#006400"
                    href="https://github.com/dn54321/Weaget">
                        <Tooltip title="Source Code"><CodeIcon/></Tooltip>
                    </StyledIconButton>                   
                    <StyledIconButton aria-label="Access Github Page" hovercolor="black"
                    href="https://github.com/dn54321/">
                        <Tooltip title="Github Page"><GitHubIcon/></Tooltip></StyledIconButton>
                    <StyledIconButton aria-label="Access LinkedIn Page" hovercolor="#2867B2"
                    href="https://www.linkedin.com/in/daniel-pham-8bba33193/">
                        <Tooltip title="LinkedIn Page"><LinkedInIcon/></Tooltip></StyledIconButton>
                    <StyledIconButton aria-label="Access Weather Icons Page" hovercolor="orange"
                    href="/icons">
                        <Tooltip title="Icons Page"><BrushIcon/></Tooltip></StyledIconButton>
                </Stack>
            </Stack>
            </Container>
        </StyledFooter>
    )
}
  

