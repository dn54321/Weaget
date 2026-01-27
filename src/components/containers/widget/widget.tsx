import { Box, Card, Divider, SxProps, Typography } from "@mui/material";
import React from "react";

export interface WidgetProps {
    children?: React.ReactNode
    disableChildrenPadding?: boolean
    rightDecorum?: React.ReactNode
    subtitle?: string
    sx?: SxProps
    title: string
    variant?: "default" | "transparent"
}

interface ContainerProps {
    children: React.ReactNode
    sx?: SxProps
    variant?: "default" | "transparent"
}

export function Widget(props: WidgetProps) {
    const isTransparent = (props.variant === "transparent");
    return (
        <Container sx={props.sx} variant={props.variant}>
            <Box
                display="flex"
                justifyContent="space-between"
                pb="5px"
                pt="15px"
                px={isTransparent ? "0px" : "15px"}
            >
                <Box>
                    <Typography component="h1" variant="body1"><b>{props.title}</b></Typography>
                    <Typography color="text.secondary" component="p" variant="body2">{props.subtitle}</Typography>
                </Box>
                <Typography component="div" variant="body2">{props.rightDecorum}</Typography>
            </Box>
            <Divider sx={{
                visibility: isTransparent ? "hidden" : "visible"
            }}
            />
            <Box sx={{ ...(!props.disableChildrenPadding && { pb: "15px", px: "15px" }) }}>
                {props.children}
            </Box>
        </Container>
    );
}

function Container(props: ContainerProps) {
    if (props.variant === "transparent") {
        return <Box component="section" sx={{ width: "100%", ...props.sx }}>{props.children}</Box>;
    }

    return <Card component="section" sx={{ width: "100%", ...props.sx }}>{props.children}</Card>;
}
