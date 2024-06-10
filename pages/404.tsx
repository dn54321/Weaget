import { Button, Stack, Box, Grid, Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CloudIcon from '@mui/icons-material/Cloud';
import styled from '@mui/system/styled';

const errString = (loc: string) => <Box>Ah! We couldn&apos;t retrieve weather details at <u>{loc}</u>. :/</Box>

function IconBox(props) {
    return (
        <Box sx={{display: "grid", placeItems: "center",
        fontSize: {
            lg: "562px",
            md: "40vw",
            sm: "400px",
            xs: "300px"
        }}} 
        height="100%">
            <Box sx={{
                position: "relative",
                width: "1em",
                height: "1em",
                "& svg": {
                    color: "gray",
                    position: "absolute",
                    transform: "translate(-50%,-50%)"
                },
                "& svg:nth-child(1)": {
                    top: "45%",
                    left: "50%",
                    fontSize: "1em",
                    filter: "brightness(80%) drop-shadow(0px 0px 2em #eee)"
                },
                "& svg:nth-child(2)": {
                    top: "60%",
                    left: "60%",
                    fontSize: "0.8em",
                    filter: "drop-shadow(0px 0px 2em #eee)"
                } 
            }}>
                {props.children}
            </Box>
        </Box>
    )
}

const Page = styled(Box) (({theme}) => ({
    height: "100%",
}));

export default function Home() {
    const router = useRouter();
    const err = router.query.err as string;
    const loc = router.query.loc as string;
    const desc = loc ? errString(loc) : false;
    const description = {
        "404": "The page you have been looking for could not be found.",
        "500": "Something went wrong with the server :/ Please try again later."
    }
    
    const errorMessage = (err in description) ? description[err] : false;
    return (
        <Page>
            <Head>
                <title>Weaget - {err ?? 404} </title>
            </Head>
            <Container maxWidth="lg" sx={{height:"100%"}} disableGutters>
            <Grid container gap={0} sx={{
                height:"100%",
                width:"100%"
            }}>
                <Grid item xs={12} md={6}>  
                <IconBox>
                    <CloudIcon/>
                    <CloudIcon/>   
                </IconBox> 
                </Grid>
                <Grid item xs={12} md={6}>  
                <Stack alignItems="center" justifyContent="center" height="100%"
                sx={{color:"black", px:"10px"}}>
                    <Box fontSize="min(200px, 30vw)" component="h1" sx={{lineHeight: 1}}>404</Box>
                    <Box fontSize="16px" sx={{textAlign: "center"}}>{errorMessage || desc}</Box>
                    <Button href="/" variant="outlined" sx={{mt:"40px"}}>Go back to home.</Button>
                </Stack>
                </Grid>
            </Grid>
            </Container>
        </Page>
    )   
}