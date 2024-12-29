import { Box, Divider, Skeleton, Stack } from "@mui/material";

export function WeatherStripSkeleton() {
    return (
        <Box data-testid="weather-stat-skeleton">
            <Box height="66px" my="1px" display="flex" alignItems="center">
                <Box width="40px" ml="20px">
                    <Skeleton variant="circular" width={40} height={40} />
                </Box>
                <Box ml="10px">
                    <Skeleton variant="text" width="60px" sx={{ lineHeight: 1 }} />
                    <Skeleton variant="text" width="90px" sx={{ lineHeight: 1 }} />
                </Box>
                <Box position="relative" width="100%" height="100%" mx="30px">
                    <Stack
                        direction="row"
                        gap="20px"
                        sx={{
                            alignItems: "center",
                            bottom: "0px",
                            left: "0px",
                            position: "absolute",
                            right: "0px",
                            top: "0px",
                        }}
                    >
                        <Stack
                            direction="row"
                            sx={{
                                flexWrap: "wrap",
                                gap: "20px",
                                height: "40px",
                                overflow: "hidden",
                                width: "100%",
                            }}
                        >
                            {[...Array(7)].map((_, i) => (
                                <Box key={i}>
                                    <Skeleton variant="rectangular" width={40} height={40} />
                                </Box>
                            ))}
                        </Stack>
                    </Stack>
                </Box>
                <Stack ml="auto" mr="15px" alignItems="flex-end">
                    <Skeleton variant="text" width="80px" sx={{ lineHeight: 1 }} />
                    <Skeleton variant="text" width="90px" sx={{ lineHeight: 1 }} />
                </Stack>
            </Box>
            <Divider />
        </Box>
    );
}
