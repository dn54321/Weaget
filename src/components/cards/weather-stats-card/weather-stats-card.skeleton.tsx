import { Box, Card, Skeleton, Stack, SxProps } from "@mui/material";

import { CardUnorderedList } from "./weather-stats-card.styles";

export interface WeatherStatsCardSkeletonProps {
    statsCount?: number
    sx?: SxProps
    transparent?: boolean
}

export default function WeatherStatsCardSkeleton(props: WeatherStatsCardSkeletonProps) {
    const { statsCount = 8 } = props;
    const component = props.transparent ? Box : Card;
    return (
        <Box component={component}>
            <CardUnorderedList
                aria-live="polite"
                data-testid="weather-stats-skeleton"
                sx={props.sx}
            >
                {
                    Array(statsCount).fill(0).map((_, idx) => (
                        <Stack
                            component="li"
                            direction="row"
                            key={idx}
                            sx={{
                                margin: "10px",
                                width: "150px"
                            }}
                        >
                            <Box height="40px" width="40px">
                                <Skeleton height={40} variant="rectangular" width={40} />
                            </Box>
                            <Box ml="10px">
                                <Skeleton sx={{ lineHeight: 1.25 }} variant="text" width="90px" />
                                <Skeleton sx={{ lineHeight: 1.25 }} variant="text" width="60px" />
                            </Box>
                        </Stack>
                    ))
                }
            </CardUnorderedList>
        </Box>
    );
}
