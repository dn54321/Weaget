import { LogoIconStyle, Text } from "./logo-icon.styles";
import Box from "@mui/material/Box";
import type { BoxProps } from "@mui/system";
import { Quicksand } from "next/font/google";
import Stack from "@mui/material/Stack";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
const quickSandFont = Quicksand({
    display: "swap",
    subsets: ["latin"],
    weight: "600",
});

export interface LogoProps {
    hideShadow?: boolean;
}

export default function Logo(props: BoxProps & LogoProps) {
    const { hideShadow, ...rest } = props;
    const { t } = useSystemTranslation();
    return (
        <Box
            {...rest}
            role="img"
            title={`${t("webapp.name")} ${t("general.logo")}`}
            aria-label={`${t("webapp.name")} ${t("general.logo")}`}
        >
            <Stack direction="row" alignItems="center">
                <LogoIconStyle sx={{
                    ...(hideShadow && {
                        "&:after": { filter: "none" },
                        "&:before": { filter: "none" },
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
