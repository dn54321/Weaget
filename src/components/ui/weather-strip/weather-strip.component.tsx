import WeatherStatsCard, { WeatherStats } from "@components/cards/weather-stats-card/weather-stats-card.component";
import { TempUnit } from "@components/ui/temperature-unit";
import WeatherIcon from "@components/ui/weather-icon/weather-icon.component";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider, styled, Typography } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { DateTime } from "luxon";

const Day = styled(Box)(() => ({
    fontSize: "0.5em",
    textTransform: "uppercase"
}));

const WeatherDescription = styled(Box) ({
    fontSize: "0.6em",
    textTransform: "capitalize",
    width: "100px"
});

export interface AccordionProps {
    children: JSX.Element | JSX.Element[]
    expanded?: boolean
    onChange?: () => void
}

const Accordion = (props: AccordionProps) => {
    return (
        <MuiAccordion
            data-testid="weather-strip"
            disableGutters
            elevation={0}
            expanded={props.expanded}
            onChange={props.onChange}
            slotProps={{ transition: { timeout: 0, unmountOnExit: true } }}
            sx={{ backgroundColor: "initial", color: "text.color" }}
        >
            {props.children}
        </MuiAccordion>
    );
};

export interface WeatherStripProps {
    date: Date
    expanded?: boolean
    rainPercentage: number
    setExpanded?: () => void
    stats: Array<WeatherStats>
    temperature: number
    timezone: string
    weatherCode: number
    weatherDescription: string
}

export default function WeatherStrip(props: WeatherStripProps) {
    const { locale, t } = useSystemTranslation();
    const date = DateTime
        .fromJSDate(props.date, { zone: props.timezone })
        .setLocale(locale);

    return (
        <Box>
            <Accordion
                {...(props.expanded !== undefined && { expanded: props.expanded })}
                {...(props.setExpanded && { onChange: () => props.setExpanded!() })}
            >
                <AccordionSummary
                    expandIcon={(
                        <Box title={props.expanded
                            ? t("component.weatherStrip.collapse")
                            : t("component.weatherStrip.expand")}
                        >
                            <ExpandMoreIcon />
                        </Box>
                    )}
                    sx={{
                        "& .MuiAccordionSummary-content": { margin: "0px" },
                        "& .MuiStack-root": { bgcolor: "initial !important" },
                        "boxShadow": "none",
                        "paddingLeft": "0px"
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            bgcolor: "#121212",
                            width: "100%"
                        }}
                    >
                        <Stack
                            alignItems="center"
                            fontSize="48px"
                            p="10px"
                            sx={{
                                div: {
                                    filter: "initial"
                                },
                                position: "relative"
                            }}
                        >
                            <WeatherIcon
                                decoration
                                id={props.weatherCode}
                                rainPercentage={props.rainPercentage}
                            />
                        </Stack>
                        <Box ml="15px">
                            <Box><b><TempUnit value={props.temperature} /></b></Box>
                            <WeatherDescription>{props.weatherDescription}</WeatherDescription>
                        </Box>
                        <Box height="100%" mr="30px" position="relative" width="100%">
                            <Stack
                                direction="row"
                                gap="20px"
                                sx={{
                                    alignItems: "center",
                                    bottom: "0px",
                                    left: "0px",
                                    position: "absolute",
                                    right: "0px",
                                    top: "0px"
                                }}
                            >
                                <Stack
                                    component="ul"
                                    direction="row"
                                    sx={{
                                        flexWrap: "wrap",
                                        height: "40.8px",
                                        overflow: "hidden",
                                        width: "100%"
                                    }}
                                >
                                    {props.stats
                                        .filter(stats => stats.compactValue || stats.value)
                                        .map(stat => (
                                            <Stack
                                                alignItems="center"
                                                component="li"
                                                key={stat.name}
                                                sx={{ display: { sm: "block", xs: "none" } }}
                                                title={stat.name}
                                                width="60px"
                                            >
                                                <Box sx={{ color: "primary.light" }}>{stat.statIcon}</Box>
                                                <Box fontSize="0.7em">
                                                    {stat.compactValue || stat.value}
                                                    {stat.unit}
                                                </Box>
                                            </Stack>
                                        ))}
                                </Stack>
                            </Stack>
                        </Box>
                        <Stack alignItems="flex-end" minWidth="70px" ml="auto" mr="5px">
                            <Box>{date.toLocaleString({ hour: "numeric", hour12: true }).toLowerCase()}</Box>
                            <Day>{date.toFormat("cccc")}</Day>
                        </Stack>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ color: "text.primary" }}>
                    <Typography mt="10px" variant="body2"><b>{t("component.weatherStrip.hourlyWeatherStats")}</b></Typography>
                    <WeatherStatsCard stats={props.stats} transparent />
                </AccordionDetails>
            </Accordion>
            <Divider />
        </Box>
    );
}
