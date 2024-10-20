import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";

import React from "react";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { useSystemSettings } from "@src/hooks/use-system-settings";
import { SystemLocale } from "@src/types/system.types";

export function LocalisationDropdownButton() {
    const { t } = useSystemTranslation();
    const { locale: systemLocale, setLocale: setSystemLocale } = useSystemSettings();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [tooltipOpen, setTooltipOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const languageNames = new Intl.DisplayNames(["en"], {
        type: "language",
    });
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setTooltipOpen(false);
    };

    return (
        <Tooltip
            title={t("component.localisationDropdownButton.chooseLanguage")}
            className="localisation-dropdown"
            open={!anchorEl && tooltipOpen}
            onClose={() => setTooltipOpen(false)}
            onOpen={() => setTooltipOpen(true)}
        >
            <Box>
                <IconButton
                    onClick={handleMenuOpen}
                    sx={{
                        color: "primary.contrastText",
                    }}
                >
                    <TranslateIcon />
                </IconButton>
                <Menu
                    className="translation-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    disableScrollLock={true}
                >
                    {
                        Object.values(SystemLocale).map(locale => (
                            <MenuItem
                                key={locale}
                                onClick={() => {
                                    setSystemLocale(locale);
                                    handleMenuClose();
                                }}
                                selected={locale === systemLocale}
                            >
                                { t(`language.${languageNames.of(locale)?.toLowerCase()}`) }
                            </MenuItem>
                        ))
                    }
                </Menu>
            </Box>
        </Tooltip>
    );
}
