import { Card, Divider, Link, LinkProps } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import styled from '@mui/system/styled';
import { NearbySearch } from '../../types/geolocation.types';
import { Widget } from '../Containers/Widget';

/*
    Provides a list of the nearest suburbs/cities.
*/
// A List Element.
const Entry = (props: LinkProps) => {
    return (
        <Box component="li" {...props} sx={{
            color: theme => theme.palette.primary.dark,
            padding: "5px",
            borderRadius: "5px",
            margin: "5px",
            bshadow: theme => theme.shadows[1],
            textDecoration: "none",
            backgroundColor: theme => theme.palette.grey[100],
            "& div": {
                display: "inline",

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

interface LocationListWidgetProps {
    locations?: Array<NearbySearch>
}

export default function LocationListWidget(props: LocationListWidgetProps) {
    const locations = props.locations ? props.locations.map(location => {return (              
        <Entry href={`/weather/${location.name} ${location.state}, ${location.country}`}
        key={location.name+location.state+location.country}>
            <Box>{location.name}</Box>
            <Box>{location.state ? `, ${location.state}` : ""}</Box>
        </Entry>
    )}) : 
        [...Array(8)].map((x,i) => 
            <Skeleton variant="text" width="100%" key={i} height="40px"/>
        )
    return (
        <Widget title="Suggested Locations">
            <Stack mt="5px" component="ul">
                {locations}
                {props.locations && !locations.length ? 
                <Box pt="5px" mx="5px">No nearby places found...</Box> :
                null}
            </Stack>
        </Widget>
    )
}