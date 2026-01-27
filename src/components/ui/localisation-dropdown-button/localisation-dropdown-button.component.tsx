import TranslateIcon from "@mui/icons-material/Translate";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useSystemSettings } from "@src/hooks/use-system-settings";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { SystemLocale } from "@src/types/system.types";
import React from "react";

export interface LocalisationOptionsProps {
    /** Filters the localisationDropdown button to only display selected elements */
    localesFilter?: Array<SystemLocale>
}

export function LocalisationDropdownButton(props: LocalisationOptionsProps) {
    const { t } = useSystemTranslation();
    const { locale: systemLocale, setLocale: setSystemLocale } = useSystemSettings();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [tooltipOpen, setTooltipOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const localeList = props.localesFilter ?? Object.values(SystemLocale);
    const languageNames = new Intl.DisplayNames(["en"], {
        type: "language"
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
                className="localisation-dropdown"
                onClose={() => setTooltipOpen(false)}
                onOpen={() => setTooltipOpen(true)}
                open={!anchorEl && tooltipOpen}
                title={t("component.localisationDropdownButton.chooseLanguage")}
            >
                <IconButton
                    onClick={handleMenuOpen}
                    sx={{
                        color: "primary.contrastText"
                    }}
                >
                    <TranslateIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                className="translation-menu"
                disableScrollLock={true}
                onClose={handleMenuClose}
                open={open}
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
