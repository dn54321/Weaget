import { Box, Divider, Skeleton, Stack } from "@mui/material";

export function WeatherStripSkeleton() {
    return (
        <Box data-testid="weather-stat-skeleton">
            <Box alignItems="center" display="flex" height="66px" my="1px">
                <Box ml="20px" width="40px">
                    <Skeleton height={40} variant="circular" width={40} />
                </Box>
                <Box ml="10px">
                    <Skeleton sx={{ lineHeight: 1 }} variant="text" width="60px" />
                    <Skeleton sx={{ lineHeight: 1 }} variant="text" width="90px" />
                </Box>
                <Box height="100%" mx="30px" position="relative" width="100%">
                    <Stack
                        direction="row"
                        gap="20px"
                        sx={{
                            alignItems: "center",
                            bottom: "0px",
                            left: "0px",
                            position: "absolute",
                            right: "0px",
                            top: "0px"
                        }}
                    >
                        <Stack
                            direction="row"
                            sx={{
                                flexWrap: "wrap",
                                gap: "20px",
                                height: "40px",
                                overflow: "hidden",
                                width: "100%"
                            }}
                        >
                            {[...Array(7)].map((_, i) => (
                                <Box key={i}>
                                    <Skeleton height={40} variant="rectangular" width={40} />
                                </Box>
                            ))}
                        </Stack>
                    </Stack>
                </Box>
                <Stack alignItems="flex-end" ml="auto" mr="15px">
                    <Skeleton sx={{ lineHeight: 1 }} variant="text" width="80px" />
                    <Skeleton sx={{ lineHeight: 1 }} variant="text" width="90px" />
                </Stack>
            </Box>
            <Divider />
        </Box>
    );
}
