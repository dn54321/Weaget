import { styled } from "@mui/material";
import WeatherCard from "@components/cards/weather-card/weather-card.component";

export const StyledWeatherCard = styled(WeatherCard)((props: {active: boolean}) => ({
    "& .MuiPaper-root:hover": {
        ...(props.active && {backgroundColor: "secondary.main"})
    },
    "& .MuiCardActionArea-root": {
        "&:hover": {
            boxShadow: 5,
            backdropFilter: "hue-rotate(10deg)",
            ...(props.active && {backgroundColor: "secondary.dark"})
        }
    }
}));