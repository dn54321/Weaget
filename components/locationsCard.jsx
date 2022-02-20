import styled from '@mui/system/styled';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {Divider, Card, Button} from  '@mui/material';
import Link from '@components/link'
import Skeleton from '@mui/material/Skeleton';

/*
    Provides a list of the nearest suburbs/cities.
*/

const Container = styled(Card)(({ theme }) => ({
    width: "100%",
    color: "black",
    padding: "15px"
}));

// A List Element.
const Entry = (props) => {
    return (
        <Box component="li" {...props} sx={{
            color: theme => theme.palette.primary.main,
            padding: "5px",
            borderRadius: "5px",
            margin: "5px",
            width: "100%",
            bshadow: theme => theme.shadows[1],
            textDecoration: "none",
            backgroundColor: theme => theme.palette.grey.A100,
            "& div": {
                display: "inline",
                opacity: "0.6"
            },
            "&:hover": {
                textDecoration: "underline"
            }
        }}>
            <Link {...props}>
            {props.children}
            </Link>
        </Box>
    )
}

export default function LocationsCard(props) {
    const locations = props.locations ? props.locations.map(loc => {return (              
        <Entry href={`/weather/${loc.name} ${loc.state}, ${loc.country}`}
        key={loc.name+loc.state+loc.country}>
            <Box>{loc.name}</Box>
            <Box>{loc.state ? `, ${loc.state}` : ""}</Box>
        </Entry>
    )}) : 
        [...Array(8)].map((x,i) => 
            <Skeleton variant="text" width="100%" key={i} height="40px"/>
        )
    return (
        <Container component="section">
            <Box component="h1" p="5px">Suggested Locations</Box>
            <Divider />
            <Stack mt="5px" component="ul">
                {locations}
                {props.locations && !locations.length ? 
                <Box pt="5px" mx="5px">No nearby places found...</Box> :
                null}
            </Stack>
        </Container>
    )
}