import { Moon, WeatherIconContainer } from "./weather-icon.styles";

export function MoonIcon(props) {
    return (
        <WeatherIconContainer {...props} aria-label="Moon">
            <Moon fontSize="0.8em"/>
        </WeatherIconContainer>
    )
}