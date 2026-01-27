import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { BoxProps } from "@mui/system";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { Quicksand } from "next/font/google";

import { LogoIconStyle, Text } from "./logo-icon.styles";
/*
    Official Logo of the Weaget Website
*/

const quickSandFont = Quicksand({
    display: "swap",
    subsets: ["latin"],
    weight: "600"
});

export interface LogoProps {
    hideShadow?: boolean
}

export default function Logo(props: BoxProps & LogoProps) {
    const { hideShadow, ...rest } = props;
    const { t } = useSystemTranslation();
    return (
        <Box
            {...rest}
            aria-label={`${t("webapp.name")} ${t("general.logo")}`}
            role="img"
            title={`${t("webapp.name")} ${t("general.logo")}`}
        >
            <Stack alignItems="center" direction="row">
                <LogoIconStyle sx={{
                    ...(hideShadow && {
                        "&:after": { filter: "none" },
                        "&:before": { filter: "none" }
                    })
                }}
                />
                <Text className={quickSandFont.className}>
                    <Box color="lightblue" component="span">{t("webapp.logoFirst")}</Box>
                    <Box color="lightpink" component="span">{t("webapp.logoSecond")}</Box>
                </Text>
            </Stack>
        </Box>
    );
}
