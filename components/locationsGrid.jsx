import styled from '@mui/system/styled';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {Divider, Card, Button, CardActionArea} from  '@mui/material';
import Link from '@components/link'
import Skeleton from '@mui/material/Skeleton';
import {useRouter} from 'next/router';

/*
    Provides a grid-like list of the nearest suburbs/cities.
*/
const Container = styled(Box)(({ theme }) => ({
    width: "100%",
    color: "black"
}));

const Grid = styled('ul')(({ theme }) => ({
    display: "grid",
    justifyContent: "flex-start",
    gridTemplateColumns: "repeat(auto-fill, 200px)",
    width: "100%",
    gap: 3
}));

const Description = styled(Box)(({ theme }) => ({
    fontSize:"0.8em",
    marginBottom:"20px"
}))

const Entry = (props) => {
    const router = useRouter();
    function redirect(props) {
        router.push(`/weather/${props.name} ${props.state}, ${props.country}`)
    }
    return (
        <Card component="li">
            <CardActionArea sx={{
                color: "black",
                display: "grid",
                placeItems: "center",
                padding: "20px",
                fontSize: "1em"
            }} onClick={() => redirect(props)}>
            <Box component="span">{props.name}</Box>
            </CardActionArea>
        </Card>
    )
}

export default function LocationsGrid(props) {
    if (!props.locations) return null;
    const locations = props.locations.map(loc => (              
        <Entry key={loc.name+loc.state+loc.country} {...loc}/>
    ));
    return (
        <Container component="section">
            <h1>Suggested Locations</h1>
            <Description>Click on any card for more weather details!</Description>
            <Grid>
                {locations}
            </Grid>
        </Container>
    )
}