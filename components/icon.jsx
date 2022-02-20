import { Box } from '@mui/material';
import styled from '@mui/system/styled';
import theme from '@src/theme';

/*
    Icons for weather codes in OpenWeatherAPI.
    Have a look at weather icons at /icons.

*/

const Container = styled(Box) ({
    width: "1em",
    height: "1em",
    position: "relative",
    userSelect: "none"

});

const Sun = styled(Box) ((props) => ({
    position: "absolute",
    left: props.left ? props.left : "50%",
    top:  props.top ? props.top : "50%",
    transform: "translate(-50%, -50%)",
    width: "1em",
    height: "1em",
    borderRadius: "0.5em",
    boxShadow: theme.shadows[1],
    backgroundColor: "#fada5e",
    position: "relative",
    filter: "drop-shadow(0px 0px 2px #F8CF2D)"
}));

const Moon = styled(Box) ((props) => ({
    position: "absolute",
    left: props.left ? props.left : "50%",
    top:  props.top ? props.top : "50%",
    transform: "translate(-50%, -50%)",
    width: "1em",
    height: "1em",
    borderRadius: "0.5em",
    boxShadow: theme.shadows[1],
    backgroundColor: "#c7cbd0",
    position: "relative",
    filter: "drop-shadow(0px 0px 2px #c7cbd0)"
}));

