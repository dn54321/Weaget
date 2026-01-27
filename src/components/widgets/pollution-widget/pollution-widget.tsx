import * as React from "react";
import type { Iaqi, Pollution } from "@features/apicn-pollution/pollution.types";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Widget } from "@components/containers/widget/widget";
import { circularProgressClasses } from "@mui/material/CircularProgress";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

/*
    Pollution Card determines the overall
    air quality in the searched weather location.
*/

interface CircularProgressWithLabelProps {
    value?: number;
    loaded: boolean;
}

interface PollutionRow {
    chemical: JSX.Element;
    amount: JSX.Element;
}

function CircularProgressWithLabel(props: CircularProgressWithLabelProps) {
    const width = "120px";
    const thickness = 5;
    const circularProgressValue = props.value ?? 0;
    const variant = props.loaded ? "determinate" : "indeterminate";
    return (
        <Box sx={{ position: "relative" }} width={width} height={width}>
            <svg width={width}>
                <defs>
                    <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(184, 74, 202, 1)" />
                        <stop offset="100%" stopColor="rgba(142, 66, 235, 1)" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress
                className="absolute-center"
                thickness={thickness}
                variant={variant}
                value={100}
                size={width}
                sx={{ color: "#eee" }}
                role="none"
                aria-valuenow={undefined}
            />
            <CircularProgress
                className="absolute-center"
                variant={variant}
                size={width}
                value={Math.min(circularProgressValue, 300) / 300 * 100}
                thickness={thickness}
                aria-busy={props.loaded}
                aria-valuenow={circularProgressValue}
                aria-valuemax={300}
                aria-valuemin={0}
                aria-label="Air Quality Index"
                sx={{
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: "round",
                    },
                    "svg circle": {
                        stroke: "url(#my_gradient)",
                    },
                }}
            />

            <Box fontSize="30px" className="absolute-center">
                {`${circularProgressValue}`}
            </Box>
        </Box>
    );
}

const DotLoader = () => {
    return (
        <Box
            className="dot-pulse"
            sx={{
                "&:before,&:after": {
                    height: "5px",
                    width: "5px",
                },
                "height": "5px",
                "left": "-9980px",
                "top": "5px",
                "width": "5px",
            }}
        />
    );
};

function createData(chemical: JSX.Element, amount: JSX.Element) {
    return { amount, chemical };
}

interface PollutionTableProps {
    rows: Array<PollutionRow>;
}

