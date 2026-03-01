import { LogoIconStyle, Text } from "./logo-icon.styles";
import Box from "@mui/material/Box";
import type { BoxProps } from "@mui/system";
import Stack from "@mui/material/Stack";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

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
            <Stack
                direction="row"
                alignItems="center"
                sx={{
                    caretColor: "transparent",
                }}
            >
                <LogoIconStyle sx={{
                    ...(hideShadow && {
                        "&:after": { filter: "none" },
                        "&:before": { filter: "none" },
                    }),
                }}
                />
                <Text sx={{ fontFamily: "var(--font-quicksand)" }}>
                    <Box component="span" color="lightblue">{t("webapp.logoFirst")}</Box>
                    <Box component="span" color="lightpink">{t("webapp.logoSecond")}</Box>
                </Text>
            </Stack>
        </Box>
    );
}
