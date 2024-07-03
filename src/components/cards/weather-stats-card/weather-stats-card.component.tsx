import Box from "@mui/material/Box";
import React from "react";
import { CardContainer, StatContainer } from "./weather-stats-card.styles";
import { Card, SxProps } from "@mui/material";

export interface ItemContainerProps {
    children: React.ReactElement;
}

export interface WeatherStats {
    name: string;
    statIcon: JSX.Element | number | string;
    value: any;
    compactValue?: JSX.Element | number | string;
    unit?: string;
}

function IconCard(props: WeatherStats) {
    return (
        <StatContainer component="li">
            {props.statIcon}
            <Box>{props.name}</Box>
            <Box fontSize="0.9em">
                {props.value}
                {props.unit}
            </Box>
        </StatContainer>
    );
}

export interface WeatherStatsCardProps {
    stats: Array<WeatherStats>;
    transparent?: boolean;
    sx?: SxProps;
}

export default function WeatherStatsCard(props: WeatherStatsCardProps) {
    const component = props.transparent ? Box : Card;
    return (
        <CardContainer component={component} aria-live="polite" sx={props.sx}>
            {
                props.stats
                    .filter(item => item.value !== undefined)
                    .map(stat => <IconCard key={stat.name} {...stat} />)
            }
        </CardContainer>
    );
}
