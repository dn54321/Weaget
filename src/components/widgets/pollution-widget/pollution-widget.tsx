import { Widget } from "@components/containers/widget/widget";
import { CircularProgress, SxProps } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { circularProgressClasses } from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Iaqi, Pollution } from "@src/apis/apicn/pollution/pollution.types";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import * as React from "react";

/*
    Pollution Card determines the overall
    air quality in the searched weather location.
*/

interface CircularProgressWithLabelProps {
    loaded: boolean
    value?: number
}

interface PollutionRow {
    amount: JSX.Element
    chemical: JSX.Element
}

function CircularProgressWithLabel(props: CircularProgressWithLabelProps) {
    const width = "120px";
    const thickness = 5;
    const circularProgressValue = props.value ?? 0;
    const variant = props.loaded ? "determinate" : "indeterminate";
    return (
        <Box height={width} sx={{ position: "relative" }} width={width}>
            <svg width={width}>
                <defs>
                    <linearGradient id="my_gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(184, 74, 202, 1)" />
                        <stop offset="100%" stopColor="rgba(142, 66, 235, 1)" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress
                aria-valuenow={undefined}
                className="absolute-center"
                role="none"
                size={width}
                sx={{ color: "#eee" }}
                thickness={thickness}
                value={100}
                variant={variant}
            />
            <CircularProgress
                aria-busy={props.loaded}
                aria-label="Air Quality Index"
                aria-valuemax={300}
                aria-valuemin={0}
                aria-valuenow={circularProgressValue}
                className="absolute-center"
                size={width}
                sx={{
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: "round"
                    },
                    "svg circle": {
                        stroke: "url(#my_gradient)"
                    }
                }}
                thickness={thickness}
                value={Math.min(circularProgressValue, 300) / 300 * 100}
                variant={variant}
            />

            <Box className="absolute-center" fontSize="30px">
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
                    width: "5px"
                },
                "height": "5px",
                "left": "-9980px",
                "top": "5px",
                "width": "5px"
            }}
        />
    );
};

interface PollutionTableProps {
    rows: Array<PollutionRow>
}

function createData(chemical: JSX.Element, amount: JSX.Element) {
    return { amount, chemical };
}

function PollutionTable(props: PollutionTableProps) {
    const { t } = useSystemTranslation();
    return (
        <TableContainer component={Box}>
            <Table
                aria-label="simple table"
                sx={{
                    "*": {

                    }
                }}
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
    "component.widget.pollution.pollutionLevel.hazardous"
];
const pollutionWarningTranslationKey = [
    "component.widget.pollution.pollutionCaution.good",
    "component.widget.pollution.pollutionCaution.moderate",
    "component.widget.pollution.pollutionCaution.unhealthySensitive",
    "component.widget.pollution.pollutionCaution.unhealthy",
    "component.widget.pollution.pollutionCaution.veryUnhealthy",
    "component.widget.pollution.pollutionCaution.hazardous"
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
    )
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
    pollutionData?: Pollution
    sx?: SxProps
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
                </>
            ));
        });
    }

    return (
        <Widget sx={props.sx} title={t("component.widget.pollution.title")}>
            <Box p="20px" pb="10px">
                <Stack
                    alignItems={{ md: "stretch", sm: "center", xs: "stretch" }}
                    direction={{ md: "column", sm: "row", xs: "column" }}
                    gap={2}
                >
                    <Stack alignItems="center" direction="row">
                        <CircularProgressWithLabel loaded={loaded} value={props.pollutionData?.aqi} />
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
                            <Box color="black" mt="20px">{show && <PollutionTable rows={rows} />}</Box>
                            <Link color="text.color" component="button" mt="10px" onClick={() => { setShow(!show); }}>
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
