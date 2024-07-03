import { Box, Skeleton, Stack, Divider } from "@mui/material";

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
                            position: "absolute",
                            left: "0px",
                            right: "0px",
                            top: "0px",
                            bottom: "0px",
                        }}
                    >
                        <Stack
                            direction="row"
                            sx={{
                                overflow: "hidden",
                                flexWrap: "wrap",
                                width: "100%",
                                height: "40px",
                                gap: "20px",
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
