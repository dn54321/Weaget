"use client";

import MyLocationIcon from "@mui/icons-material/MyLocation";
import SearchIcon from "@mui/icons-material/Search";
import { Alert, CircularProgress, IconButton, List, Paper, Tooltip } from "@mui/material";
import Divider from "@mui/material/Divider";
import useAutocomplete from "@mui/material/useAutocomplete";
import { Box, BoxProps } from "@mui/system";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FetchError } from "@errors/fetch-error";
import { AutoCompleteSuggestions } from "@features/weaget/auto-complete/auto-complete.types";
import { useGetCurrentLocation } from "@src/hooks/use-get-current-location";
import { queryLocation } from "@src/hooks/use-get-location";
import { useGetLocationAutoComplete } from "@src/hooks/use-get-location-auto-complete";
import { FieldBox, FormContainer, MagnifyIconButtonContainer, SearchComponent, SearchField } from "./search-bar.styles";
import { debounceFunc, throttleFunc } from "./search-bar.utils";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export enum SearchErrorI18NKey {
    EMPTY = "",
    INVALID_LOCATION = "component.searchBar.error.invalidLocation",
    INTERNAL_SERVER_ERROR = "component.searchBar.error.internalServerErr",
    INVALID_CURRENT_LOCATION = "component.searchBar.error.invalidCurrentLocation",
}

// React Components
function Loader() {
    return (
        <Box px="8px" mx="12px" display="flex">
            <CircularProgress size={25} />
        </Box>
    );
};

function MagnifyIconButton() {
    const { t } = useSystemTranslation();

    return (
        <Tooltip title={t("component.searchBar.search")}>
            <MagnifyIconButtonContainer type="submit">
                <SearchIcon />
            </MagnifyIconButtonContainer>
        </Tooltip>
    );
};

function MyLocationButtonIcon(props: { setErrorMessage: (errMessage: SearchErrorI18NKey) => void }) {
    const router = useRouter();
    const currentLocationQuery = useGetCurrentLocation();
    const { t, locale } = useSystemTranslation();

    function onClick() {
        const city = currentLocationQuery.data?.city;
        if (city) {
            router.push(`/weather/${city}`);
        }
        else {
            props.setErrorMessage(SearchErrorI18NKey.INVALID_CURRENT_LOCATION);
        }
    }

    return (
        <Tooltip title={t("component.searchBar.useCurrentLocation")}>
            <span>
                <IconButton
                    color="primary"
                    type="button"
                    onClick={() => onClick()}
                    disabled={currentLocationQuery.isLoading}
                    sx={{
                        color: "gray",
                        margin: "0px 10px",
                    }}
                >
                    <MyLocationIcon />
                </IconButton>
            </span>
        </Tooltip>
    );
};

export function Error(props: { message: string }) {
    const { t } = useSystemTranslation();
    if (!props.message) {
        return null;
    }
    return (
        <Box position="relative" height="0">
            <Box position="absolute" mt={1}>
                <Alert variant="filled" severity="error" sx={{ pr: "25px" }}>
                    {t(props.message)}
                </Alert>
            </Box>
        </Box>
    );
}

export function SuggestionBox(props: { children: React.ReactNode; listprops: React.HTMLAttributes<HTMLUListElement> }) {
    return (
        <Box
            sx={{
                "position": "relative",
                "zIndex": "1",
                "listStyleType": "none",
                "p": 0,
                "m": 0,
                "& .Mui-focused": {
                    backgroundColor: "#e9e9e9",
                },
            }}
        >
            <Paper sx={{ position: "absolute", width: "100%", top: "10px" }} component="ul" {...props.listprops}>
                <List sx={{ p: 0 }}>
                    {props.children}
                </List>
            </Paper>
        </Box>
    );
};

