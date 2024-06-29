import { Card, CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { Widget } from "@components/containers/widget/widget";
import { NearbyLocation } from "@features/weaget/nearby-location.types";
import Grid from "@mui/material/Unstable_Grid2";

/*
    Provides a grid-like list of the nearest suburbs/cities.
*/

const Entry = (props) => {
    const router = useRouter();
    function redirect(props) {
        router.push(`/weather/${props.name} ${props.state}, ${props.country}`);
    }
    return (
        <Grid component="li" xs={12} sm={4} md={6}>
            <Card>
                <CardActionArea
                    sx={{
                        color: "text.primary",
                        display: "grid",
                        placeItems: "center",
                        padding: "20px",
                        fontSize: "1em",
                    }}
                    onClick={() => redirect(props)}
                >
                    <Box component="span">{props.name}</Box>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

// List of Weather Card
export interface LocationGridProps {
    title?: string;
    subtitle?: string;
    locationData?: Array<NearbyLocation>;
}

export default function LocationGrid(props: LocationGridProps) {
    if (!props.locationData) return null;
    const locations = props.locationData.map(loc => (
        <Entry key={loc.name + loc.state + loc.country} {...loc} />
    ));
    return (
        <Widget
            title={props.title ?? "Suggested Locations"}
            subtitle={props.subtitle ?? "Click on any card for more weather details!"}
            variant="transparent"
            disableChildrenPadding
        >
            <Grid container spacing={0.5} component="ul">
                {locations}
            </Grid>
        </Widget>
    );
}
