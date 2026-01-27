import { Widget } from "@components/containers/widget/widget";
import { Card, CardActionArea, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { NearbyLocation } from "@src/apis/weaget/nearby-location/nearby-location.types";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { useRouter } from "next/navigation";

// List of Weather Card
export interface LocationGridWidgetProps {
    locationData?: Array<NearbyLocation>
    subtitle?: string
    sx?: SxProps
    title?: string
}

/*
    Provides a grid-like list of the nearest suburbs/cities.
*/
interface EntryProps {
    country: string
    name: string
    state: string
};

export default function LocationGridWidget(props: LocationGridWidgetProps) {
    const { t } = useSystemTranslation();
    if (!props.locationData) return null;
    const locations = props.locationData.map(loc => (
        <Entry key={loc.name + loc.state + loc.country} {...loc} />
    ));
    return (
        <Widget
            disableChildrenPadding
            subtitle={props.subtitle ?? t("component.widget.locationGrid.description")}
            sx={props.sx}
            title={props.title ?? t("component.widget.locationGrid.title")}
            variant="transparent"
        >
            <Grid component="ul" container spacing={0.5}>
                {locations}
            </Grid>
        </Widget>
    );
}

function Entry(props: EntryProps) {
    const router = useRouter();

    function redirect(location: EntryProps) {
        router.push(`/weather/${location.name} ${location.state}, ${location.country}`);
    }

    return (
        <Grid component="li" size={{ md: 6, sm: 4, xs: 12 }}>
            <Card>
                <CardActionArea
                    onClick={() => redirect(props)}
                    sx={{
                        color: "text.primary",
                        display: "grid",
                        fontSize: "1em",
                        height: "60px",
                        placeItems: "center",
                        textAlign: "center"
                    }}
                >
                    <Box component="span">{props.name}</Box>
                </CardActionArea>
            </Card>
        </Grid>
    );
}
