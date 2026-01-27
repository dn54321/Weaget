import { Box, Card, Skeleton, Stack } from "@mui/material";
import { CardUnorderedList } from "./weather-stats-card.styles";
import type { SxProps } from "@mui/material";

export interface WeatherStatsCardSkeletonProps {
    statsCount?: number;
    transparent?: boolean;
    sx?: SxProps;
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
                            direction="row"
                            component="li"
                            key={idx}
                            sx={{
                                margin: "10px",
                                width: "150px",
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
            </CardUnorderedList>
        </Box>
    );
}
