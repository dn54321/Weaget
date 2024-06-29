import { Box, Card, Divider, Typography } from "@mui/material";
import React from "react";

export interface WidgetProps {
    title: string;
    subtitle?: string;
    rightDecorum?: React.ReactNode;
    children?: React.ReactNode;
    disableChildrenPadding?: boolean;
    variant?: "default" | "transparent";
}

interface ContainerProps {
    variant?: "default" | "transparent";
    children: React.ReactNode;
}

function Container(props: ContainerProps) {
    if(props.variant === "transparent") {
        return <Box component="section" sx={{width: "100%"}}>{props.children}</Box>

    }

    return <Card component="section" sx={{width: "100%"}}>{props.children}</Card>
}

export function Widget(props: WidgetProps) {
    const isTransparent = (props.variant === "transparent");
    return (
        <Container variant={props.variant}>
            <Box 
                display="flex" 
                justifyContent="space-between" 
                pt="15px" 
                px={isTransparent ? "0px" : "15px"} 
            > 
                <Box>
                    <Typography component="h1" variant="body1"><b>{props.title}</b></Typography>
                    <Typography component="p" variant="body2" color="text.secondary">{props.subtitle}</Typography>
                </Box>
                <Typography variant="body2" component="div">{props.rightDecorum}</Typography>
            </Box>
            <Divider sx={{
                visibility: isTransparent ? "hidden" : "visible",
            }}/>
            <Box sx={{...(!props.disableChildrenPadding && {px: "15px", pb:"15px"})}}>
                {props.children}
            </Box>
        </Container>
    )
}