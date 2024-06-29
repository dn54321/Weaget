import Box from "@mui/material/Box";
import React from "react";
import { StatContainer } from "./weather-stats-card.styles";

export interface ItemContainerProps {
    children: React.ReactElement;
}

function ItemContainer(props: ItemContainerProps) {
    return (
        <Box
            sx={{
                display: "grid",
                justifyContent: "space-around",
                gridTemplateColumns: "repeat(auto-fill, 170px)",
                py: "10px",
            }}
            component="ul"
        >
            {props.children}
        </Box>
    );
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

export interface WeatherStatsCardProp {
    stats: Array<WeatherStats>;
}

export default function WeatherStatsCard(props: WeatherStatsCardProp) {
    return (
        <Box>
            <ItemContainer aria-live="polite">
                <React.Fragment>
                    {
                        props.stats
                            .filter(item => item.value !== undefined)
                            .map(stat => <IconCard key={stat.name} {...stat} />)
                    }
                </React.Fragment>
            </ItemContainer>
        </Box>
    );
}
