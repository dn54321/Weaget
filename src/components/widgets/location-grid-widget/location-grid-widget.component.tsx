import { Card, CardActionArea, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { Widget } from "@components/containers/widget/widget";
import { NearbyLocation } from "@features/weaget/nearby-location/nearby-location.types";
import Grid from "@mui/material/Grid2";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

/*
    Provides a grid-like list of the nearest suburbs/cities.
*/
interface EntryProps {
    name: string;
    state: string;
    country: string;
}

function Entry(props: EntryProps) {
    const router = useRouter();

    function redirect(location: EntryProps) {
        router.push(`/weather/${location.name} ${location.state}, ${location.country}`);
    }

    return (
        <Grid component="li" size={{ xs: 12, sm: 4, md: 6 }}>
            <Card>
                <CardActionArea
                    sx={{
                        color: "text.primary",
                        display: "grid",
                        placeItems: "center",
                        height: "60px",
                        fontSize: "1em",
                        textAlign: "center",
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
export interface LocationGridWidgetProps {
    title?: string;
    subtitle?: string;
    locationData?: Array<NearbyLocation>;
    sx?: SxProps;
}

export default function LocationGridWidget(props: LocationGridWidgetProps) {
    const { t } = useSystemTranslation();
    if (!props.locationData) return null;
    const locations = props.locationData.map(loc => (
        <Entry key={loc.name + loc.state + loc.country} {...loc} />
    ));
    return (
        <Widget
            title={props.title ?? t("component.widget.locationGrid.title")}
            subtitle={props.subtitle ?? t("component.widget.locationGrid.description")}
            variant="transparent"
            disableChildrenPadding
            sx={props.sx}
        >
            <Grid container spacing={0.5} component="ul">
                {locations}
            </Grid>
        </Widget>
    );
}
