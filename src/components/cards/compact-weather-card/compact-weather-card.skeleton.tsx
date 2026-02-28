import { PaperContainer } from "./compact-weather-card.styles";
import { Skeleton } from "@mui/material";

/**
 * Compact weather card skeleton is a placeholder component that mimics the layout of
 * the actual compact weather card while the data is being loaded.
 * @returns
 */
export default function CompactWeatherCardSkeleton() {
    return (
        <PaperContainer>
            <Skeleton
                variant="rectangular"
                sx={{
                    height: "120px",
                    minWidth: "120px",
                    opacity: "20%",
                    width: "100%",
                }}
            />
        </PaperContainer>
    );
}
