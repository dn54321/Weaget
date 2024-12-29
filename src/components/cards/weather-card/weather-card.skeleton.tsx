import { CardContainer } from "./weather-card.styles";
import { Skeleton } from "@mui/material";

export default function WeatherCardSkeleton() {
    return (
        <CardContainer data-testid="weather-card-skeleton">
            <Skeleton
                variant="rectangular"
                sx={{
                    borderRadius: "10px",
                    height: "173px",
                    minWidth: "120px",
                    opacity: "20%",
                    width: "100%",
                }}
            />
        </CardContainer>
    );
}
