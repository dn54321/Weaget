import { Link, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { NearbyLocation } from '../../types/geolocation.types';
import { Widget } from '../Containers/Widget';

/*
    Provides a list of the nearest suburbs/cities.
*/


interface LocationListWidgetProps {
    locations?: Array<NearbyLocation>
}

export default function LocationListWidget(props: LocationListWidgetProps) {

    const locations = props.locations ? props.locations.map(location => {
        const locationLink = encodeURI(`/weather/${location.name} ${location.state}, ${location.country}`)
        const locationString = [location.name, location.state]
            .filter(location => Boolean(location))
            .join(', ');
        return (   
            <ListItem
                key={locationLink}
                component="li" 
                disablePadding 
            >
                <ListItemButton href={locationLink} sx={{
                    "&:hover span": {
                        textDecoration: 'underline',
                    }
                }}>
                    <ListItemText primary={locationString} sx={{
                        color: 'text.color', 
                    }} />
                </ListItemButton>
            </ListItem>           
    )   }) : 
        [...Array(8)].map((x,i) => 
            <Skeleton variant="text" width="100%" key={i} height="40px"/>
        )
    return (
        <Widget title="Suggested Locations">
            <Box sx={{mt:"10px"}} />
            <List dense component="ul">
                {locations}
                {props.locations && !locations.length ? 
                <Box pt="5px" mx="5px">No nearby places found...</Box> :
                null}
            </List>
        </Widget>
    )
}