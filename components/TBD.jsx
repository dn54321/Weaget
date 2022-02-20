import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const TBD = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}))


export default function Logo(props) {
    return (
        <TBD>
            {props.children}
        </TBD>
    )
}