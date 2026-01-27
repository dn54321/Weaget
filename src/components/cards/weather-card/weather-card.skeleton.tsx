import { Skeleton } from "@mui/material";

import { CardContainer } from "./weather-card.styles";

export default function WeatherCardSkeleton() {
    return (
        <CardContainer data-testid="weather-card-skeleton">
            <Skeleton
                sx={{
                    borderRadius: "10px",
                    height: "173px",
                    minWidth: "120px",
                    opacity: "20%",
                    width: "100%"
                }}
                variant="rectangular"
            />
        </CardContainer>
    );
}
