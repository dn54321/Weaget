import { Button, Paper, Chip, Box } from '@mui/material';
import { Icon, Temp} from '@components/lib';
import styled from '@mui/system/styled';
import { DAYS } from '@src/constants';
import { round } from '@src/math';

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
const High = styled(Box)(({ theme }) => ({
    fontSize: "1em",
    display: "inline"
}));

const Low = styled(Box)(({ theme }) => ({
    fontSize: "0.8em",
    display: "inline",
    color: theme.palette.grey[500],
}));

const Container = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%"
}));

const Header = styled(Box)(({ theme }) => ({
    color: "black",
    display: "flex",
    flexDirection:"column",
    marginBottom: "20px"               
}));

const Footer = styled(Box)(({ theme }) => ({  
    marginTop: "20px"             
}));

const Main = styled('ol')(({ theme }) => ({
    display: "grid",
    justifyContent: "flex-start",
    gridTemplateColumns: "repeat(auto-fill, minmax(97px, 1fr))",
    width: "100%",
    gap: 3,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: "white",
    "&:hover": {
        backgroundColor: theme.palette.primary.main
    }
}));

const Rain = (props) => {
    if (!props.label) return null;
    return (
        <Box position="absolute" bottom="10%" right="15%"
             title="Chance of Rain">
            <Chip sx={{
                backgroundColor: "primary.main",
                fontSize: "0.25em",
                height: "auto",
                "& .MuiChip-label": {
                    py: "3px",
                    px: "4px"
                },
            }} 
            label={round(props.label*100,0)+"%"}/>
        </Box>
    )
}

// Compact weather card 

const CompactWeatherCard = (props) => {
    const date = new Date((props.weather.dt + props.offset)*1000);
    return (
        <Paper component="li"
                sx={{color: "grey.800", display: "flex", flexDirection: "column", 
                alignItems: "center", py: "4px", px: "9px", position: "relative",
                aspectRatio: "1", justifyContent:"center"}}>
            <Box>{DAYS[date.getUTCDay()].substring(0,3)}</Box>
            <Box fontSize="40px">
            <Icon id={props.weather.weather[0].id}/>
            <Rain label={props.weather.pop}/>
            </Box>
            <Box>
                <High><Temp label={props.weather.temp.max}/></High>
                <Low><Temp label={props.weather.temp.min}/></Low>
            </Box>
        </Paper>
    )
}

// List of Weather Card

export default function CompactCardList(props) {
    if (!props.weather) return null;
    const cards = props.weather.daily.map(x => 
        <CompactWeatherCard weather={x} key={x.dt}
        offset={props.weather.timezone_offset}/>
    )
    return (
        <Container component="section">
            <Header>
                <h1>Local Weather</h1>
                <Box fontSize="0.8em">
                    {`${props.place[0]}, ${props.place[1]} ${props.place[2]}`}
                </Box>
            </Header>
            <Main>
                {cards}
            </Main>
            <Footer>
            <StyledButton href={`/weather/${props.place[0]}`}>
                More Weather Details
            </StyledButton>
            </Footer>
        </Container>            
    )
}