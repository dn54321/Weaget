import { Skeleton } from "@mui/material";
import { CardContainer } from "./weather-card.styles";

export default function WeatherCardSkeleton() {
    return (
        <CardContainer data-testid="weather-card-skeleton">
            <Skeleton 
                variant="rectangular"  
                sx={{
                    width: "100%",
                    minWidth: "120px",
                    height: "173px",
                    opacity: "20%",
                    borderRadius: "10px"
                }}
            />
        </CardContainer>
    )
}