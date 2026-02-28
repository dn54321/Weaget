import { Card, CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import type { NearbyLocation } from "@features/weaget/nearby-location/nearby-location.types";
import type { SxProps } from "@mui/material";
import { Widget } from "@components/containers/widget/widget";
import { useRouter } from "next/navigation";
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
        <Grid component="li" size={{ md: 6, sm: 4, xs: 12 }}>
            <Card>
                <CardActionArea
                    sx={{
                        color: "text.primary",
                        display: "grid",
                        fontSize: "1em",
                        placeItems: "center",
                        textAlign: "center",
                        height: "60px",
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
    const locations = props.locationData
        .map(loc => (<Entry key={loc.name + loc.state + loc.country} {...loc} />))
        .slice(0, 8);
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
