import { Divider, Typography, styled } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import { DateTime } from "luxon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import React from "react";
import Stack from "@mui/material/Stack";
import { TempUnit } from "@components/ui/temperature-unit";
import WeatherIcon from "@components/ui/weather-icon/weather-icon.component";
import type { WeatherStats } from "@components/cards/weather-stats-card/weather-stats-card.component";
import WeatherStatsCard from "@components/cards/weather-stats-card/weather-stats-card.component";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

const Day = styled(Box)(() => ({
    fontSize: "0.5em",
    textTransform: "uppercase",
}));

const WeatherDescription = styled(Box) ({
    fontSize: "0.6em",
    textTransform: "capitalize",
    width: "100px",
});

export interface AccordionProps {
    expanded?: boolean;
    onChange?: () => void;
    children: JSX.Element | JSX.Element[];
}

const Accordion = (props: AccordionProps) => {
    return (
        <MuiAccordion
            data-testid="weather-strip"
            disableGutters
            elevation={0}
            slotProps={{ transition: { timeout: 0, unmountOnExit: true } }}
            expanded={props.expanded}
            onChange={props.onChange}
            sx={{ backgroundColor: "initial", color: "text.color" }}
        >
            {props.children}
        </MuiAccordion>
    );
};

export interface WeatherStripProps {
    date: Date;
    timezone: string;
    weatherCode: number;
    weatherDescription: string;
    temperature: number;
    rainPercentage: number;
    stats: Array<WeatherStats>;
    expanded?: boolean;
    setExpanded?: () => void;
}

export default function WeatherStrip(props: WeatherStripProps) {
    const { t, locale } = useSystemTranslation();
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
                        "paddingLeft": "0px",
                    }}
                >
                    <Stack
                        sx={{
                            alignItems: "center",
                            bgcolor: "#121212",
                            width: "100%",
                        }}
                        direction="row"
                    >
                        <Stack
                            alignItems="center"
                            p="10px"
                            fontSize="48px"
                            sx={{
                                div: {
                                    filter: "initial",
                                },
                                position: "relative",
                            }}
                        >
                            <WeatherIcon
                                id={props.weatherCode}
                                rainPercentage={props.rainPercentage}
                                decoration
                            />
                        </Stack>
                        <Box ml="15px">
                            <Box><b><TempUnit value={props.temperature} /></b></Box>
                            <WeatherDescription>{props.weatherDescription}</WeatherDescription>
                        </Box>
                        <Box position="relative" width="100%" height="100%" mr="30px">
                            <Stack
                                direction="row"
                                gap="20px"
                                sx={{
                                    alignItems: "center",
                                    bottom: "0px",
                                    left: "0px",
                                    position: "absolute",
                                    right: "0px",
                                    top: "0px",
                                }}
                            >
                                <Stack
                                    component="ul"
                                    direction="row"
                                    sx={{
                                        flexWrap: "wrap",
                                        height: "40.8px",
                                        overflow: "hidden",
                                        width: "100%",
                                    }}
                                >
                                    {props.stats
                                        .filter(stats => stats.compactValue || stats.value)
                                        .map(stat => (
                                            <Stack
                                                key={stat.name}
                                                component="li"
                                                title={stat.name}
                                                alignItems="center"
                                                width="60px"
                                                sx={{ display: { sm: "block", xs: "none" } }}
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
                        <Stack ml="auto" alignItems="flex-end" mr="5px" minWidth="70px">
                            <Box>{date.toLocaleString({ hour: "numeric", hour12: true }).toLowerCase()}</Box>
                            <Day>{date.toFormat("cccc")}</Day>
                        </Stack>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ color: "text.primary" }}>
                    <Typography variant="body2" mt="10px"><b>{t("component.weatherStrip.hourlyWeatherStats")}</b></Typography>
                    <WeatherStatsCard stats={props.stats} transparent />
                </AccordionDetails>
            </Accordion>
            <Divider />
        </Box>
    );
}
