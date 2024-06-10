import { Moon, WeatherIconContainer } from "./WeatherIcon.styles";

export function MoonIcon(props) {
    return (
        <WeatherIconContainer {...props}>
            <Moon fontSize="0.8em"/>
        </WeatherIconContainer>
    )
}