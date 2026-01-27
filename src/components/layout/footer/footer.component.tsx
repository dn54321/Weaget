import { Box, Container, Stack, Tooltip } from "@mui/material";
import type { ContainerProps, SxProps } from "@mui/system";
import { StyledFooter, StyledIconButton } from "./footer.styles";
import BrushIcon from "@mui/icons-material/Brush";
import CodeIcon from "@mui/icons-material/Code";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useRouter } from "next/navigation";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

/*
    A very simple footer after many attempts of design .
    Contains copyright information and buttons that when pressed
    takes you to a page.
*/

export interface FooterProps {
    footerProps?: SxProps;
    containerProps?: ContainerProps;
}

export default function Footer(props: FooterProps) {
    const { t } = useSystemTranslation();
    const router = useRouter();
    const footerNavigationItems = [
        {
            description: "footer.iconButton.sourceCode.description",
            hoverColor: "#006400",
            icon: <CodeIcon />,
            link: "https://github.com/dn54321/Weaget",
            title: "footer.iconButton.sourceCode.title",
        },
        {
            description: "footer.iconButton.github.description",
            hoverColor: "black",
            icon: <GitHubIcon />,
            link: "https://github.com/dn54321/",
            title: "footer.iconButton.github.title",
        },
        {
            description: "footer.iconButton.linkedIn.description",
            hoverColor: "#2867B2",
            icon: <LinkedInIcon />,
            link: "https://www.linkedin.com/in/daniel-pham-8bba33193/",
            title: "footer.iconButton.linkedIn.title",
        },
        {
            description: "footer.iconButton.icons.description",
            hoverColor: "orange",
            icon: <BrushIcon />,
            link: "/icons",
            title: "footer.iconButton.icons.title",
        },
    ];

    return (
        <StyledFooter sx={{
            fontSize: { sm: "16px", xs: "min(3.5vw, 16px)" },
            ...props.footerProps,
        }}
        >
            <Container maxWidth="md" {...props.containerProps}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="10px"
                    height="80px"
                >

                    {/* Copyright Message */}
                    <Box>
                        <Box py="15px" component="span">
                            {t("footer.copyright", {
                                formatParams: {
                                    year: { year: "numeric" },
                                },
                                year: new Date(),
                            }) + " "}
                        </Box>
                        <Box sx={{
                            display: { sm: "inline", xs: "block" },
                            textTransform: "capitalize",
                        }}
                        >
                            {t("footer.reserveNotice")}
                        </Box>
                    </Box>

                    {/* Links to social media / Icons Page */}
                    <Stack direction="row" height="fit-content" gap="10px" component="nav">
                        {footerNavigationItems.map(item => (
                            <StyledIconButton
                                aria-label={t(item.description)}
                                onClick={() => router.push(item.link)}
                                key={item.title}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: item.hoverColor,
                                    },
                                }}
                            >
                                <Tooltip title={t(item.title)}>{item.icon}</Tooltip>
                            </StyledIconButton>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </StyledFooter>
    );
}
