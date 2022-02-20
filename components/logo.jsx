import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';


/*
    Official Logo of the Weaget Website
*/


const Icon = styled(Box) (({ theme }) => ({
    // Sun Icon
    width: "2em",
    height: "2em",
    borderRadius:"1em",
    boxShadow: theme.shadows[1],
    backgroundColor: "#fada5e",
    position: "relative",

    // Clouds Icon
    "&:after, &:before": {
        position: 'absolute',
        display: 'inline-block',
        content: "''",
        backgroundColor: "white",
        filter: "drop-shadow(0px 0px 2em #eee)",
        height: "0.5em",
        boxShadow: theme.shadows[1],
    },
    "&::before": {
        "--width": "1.5em",
        width: "var(--width)",
        borderRadius: "calc(var(--width) * 0.5)",
        top: "0.7em",
        left: "1.3em"
    },
    "&::after": {
        "--width": "2.5em",
        width: "var(--width)",
        borderRadius: "calc(var(--width) * 0.5)",
        top: "1.3em"
    }
}));

const Text = styled(Box) (({ theme }) => ({
    fontFamily: "'Quicksand', sans-serif",
    fontSize: "1em",
    paddingLeft: "0.1em",
    transform: "translateY(-30%)",
    fontWeight: "600",
    zIndex: "1",
    textShadow: "-1px 1px 2px rgba(0,0,0,0.2)",
    whiteSpace: "nowrap",
    "&:after, &:before": {
        display: 'inline-block',
    },
    "&::before": {
        content: "'Wea'",
        color: "lightblue",
    },
    "&::after": {
        content: "'get'",
        color: "lightpink",
    }
}))

export default function Logo(props) {
    return (
        <Box {...props}>
        <Stack direction="row" alignItems="baseline">
            {!props.textOnly && <Icon/>}
            {!props.iconOnly && <Text/>}
        </Stack>
        </Box>
    );
}