import { Widget } from "@components/containers/widget/widget";
import { List, ListItem, ListItemButton, ListItemText, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { NearbyLocation } from "@src/apis/weaget/nearby-location/nearby-location.types";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { useRouter } from "next/navigation";

/*
    Provides a list of the nearest suburbs/cities.
*/

export interface LocationListWidgetProps {
    locationData?: Array<NearbyLocation>
    sx?: SxProps
}

export default function LocationListWidget(props: LocationListWidgetProps) {
    const router = useRouter();
    const { t } = useSystemTranslation();
    const locations = props.locationData
        ? props.locationData.map((location) => {
            const locationLink = encodeURI(`/weather/${location.name} ${location.state}, ${location.country}`);
            const locationString = [location.name, location.state]
                .filter(location => Boolean(location))
                .join(", ");
            return (
                <ListItem
                    component="li"
                    disablePadding
                    key={locationLink}
                >
                    <ListItemButton
                        onClick={() => router.push(locationLink)}
                        sx={{
                            "&:hover span": {
                                textDecoration: "underline"
                            }
                        }}
                    >
                        <ListItemText
                            primary={locationString}
                            sx={{
                                color: "text.color"
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            );
        })
        : [...Array(8)].map((x, i) => (
            <Box data-testid="location-card-skeleton" key={i}>
                <Skeleton
                    height="40px"
                    variant="text"
                    width="100%"
                />
            </Box>
        )
        );
    return (
        <Widget sx={props.sx} title={t("component.widget.locationList.title")}>
            <Box sx={{ mt: "10px" }} />
            <List component="ul" dense>
                {locations}
                {props.locationData && !locations.length
                    ? <Box mx="5px" pt="5px">{t("component.widget.locationList.noLocations")}</Box>
                    : null}
            </List>
        </Widget>
    );
}
