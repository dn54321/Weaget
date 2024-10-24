import { List, ListItem, ListItemButton, ListItemText, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { NearbyLocation } from "@features/weaget/nearby-location/nearby-location.types";
import { Widget } from "@components/containers/widget/widget";
import { useRouter } from "next/navigation";

/*
    Provides a list of the nearest suburbs/cities.
*/

export interface LocationListWidgetProps {
    locationData?: Array<NearbyLocation>;
    sx?: SxProps;
}

export default function LocationListWidget(props: LocationListWidgetProps) {
    const router = useRouter();
    const locations = props.locationData
        ? props.locationData.map((location) => {
            const locationLink = encodeURI(`/weather/${location.name} ${location.state}, ${location.country}`);
            const locationString = [location.name, location.state]
                .filter(location => Boolean(location))
                .join(", ");
            return (
                <ListItem
                    key={locationLink}
                    component="li"
                    disablePadding
                >
                    <ListItemButton
                        onClick={() => router.push(locationLink)}
                        sx={{
                            "&:hover span": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        <ListItemText
                            primary={locationString}
                            sx={{
                                color: "text.color",
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            );
        })
        : [...Array(8)].map((x, i) => (
                <Box data-testid="location-card-skeleton" key={i}>
                    <Skeleton
                        variant="text"
                        width="100%"
                        height="40px"
                    />
                </Box>
            ),
            );
    return (
        <Widget title="Suggested Locations" sx={props.sx}>
            <Box sx={{ mt: "10px" }} />
            <List dense component="ul">
                {locations}
                {props.locationData && !locations.length
                    ? <Box pt="5px" mx="5px">No nearby places found...</Box>
                    : null}
            </List>
        </Widget>
    );
}
