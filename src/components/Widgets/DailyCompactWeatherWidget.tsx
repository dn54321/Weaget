import { Box, Button, styled } from '@mui/material';
import CompactWeatherCard, { CompactWeatherCardProps } from '../Cards/CompactWeatherCard';
import { OneCallWeatherDetails } from '../../types/models/openWeather/oneCall.model';

/*
    Compact weather card list is a grid containing simplified weather cards.
    Each weather card is a square box that contains:
        Name
        Icon
        Rain Information (If Applicable)
        Temp High, Temp Low
    
    This component is to provide basic weather information and a button that
    leads to more weather details on the user's request.
*/

// Styles 
const Container = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    width: "100%"
}));

const Header = styled(Box)(() => ({
    color: "black",
    display: "flex",
    flexDirection:"column",
    marginBottom: "20px"               
}));

const Footer = styled(Box)(() => ({  
    marginTop: "20px"             
}));

const CardContainer = styled('ol')(() => ({
    display: "grid",
    justifyContent: "flex-start",
    gridTemplateColumns: "repeat(auto-fill, minmax(97px, 1fr))",
    width: "100%",
    gap: 3,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    "&:hover": {
        backgroundColor: theme.palette.primary.main
    }
}));

// List of Weather Card
export interface WeeklyCompactWeatherWidgetProps {
    title: string
    description: string,
    weatherData?: OneCallWeatherDetails,
    location: string
}

export default function DailyCompactWeatherWidget(props: WeeklyCompactWeatherWidgetProps) {
    if (!props.weatherData) return null;

    const weatherDetails = props.weatherData?.daily?.map(dailyWeather => ({
        date: dailyWeather.dt,
        timezone: `${props.weatherData?.timezone}`,
        weatherCode: dailyWeather.weather[0].id,
        weatherDescription: dailyWeather.weather[0].description,
        rainfallPercentage: dailyWeather.pop,
        maxTemperature: dailyWeather.temp.max,
        minTemperature: dailyWeather.temp.min,
    }));

    const cards = weatherDetails?.map((dailyWeather) => (
        <Box component="li" key={dailyWeather.date.getTime()} >
            <CompactWeatherCard {...dailyWeather} />
        </Box>
    ));

    return (
        <Container component="section">
            <Header>
                <h1>{props.title}</h1>
                <Box fontSize="0.8em">
                    {props.description}
                </Box>
            </Header>
            <CardContainer>
                {cards}
            </CardContainer>
            <Footer>
            <StyledButton href={`/weather/${props.location}`}>
                More Weather Details
            </StyledButton>
            </Footer>
        </Container>            
    )
}