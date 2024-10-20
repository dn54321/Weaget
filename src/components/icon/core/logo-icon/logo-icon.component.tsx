import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { BoxProps } from "@mui/system";
import { Quicksand } from "next/font/google";
import { LogoIconStyle, Text } from "./logo-icon.styles";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
/*
    Official Logo of the Weaget Website
*/

const quickSandFont = Quicksand({
    subsets: ["latin"],
    weight: "600",
    display: "swap",
});

export interface LogoProps {
    hideShadow?: boolean;
}

export default function Logo(props: BoxProps & LogoProps) {
    const { hideShadow, ...rest } = props;
    const { t } = useSystemTranslation();
    return (
        <Box {...rest} role="img" aria-label="Weaget logo">
            <Stack direction="row" alignItems="center">
                <LogoIconStyle sx={{
                    ...(hideShadow && {
                        "&:before": { filter: "none" },
                        "&:after": { filter: "none" },
                    }),
                }}
                />
                <Text className={quickSandFont.className}>
                    <Box component="span" color="lightblue">{t("webapp.logoFirst")}</Box>
                    <Box component="span" color="lightpink">{t("webapp.logoSecond")}</Box>
                </Text>
            </Stack>
        </Box>
    );
}