export default function SearchBar(props: BoxProps) {
    const currentLocationQuery = useGetCurrentLocation();
    const { t } = useSystemTranslation();
    const coords = `${currentLocationQuery.data?.lat},${currentLocationQuery.data?.lng}`;
    const [searchQuery, setQuery] = useGetLocationAutoComplete("", coords);
    const [searchError, setSearchError] = useState(SearchErrorI18NKey.EMPTY);
    const [icon, setIcon] = useState(<MyLocationButtonIcon setErrorMessage={setSearchError} />);
    const mounted = useRef(false);
    const router = useRouter();

    // Changes SessionID for Autocomplete.
    // Shows Loading Icon && Determines if Location Exist.
    // Returns Weather details if exist.
    // Provide an error if it does not exist.
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIcon(<Loader />);
        const target = e.target as typeof e.target & { elements: { suburb: { value: string } } };
        const location = target.elements.suburb.value;
        await queryLocation(location)
            .then((_) => {
                router.push(`/weather/${location}`);
            })
            .catch((err: FetchError) => {
                if (err.res.status === 404) {
                    return setSearchError(SearchErrorI18NKey.INVALID_LOCATION);
                }

                if (err.res.status === 500) {
                    return setSearchError(SearchErrorI18NKey.INTERNAL_SERVER_ERROR);
                }
            })
            .finally(() => mounted && setIcon(
                <MyLocationButtonIcon setErrorMessage={setSearchError} />));
    }

    // Get a location query and finds location that match the query.
    // Bia results based on user's location via lat, lon.
    function getSuggestion(query: string) {
        setQuery(query);
    }

    // Debounce && Throttle Queries for Reduce API Calls.
    function DebounceAndThrottleAutoComplete(query: string) {
        if (query.length < 5) {
            debounceFunc(getSuggestion, undefined);
            throttleFunc(getSuggestion, query);
        }
        else {
            throttleFunc(getSuggestion, undefined);
            debounceFunc(getSuggestion, query);
        }
    }

    // Remove memory Leaks
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    // Autocomplete Props from MaterialUI
    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete<AutoCompleteSuggestions>({
        id: "search-menu",
        options: searchQuery.data ?? [],
        onInputChange: (_, v) => DebounceAndThrottleAutoComplete(v),
        onChange: (_, v) => (v && router.push(`/weather/${v.main} ${v.secondary}`)),
        getOptionLabel: x => `${x.main} ${x.secondary}`,
        clearOnBlur: false,
        isOptionEqualToValue: (i, o) => (i.main === o.main && i.secondary === o.secondary),
    });

    return (
        <FormContainer {...getRootProps()} {...props}>
            <Box component="form" onSubmit={onSubmit}>
                <SearchComponent>
                    <SearchField>
                        <FieldBox
                            name="suburb"
                            placeholder={t("component.searchBar.placeholder")}
                            required
                            inputProps={{ ...getInputProps() }}
                        />
                        <MagnifyIconButton />
                    </SearchField>
                    <Divider orientation="vertical" sx={{ height: 28 }} />
                    {icon}
                </SearchComponent>

                {groupedOptions.length > 0
                    ? (
                            <SuggestionBox listprops={getListboxProps()}>
                                {(groupedOptions as Array<AutoCompleteSuggestions>).map((option, index: number) => {
                                    const { key, ...optionProps } = getOptionProps({ option, index });
                                    return (
                                        <Box
                                            component="li"
                                            key={key}
                                            {...optionProps}
                                            sx={{
                                                "p": "5px 10px",
                                                "userSelect": "none",
                                                "borderBottom": "1px solid",
                                                "borderColor": "divider",
                                                "&.Mui-focused": {
                                                    backgroundColor: "action.hover",
                                                },
                                            }}
                                        >
                                            <Box display="inline" color="text.main"><b>{option.main}</b></Box>
                                            <Box display="inline" color="text.secondary" ml="1ch">{option.secondary}</Box>
                                        </Box>
                                    );
                                })}
                            </SuggestionBox>
                        )
                    : null }
                <Error message={searchError} />
            </Box>
        </FormContainer>
    );
}
