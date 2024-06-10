
import { Box, styled } from "@mui/system";
import theme from "../../../utils/theme";

export const WeatherIconContainer = styled(Box) ({
    width: "1em",
    height: "1em",
    position: "relative",
    userSelect: "none"

});

export const Sun = styled(Box)((props: any) => ({
    position: "absolute",
    left: props.left ? props.left : "50%",
    top:  props.top ? props.top : "50%",
    transform: "translate(-50%, -50%)",
    width: "1em",
    height: "1em",
    borderRadius: "0.5em",
    boxShadow: props.theme.shadows[1],
    backgroundColor: "#fada5e",
    filter: "drop-shadow(0px 0px 2px #F8CF2D)"
}));

export const Moon = styled(Box) ((props: any) => ({
    position: "absolute",
    left: props.left ? props.left : "50%",
    top:  props.top ? props.top : "50%",
    transform: "translate(-50%, -50%)",
    width: "1em",
    height: "1em",
    borderRadius: "0.5em",
    boxShadow: theme.shadows[1],
    backgroundColor: "#c7cbd0",
    filter: "drop-shadow(0px 0px 2px #c7cbd0)"
}));

export const Bolt = styled(Box) ((props) => ({
    "&:before,&:after": {
        content: "''",
        display: "block",
        boxSizing: "border-box",
        position: "absolute",
        width: "0px",
        height: "0px",
        filter: "drop-shadow(0px 0px 2px #eee)",
    },
    "&:before": {
        borderLeft: "0.2em solid transparent",
        borderRight: "0.2em solid transparent",
        borderTop: "0.2em solid transparent",
        borderBottom: "0.7em solid #fada5e",
        left: `calc(${props.left ? props.left : "50%"} + 0.2em)`,
        top:  `calc(${props.top ? props.top : "50%"} - 0.4em)`,
        transform: "translate(-50%, -50%) rotate(40deg)",
        transformOrigin: "center"
    },
    "&:after": {
        borderLeft: "0.2em solid transparent",
        borderRight: "0.2em solid transparent",
        borderBottom: "0.2em solid transparent",
        borderTop: "0.7em solid #fada5e",
        left: `calc(${props.left ? props.left : "50%"} - 0.2em)`,
        top:  `calc(${props.top ? props.top : "50%"} + 0.4em)`,
        transform: "translate(-50%, -50%) rotate(40deg)",
        transformOrigin: "center"
    },
}));

export const Cloud = styled(Box) ((props: any) => ({
    position: "absolute",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#eee",
    height: props.height ? props.height : "0.2em",
    boxShadow: theme.shadows[1],
    filter: "drop-shadow(0px 0px 2em #eee)",
    borderRadius: `calc(${props.height ? props.height : "0.2em"} * 0.5)`,
}));

/* Currently Not Used */
export const PuffCloud = styled(Cloud) ((props) => ({
    filter: "drop-shadow(0px 2px 1px rgba(0,0,0,0.2))  drop-shadow(0px -1px 1px rgba(0,0,0,0.15))",
    "&:before,&:after": {
        position: "absolute",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#eee",
        content: '\"\"'
    },
    "&:before": {
        width:"0.3em",
        height:"0.3em",
        borderRadius: "0.15em",
        top:"70%",
        left:"100%"
    },
    "&:after": {
        width:"0.9em",
        top:"90%",
        left:"70%",
        height:"0.2em",
        borderRadius:"0.1em",
    }

}));

export const GreyCloud = styled(Cloud) ((props) => ({
    backgroundColor: "#c9c9c9"
}));

export const Rain = styled(Box) ((props) => ({
    position: "absolute",
    transform: "translate(-50%, -50%) rotate(50deg)",
    backgroundColor: "#9595e5",
    filter: "drop-shadow(0px 0px 2em #eee)",
    boxShadow: theme.shadows[1],
    height: "0.08em",
    borderRadius: `calc(${props.height ? props.height : "0.08em"} * 0.5)`,
}))


export const Snow1 = styled(Box) ((props: {angle?: string, width?: string, height?: string, left?: string, top?: string, filter?: string}) => ({
    "--snowHeight": "0.05em",
    "--snowColor": "#2caab6",
    "--snowWidth": "0.3em",
    "--angle": (props.angle ? props.angle : 0) + "deg",
    "&:before,&:after": {
        content: "''",
        width: props.width ? props.width : "var(--snowWidth)",
        display: "block",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        backgroundColor: "var(--snowColor)",
        filter: `drop-shadow(0px 0px 2em #eee) ${props.filter}`,
        boxShadow: theme.shadows[1],
        height: "var(--snowHeight)",
        borderRadius: `calc(${props.height ? props.height : "0.08em"} * 0.5)`,
        left: `calc(${props.left ? props.left : "50%"})`,
        top:  `calc(${props.top ? props.top : "50%"})`,
    },
    "&:before": { 
        transform: "translate(-50%, -50%) rotate(var(--angle))",
        transformOrigin: "center"
    },
    "&:after": {
        transform: "translate(-50%, -50%) rotate(calc(var(--angle) + 90deg))",
        transformOrigin: "center"
    },
}));

export const Snow2 = (props) => {
    return (
        <>
            <Snow1 {...props}/>
            <Snow1 angle="45" {...props} filter="brightness(130%)" />
        </>
    )
}