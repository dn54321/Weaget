import { Card, SxProps } from "@mui/material";
import { CardUnorderedList, StatContainerListItem } from "./weather-stats-card.styles";
import Box from "@mui/material/Box";
import React from "react";

export interface ItemContainerProps {
    children: React.ReactElement;
}

export interface WeatherStats {
    name: string;
    statIcon: JSX.Element | number | string;
    value?: JSX.Element | number | string;
    compactValue?: JSX.Element | number | string;
    unit?: string;
}

function IconCard(props: WeatherStats) {
    return (
        <StatContainerListItem>
            {props.statIcon}
            <Box>{props.name}</Box>
            <Box fontSize="0.9em">
                {props.value}
                {props.unit}
            </Box>
        </StatContainerListItem>
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
        <Box component={component}>
            <CardUnorderedList aria-live="polite" sx={props.sx}>
                {
                    props.stats
                        .filter(item => item.value !== undefined)
                        .map(stat => <IconCard key={stat.name} {...stat} />)
                }
            </CardUnorderedList>
        </Box>
    );
}
