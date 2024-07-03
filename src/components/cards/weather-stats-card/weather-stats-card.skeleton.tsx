import { Skeleton, Box, Card, Stack, SxProps } from "@mui/material";
import { CardContainer } from "./weather-stats-card.styles";
import React from "react";

export interface WeatherStatsCardSkeletonProps {
    statsCount?: number;
    transparent?: boolean;
    sx?: SxProps;
}

export default function WeatherStatsCardSkeleton(props: WeatherStatsCardSkeletonProps) {
    const { statsCount = 8 } = props;
    const component = props.transparent ? Box : Card;
    return (
        <CardContainer
            component={component}
            aria-live="polite"
            sx={props.sx}
            data-testid="weather-stats-skeleton"
        >
            {
                Array(statsCount).fill(0).map((_, idx) => (
                    <Stack
                        direction="row"
                        key={idx}
                        sx={{
                            width: "150px",
                            margin: "10px",
                        }}
                    >
                        <Box width="40px" height="40px">
                            <Skeleton variant="rectangular" width={40} height={40} />
                        </Box>
                        <Box ml="10px">
                            <Skeleton variant="text" width="90px" sx={{ lineHeight: 1.25 }} />
                            <Skeleton variant="text" width="60px" sx={{ lineHeight: 1.25 }} />
                        </Box>
                    </Stack>
                ))
            }
        </CardContainer>
    );
}
