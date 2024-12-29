import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React from "react";

import { SystemLocale } from "@src/types/system.types";
import TranslateIcon from "@mui/icons-material/Translate";
import { useSystemSettings } from "@src/hooks/use-system-settings";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export interface LocalisationOptionsProps {
    /** Filters the localisationDropdown button to only display selected elements */
    localesFilter?: Array<SystemLocale>;
}

export function LocalisationDropdownButton(props: LocalisationOptionsProps) {
    const { t } = useSystemTranslation();
    const { locale: systemLocale, setLocale: setSystemLocale } = useSystemSettings();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [tooltipOpen, setTooltipOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const localeList = props.localesFilter ?? Object.values(SystemLocale);
    const languageNames = new Intl.DisplayNames(["en"], {
        type: "language",
    });

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setTooltipOpen(false);
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Tooltip
                title={t("component.localisationDropdownButton.chooseLanguage")}
                className="localisation-dropdown"
                open={!anchorEl && tooltipOpen}
                onClose={() => setTooltipOpen(false)}
                onOpen={() => setTooltipOpen(true)}
            >
                <IconButton
                    onClick={handleMenuOpen}
                    sx={{
                        color: "primary.contrastText",
                    }}
                >
                    <TranslateIcon />
                </IconButton>
            </Tooltip>
            <Menu
                className="translation-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                disableScrollLock={true}
            >
                {
                    localeList.map(locale => (
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
        </React.Fragment>
    );
}
