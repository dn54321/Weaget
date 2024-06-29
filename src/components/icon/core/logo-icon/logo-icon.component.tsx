import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { BoxProps } from '@mui/system';
import { Quicksand } from 'next/font/google';
import { LogoIconStyle, Text } from './logo-icon.styles';
/*
    Official Logo of the Weaget Website
*/


const quickSandFont = Quicksand({
    subsets: ['latin'],
    weight: '600',
    display: 'swap',
});
export default function Logo(props: BoxProps & {hideShadow?: boolean}) {
    const {hideShadow,...rest} = props;

    return (
        <Box {...rest} role="img" aria-label="Weaget logo">
            <Stack direction="row" alignItems="center" >
                <LogoIconStyle sx={{
                    ...(hideShadow && {
                        "&:before": {filter: "none"}, 
                        "&:after": {filter: "none"}
                    })
                }}/>
                <Text className={quickSandFont.className}/>
            </Stack>
        </Box>
    );
}