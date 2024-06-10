import BrushIcon from '@mui/icons-material/Brush';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Container, IconButton, Stack, Tooltip } from '@mui/material';
import { ContainerProps } from '@mui/system';
import styled from '@mui/system/styled';
import theme from '@src/utils/theme';
import { redirect, useRouter } from 'next/navigation';

/*
    A very simple footer after many attempts of design .
    Contains copyright information and buttons that when pressed
    takes you to a page.
*/

const StyledFooter = styled('footer')({ 
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    height: "fit-content",
    boxShadow: theme.shadows[1]
});

const StyledIconButton = styled(IconButton)((props: { hoverColor?: string}) => ({
    backgroundColor: "white",
    fontSize:"30px",
    "&:hover": {
        color: "white",
    }
}))

export default function Footer(props: ContainerProps) {
    const router = useRouter();
    const footerNavigationItems = [
        {
            icon: <CodeIcon/>,
            title: "Source Code",
            description: "Access Source Code",
            link: "https://github.com/dn54321/Weaget",
            hoverColor: "#006400",
        },
        {
            icon: <GitHubIcon />,
            title: "Github Page",
            description: "Access Github Page",
            link: "https://github.com/dn54321/",
            hoverColor: "black"
        },
        {
            icon: <LinkedInIcon />,
            title: "LinkedIn Page",
            description: "Access LinkedIn Page",
            link: "https://www.linkedin.com/in/daniel-pham-8bba33193/",
            hoverColor: "#2867B2"
        },
        {
            icon: <BrushIcon />,
            title: "Icons Page",
            description: "Access Weather Icons Page",
            link: "/icons",
            hoverColor: "orange"
        }
    ]

    return (
        <StyledFooter sx={{fontSize: {sm: "16px", xs: "min(3.5vw, 16px)"}}}>
            <Container {...props}>
            <Stack direction="row" 
            justifyContent="space-between" alignItems="center" gap="10px" height="80px">

                {/* Copyright Message */}
                <Box>
                    <Box py="15px" component="span">@{new Date().getFullYear()} DN54321. </Box>
                    <Box sx={{display: {xs: "block", sm: "inline"}}}>All Rights Reserved.</Box>
                </Box>

                {/* Links to social media / Icons Page */}
                <Stack direction="row" height="fit-content" gap="10px" component="nav">
                    {footerNavigationItems.map((item) => (
                        <StyledIconButton 
                            aria-label={item.description}
                            onClick={() => router.push(item.link)}
                            key={item.title}
                            sx={{
                                "&:hover": {
                                    backgroundColor: item.hoverColor
                                }
                            }}
                        >
                            <Tooltip title={item.title}>{item.icon}</Tooltip>
                        </StyledIconButton>
                    ))}                
                </Stack>
            </Stack>
            </Container>
        </StyledFooter>
    )
}
  