const Bolt = styled(Box) ((props) => ({
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

const Cloud = styled(Box) ((props) => ({
    position: "absolute",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#eee",
    height: props.height ? props.height : "0.2em",
    boxShadow: theme.shadows[1],
    filter: "drop-shadow(0px 0px 2em #eee)",
    borderRadius: `calc(${props.height ? props.height : "0.2em"} * 0.5)`,
}));

/* Currently Not Used */
const PuffCloud = styled(Cloud) ((props) => ({
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

const GreyCloud = styled(Cloud) ((props) => ({
    backgroundColor: "#c9c9c9"
}));

const Rain = styled(Box) ((props) => ({
    position: "absolute",
    transform: "translate(-50%, -50%) rotate(50deg)",
    backgroundColor: "#9595e5",
    filter: "drop-shadow(0px 0px 2em #eee)",
    boxShadow: theme.shadows[1],
    height: "0.08em",
    borderRadius: `calc(${props.height ? props.height : "0.08em"} * 0.5)`,
}))


const Snow1 = styled(Box) ((props) => ({
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

const Snow2 = (props) => {
    return (
        <>
            <Snow1 {...props}/>
            <Snow1 angle="45" {...props} filter="brightness(130%)" />
        </>
    )
}


function SunIcon(props) {
    return (
        <Container {...props}>
            <Sun fontSize="0.8em"/>
        </Container>
    )
}

function FewCloudIcon(props) {
    return (
        <Container {...props}>
            <Sun fontSize="0.7em" top="50%"/>
            <Cloud width="0.35em" top="70%" left="30%"/>
        </Container>
    )
}

function ScatteredCloud(props) {
    return (
        <Container {...props}>
            <Sun fontSize="0.7em" top="50%"/>
            <Cloud width="0.4em" top="80%" left="30%"/>
            <Cloud width="0.6em" top="55%" left="65%"/>
        </Container>
    )
}

function BrokenCloud(props) {
    return (
        <Container {...props}>
            <Sun fontSize="0.7em" top="50%" left="50%"/>
            <Cloud width="0.3em" top="35%" left="80%"/>
            <Cloud width="0.6em" top="60%" left="35%"/>
            <Cloud width="0.7em" top="70%" left="60%"/>
        </Container>
    )
}

function OvercastCloud(props) {
    return (
        <Container {...props}>
            <Sun fontSize="0.3em" top="40%" left="70%"/>
            <Cloud width="0.5em" height="0.5em" top="50%" left="40%"/>
            <Cloud width="0.3em" height="0.3em" top="60%" left="70%"/>
            <Cloud width="0.9em" top="70%" left="50%"/>
        </Container>
    )
}

function RainCloud(props) {
    return (
        <Container {...props}>
            <GreyCloud width="0.5em" height="0.5em" top="30%" left="40%"/>
            <GreyCloud width="0.3em" height="0.3em" top="40%" left="70%"/>
            <GreyCloud width="0.9em" top="50%" left="50%"/>
            <Rain width="0.3em"  top="75%" left="35%"/>
            <Rain width="0.3em"  top="75%" left="55%"/>
            <Rain width="0.3em"  top="75%" left="75%"/>
        </Container>
    )
}

function ShowerRain(props) {
    return (
        <Container {...props}>
            <Sun fontSize="0.3em" top="20%" left="70%"/>
            <GreyCloud width="0.5em" height="0.5em" top="30%" left="40%"/>
            <GreyCloud width="0.3em" height="0.3em" top="40%" left="70%"/>
            <GreyCloud width="0.9em" top="50%" left="50%"/>
            <Rain width="0.15em"  top="70%" left="25%"/>
            <Rain width="0.15em"  top="70%" left="45%"/>
            <Rain width="0.15em"  top="70%" left="65%"/>
            <Rain width="0.15em"  top="70%" left="85%"/>

            <Rain width="0.15em"  top="85%" left="15%"/>
            <Rain width="0.15em"  top="85%" left="35%"/>
            <Rain width="0.15em"  top="85%" left="55%"/>
            <Rain width="0.15em"  top="85%" left="75%"/>
        </Container>
    )
}

function ThunderStorm(props) {
    return (
        <Container {...props}>
            <Rain width="0.3em"  top="75%" left="35%"/>
            <Rain width="0.3em"  top="75%" left="55%"/>
            <Rain width="0.3em"  top="75%" left="75%"/>
            <Bolt fontSize="0.3em" top="70%"/>
            <GreyCloud width="0.5em" height="0.5em" top="30%" left="40%"/>
            <GreyCloud width="0.3em" height="0.3em" top="40%" left="70%"/>
            <GreyCloud width="0.9em" top="50%" left="50%"/>
        </Container>
    )
}

function SnowCloud(props) {
    return (
        <Container {...props}>
            <Snow1 top="70%" left="50%" fontSize="0.5em" angle="20"/>
            <Snow1 top="80%" left="75%" fontSize="0.7em" angle="40"/>
            <Snow1 top="85%" left="55%" fontSize="0.3em" angle="55"/>
            <Snow2 top="80%" left="25%" />
            <GreyCloud width="0.5em" height="0.5em" top="30%" left="40%"/>
            <GreyCloud width="0.3em" height="0.3em" top="40%" left="70%"/>
            <GreyCloud width="0.9em" top="50%" left="50%"/>
        </Container>
    )
}

function Mist(props) {
    return (
        <Container {...props}>
            <Sun fontSize="0.7em" top="50%"/>
            <GreyCloud width="0.8em" top="75%" left="50%" sx={{opacity:"0.8", backgroundColor:"#fff"}}/>
            <GreyCloud width="0.6em" top="50%" left="65%" sx={{opacity:"0.8", backgroundColor:"#fff"}}/>
            <GreyCloud width="0.6em" top="55%" left="35%" sx={{opacity:"0.8", backgroundColor:"#fff"}}/>
            <GreyCloud width="0.7em" top="65%" left="60%" sx={{opacity:"0.8", backgroundColor:"#fff"}}/>
        </Container>
    )
}

function Default(props) {
    return (
        <Container {...props}>
            <Moon fontSize="0.8em"/>
        </Container>
    )
}

export default function Icon(props) {
    switch (props.id) {
        case 200: return (<ThunderStorm {...props}/>)
        case 300: return (<ShowerRain {...props}/>)
        case 500: return (<RainCloud {...props}/>)
        case 600: return (<SnowCloud {...props}/>)
        case 700: return (<Mist {...props}/>)
        case 800: return (<SunIcon {...props}/>)
        case 801: return (<FewCloudIcon {...props}/>)
        case 802: return (<ScatteredCloud {...props}/>)
        case 803: return (<BrokenCloud {...props}/>)
        case 804: return (<OvercastCloud {...props}/>)
        default: 
            const mod = props.id % 100;
            if (mod) return (<Icon id={props.id-mod} />)
            return (<Default/>)
    }
}