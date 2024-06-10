import { Box, Card, Divider, Typography } from "@mui/material";
import React from "react";

export interface WidgetProps {
    title: string;
    subtitle?: string;
    rightDecorum?: React.ReactNode;
    children: React.ReactNode;
    disableChildrenPadding?: boolean;
}
export function Widget(props: WidgetProps) {
    return (
        <Card sx={{color: "black"}}>
            <Box display="flex" justifyContent="space-between" pt="15px" px="15px" > 
                <Box>
                    <Typography component="h1" variant="body2"><b>{props.title}</b></Typography>
                    <Typography component="p" variant="caption" color="text.secondary"><b>{props.subtitle}</b></Typography>
                </Box>
                <Typography variant="body2" component="div">{props.rightDecorum}</Typography>
            </Box>
            <Divider sx={{mb:"5px"}}/>
            <Box sx={{...(!props.disableChildrenPadding && {px: "15px", pb:"15px"})}}>
            {props.children}
            </Box>
        </Card>
    )
}