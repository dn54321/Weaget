import { Box } from "@mui/system";
import { WeatherParticleProps } from "./weather-icon.types";
import { styled } from "@mui/material";

export const WeatherIconContainer = styled(Box) ({
    height: "1em",
    position: "relative",
    userSelect: "none",
    width: "1em",
});

export const Sun = styled(Box)<WeatherParticleProps>(props => ({
    backgroundColor: "#fada5e",
    borderRadius: "0.5em",
    boxShadow: props.theme.shadows?.[1],
    filter: "drop-shadow(0px 0px 2px #F8CF2D)",
    height: "1em",
    left: props.left ? props.left : "50%",
    position: "absolute",
    top: props.top ? props.top : "50%",
    transform: "translate(-50%, -50%)",
    width: "1em",
}));

export const Moon = styled(Box)<WeatherParticleProps>(props => ({
    backgroundColor: "#c7cbd0",
    borderRadius: "0.5em",
    boxShadow: props.theme.shadows?.[1],
    filter: "drop-shadow(0px 0px 2px #c7cbd0)",
    height: "1em",
    left: props.left ?? "50%",
    position: "absolute",
    top: props.top ?? "50%",
    transform: "translate(-50%, -50%)",
    width: "1em",
}));

export const Bolt = styled(Box)<WeatherParticleProps>(props => ({
    "&:after": {
        borderBottom: "0.2em solid transparent",
        borderLeft: "0.2em solid transparent",
        borderRight: "0.2em solid transparent",
        borderTop: "0.7em solid #fada5e",
        left: `calc(${props.left ?? "50%"} - 0.2em)`,
        top: `calc(${props.top ?? "50%"} + 0.4em)`,
        transform: "translate(-50%, -50%) rotate(40deg)",
        transformOrigin: "center",
    },
    "&:before": {
        borderBottom: "0.7em solid #fada5e",
        borderLeft: "0.2em solid transparent",
        borderRight: "0.2em solid transparent",
        borderTop: "0.2em solid transparent",
        left: `calc(${props.left ?? "50%"} + 0.2em)`,
        top: `calc(${props.top ?? "50%"} - 0.4em)`,
        transform: "translate(-50%, -50%) rotate(40deg)",
        transformOrigin: "center",
    },
    "&:before,&:after": {
        boxSizing: "border-box",
        content: "''",
        display: "block",
        filter: "drop-shadow(0px 0px 2px #eee)",
        height: "0px",
        position: "absolute",
        width: "0px",
    },
}));

export const Cloud = styled(Box)<WeatherParticleProps>(props => ({
    backgroundColor: "#eee",
    borderRadius: `calc(${props.height ? props.height : "0.2em"} * 0.5)`,
    boxShadow: props.theme.shadows?.[1],
    filter: "drop-shadow(0px 0px 2em #eee)",
    height: props.height ? props.height : "0.2em",
    position: "absolute",
    transform: "translate(-50%, -50%)",
}));

/* Currently Not Used */
// export const PuffCloud = styled(Cloud) ((props) => ({
//     filter: "drop-shadow(0px 2px 1px rgba(0,0,0,0.2))  drop-shadow(0px -1px 1px rgba(0,0,0,0.15))",
//     "&:before,&:after": {
//         position: "absolute",
//         transform: "translate(-50%, -50%)",
//         backgroundColor: "#eee",
//         content: '\"\"'
//     },
//     "&:before": {
//         width:"0.3em",
//         height:"0.3em",
//         borderRadius: "0.15em",
//         top:"70%",
//         left:"100%"
//     },
//     "&:after": {
//         width:"0.9em",
//         top:"90%",
//         left:"70%",
//         height:"0.2em",
//         borderRadius:"0.1em",
//     }
// }));

export const GreyCloud = styled(Cloud) (() => ({
    backgroundColor: "#c9c9c9",
}));

export const Rain = styled(Box)<WeatherParticleProps>(props => ({
    backgroundColor: "#9595e5",
    borderRadius: `calc(${props.height ?? "0.08em"} * 0.5)`,
    boxShadow: props.theme.shadows?.[1],
    filter: "drop-shadow(0px 0px 2em #eee)",
    height: "0.08em",
    position: "absolute",
    transform: "translate(-50%, -50%) rotate(50deg)",
}));

export const Snow1 = styled(Box)<WeatherParticleProps>(props => ({
    "&:after": {
        transform: "translate(-50%, -50%) rotate(calc(var(--angle) + 90deg))",
        transformOrigin: "center",
    },
    "&:before": {
        transform: "translate(-50%, -50%) rotate(var(--angle))",
        transformOrigin: "center",
    },
    "&:before,&:after": {
        backgroundColor: "var(--snowColor)",
        borderRadius: `calc(${props.height ?? "0.08em"} * 0.5)`,
        boxShadow: props.theme.shadows?.[1],
        content: "''",
        display: "block",
        filter: `drop-shadow(0px 0px 2em #eee) ${props.filter}`,
        height: "var(--snowHeight)",
        left: `calc(${props.left ?? "50%"})`,
        position: "absolute",
        top: `calc(${props.top ?? "50%"})`,
        width: props.width ?? "var(--snowWidth)",
    },
    "--angle": (props.angle ?? 0) + "deg",
    "--snowColor": "#2caab6",
    "--snowHeight": "0.05em",
    "--snowWidth": "0.3em",
}));

export const Snow2 = (props: WeatherParticleProps) => {
    return (
        <>
            <Snow1 top={props.top} left={props.left} height={props.height} />
            <Snow1 angle="45" top={props.top} left={props.left} height={props.height} filter="brightness(130%)" />
        </>
    );
};