function PollutionTable(props: PollutionTableProps) {
    const { t } = useSystemTranslation();
    return (
        <TableContainer component={Box}>
            <Table
                sx={{
                    "*": {

                    },
                }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>{t("component.widget.pollution.particle")}</TableCell>
                        <TableCell>{t("component.widget.pollution.aqiLevel")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row, ind) => (
                        <TableRow
                            key={ind}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell>{row.chemical}</TableCell>
                            <TableCell>{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const pollutionLevelTranslationKey = [
    "component.widget.pollution.pollutionLevel.good",
    "component.widget.pollution.pollutionLevel.moderate",
    "component.widget.pollution.pollutionLevel.unhealthySensitive",
    "component.widget.pollution.pollutionLevel.unhealthy",
    "component.widget.pollution.pollutionLevel.veryUnhealthy",
    "component.widget.pollution.pollutionLevel.hazardous",
];
const pollutionWarningTranslationKey = [
    "component.widget.pollution.pollutionCaution.good",
    "component.widget.pollution.pollutionCaution.moderate",
    "component.widget.pollution.pollutionCaution.unhealthySensitive",
    "component.widget.pollution.pollutionCaution.unhealthy",
    "component.widget.pollution.pollutionCaution.veryUnhealthy",
    "component.widget.pollution.pollutionCaution.hazardous",
];

const stringToTag: Record<string, JSX.Element> = {
    co: <React.Fragment>CO</React.Fragment>,
    neph: <React.Fragment>NEPH</React.Fragment>,
    nh3: (
        <React.Fragment>
            NH
            <sub>3</sub>
        </React.Fragment>
    ),
    no2: (
        <React.Fragment>
            NO
            <sub>2</sub>
        </React.Fragment>
    ),
    o3: (
        <React.Fragment>
            O
            <sub>3</sub>
        </React.Fragment>
    ),
    pm10: (
        <React.Fragment>
            PM
            <sub>10</sub>
        </React.Fragment>
    ),
    pm25: (
        <React.Fragment>
            PM
            <sub>2.5</sub>
        </React.Fragment>
    ),
    so2: (
        <React.Fragment>
            SO
            <sub>2</sub>
        </React.Fragment>
    ),
};

// Not Used Yet..
// const units = {
//     "neph": <s>10<sup>-4</sup> m<sup>-1</sup></s>,
//     "pm25": <>µg/m<sup>3</sup></>,
//     "pm10": <>µg/m<sup>3</sup></>,
//     "o3": "pphm",
//     "no2": "pphm",
//     "so2": "pphm",
//     "nh3": "pphm",
//     "CO": "ppm"
// };

function aqiRating(aqi: number) {
    if (aqi <= 50) return 0;
    if (aqi <= 100) return 1;
    if (aqi <= 150) return 2;
    if (aqi <= 200) return 3;
    if (aqi <= 300) return 4;
    return 5;
}

const dataOrder: Array<keyof Iaqi> = ["neph", "pm25", "pm10", "o3", "no2", "so2", "co"];

export interface PollutionWidgetProps {
    pollutionData?: Pollution;
    sx?: SxProps;
}

export default function PollutionWidget(props: PollutionWidgetProps) {
    const { t } = useSystemTranslation();
    const [show, setShow] = React.useState(false);
    const loaded = props.pollutionData ? true : false;
    const aqi = props.pollutionData ? props.pollutionData.aqi : 0;
    const aqRating = aqiRating(aqi);

    const rows: Array<PollutionRow> = [];

    if (props.pollutionData) {
        const pollution = props.pollutionData;
        dataOrder.filter(key => key in pollution.iaqi).forEach((key) => {
            const iaqiData = pollution.iaqi[key]!;
            const rating = (
                <Box sx={{ float: "right" }}>
                    (
                    {t(pollutionLevelTranslationKey[aqiRating(iaqiData.v)])}
                    )
                </Box>
            );
            rows.push(createData(
                <abbr
                    title={t(`component.widget.pollution.pollutionParticleDescription.${key}`)}
                >
                    {stringToTag[key]}
                </abbr>,
                <>
                    {iaqiData.v}
                    {" "}
                    {rating}
                </>,
            ));
        });
    }

    return (
        <Widget title={t("component.widget.pollution.title")} sx={props.sx}>
            <Box p="20px" pb="10px">
                <Stack
                    direction={{ md: "column", sm: "row", xs: "column" }}
                    alignItems={{ md: "stretch", sm: "center", xs: "stretch" }}
                    gap={2}
                >
                    <Stack direction="row" alignItems="center">
                        <CircularProgressWithLabel value={props.pollutionData?.aqi} loaded={loaded} />
                        <Box ml="20px" width="max-content">
                            <Box fontSize="16px">{t("component.widget.pollution.airQualityIndex")}</Box>
                            <Box sx={{ color: "text.color" }}>
                                {props.pollutionData?.aqi
                                    ? t(pollutionLevelTranslationKey[aqRating])
                                    : <Box ml="20px"><DotLoader /></Box>}
                            </Box>
                        </Box>
                    </Stack>
                    {aqRating ? <Alert severity="warning">{t(pollutionWarningTranslationKey[aqRating])}</Alert> : ""}
                </Stack>
                { loaded
                    ? (
                            <>
                                <Box mt="20px" color="black">{show && <PollutionTable rows={rows} />}</Box>
                                <Link mt="10px" component="button" onClick={() => { setShow(!show); }} color="text.color">
                                    {
                                        show
                                            ? t("component.widget.pollution.hideAdvancedPollutionDetails")
                                            : t("component.widget.pollution.showAdvancedPollutionDetails")
                                    }
                                </Link>
                            </>
                        )
                    : <Box color="#4682B4" mt="20px">{t("component.widget.pollution.loading")}</Box>}
            </Box>
        </Widget>
    );
}
