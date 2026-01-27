"use client";

import { FetchError } from "@errors/fetch-error";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import SearchIcon from "@mui/icons-material/Search";
import { Alert, CircularProgress, Divider, IconButton, List, Paper, Tooltip, useAutocomplete } from "@mui/material";
import { Box, BoxProps } from "@mui/system";
import { AutoCompleteSuggestions } from "@src/apis/weaget/auto-complete/auto-complete.types";
import { useGetCurrentLocation } from "@src/hooks/use-get-current-location";
import { queryLocation } from "@src/hooks/use-get-location";
import { useGetLocationAutoComplete } from "@src/hooks/use-get-location-auto-complete";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { FieldBox, FormContainer, MagnifyIconButtonContainer, SearchComponent, SearchField } from "./search-bar.styles";
import { debounceSearchFunc, throttleSearchFunc } from "./search-bar.utils";

export enum SearchErrorI18NKey {
    EMPTY = "",
    INTERNAL_SERVER_ERROR = "component.searchBar.error.internalServerErr",
    INVALID_CURRENT_LOCATION = "component.searchBar.error.invalidCurrentLocation",
    INVALID_LOCATION = "component.searchBar.error.invalidLocation"
}

export function Error(props: { message: string }) {
    const { t } = useSystemTranslation();
    if (!props.message) {
        return null;
    }
    return (
        <Box height="0" position="relative">
            <Box mt={1} position="absolute">
                <Alert severity="error" sx={{ pr: "25px" }} variant="filled">
                    {t(props.message)}
                </Alert>
            </Box>
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
            .then(() => {
                router.push(`/weather/${location}`);
            })
            .catch((err: FetchError) => {
                if (err.res.status === 404) {
                    return setSearchError(SearchErrorI18NKey.INVALID_LOCATION);
                }

                return setSearchError(SearchErrorI18NKey.INTERNAL_SERVER_ERROR);
            })
            .finally(() => mounted && setIcon(
                <MyLocationButtonIcon setErrorMessage={setSearchError} />));
    }

    // Get a location query and finds location that match the query.
    // Bia results based on user's location via lat, lon.
    function getSuggestion(query: string | undefined) {
        setQuery(query);
    }

    // Debounce && Throttle Queries for Reduce API Calls.
    function DebounceAndThrottleAutoComplete(query: string) {
        if (query.length < 5) {
            debounceSearchFunc(getSuggestion, undefined);
            throttleSearchFunc(getSuggestion, query);
        }
        else {
            throttleSearchFunc(getSuggestion, undefined);
            debounceSearchFunc(getSuggestion, query);
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
        getInputProps,
        getListboxProps,
        getOptionProps,
        getRootProps,
        groupedOptions
    } = useAutocomplete<AutoCompleteSuggestions>({
        clearOnBlur: false,
        getOptionLabel: x => `${x.main} ${x.secondary}`,
        id: "search-menu",
        isOptionEqualToValue: (i, o) => (i.main === o.main && i.secondary === o.secondary),
        onChange: (_, v) => (v && router.push(`/weather/${v.main} ${v.secondary}`)),
        onInputChange: (_, v) => DebounceAndThrottleAutoComplete(v),
        options: searchQuery.data ?? []
    });

    return (
        <FormContainer {...getRootProps()} {...props}>
            <Box component="form" onSubmit={onSubmit}>
                <SearchComponent>
                    <SearchField>
                        <FieldBox
                            inputProps={{ ...getInputProps() }}
                            name="suburb"
                            placeholder={t("component.searchBar.placeholder")}
                            required
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
                                const { key, ...optionProps } = getOptionProps({ index, option });
                                return (
                                    <Box
                                        component="li"
                                        key={key}
                                        {...optionProps}
                                        sx={{
                                            "&.Mui-focused": {
                                                backgroundColor: "action.hover"
                                            },
                                            "borderBottom": "1px solid",
                                            "borderColor": "divider",
                                            "p": "5px 10px",
                                            "userSelect": "none"
                                        }}
                                    >
                                        <Box color="text.main" display="inline"><b>{option.main}</b></Box>
                                        <Box color="text.secondary" display="inline" ml="1ch">{option.secondary}</Box>
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
};

export function SuggestionBox(props: { children: React.ReactNode, listprops: React.HTMLAttributes<HTMLUListElement> }) {
    return (
        <Box
            sx={{
                "& .Mui-focused": {
                    backgroundColor: "#e9e9e9"
                },
                "listStyleType": "none",
                "m": 0,
                "p": 0,
                "position": "relative",
                "zIndex": "1"
            }}
        >
            <Paper component="ul" sx={{ position: "absolute", top: "10px", width: "100%" }} {...props.listprops}>
                <List sx={{ p: 0 }}>
                    {props.children}
                </List>
            </Paper>
        </Box>
    );
};

// React Components
function Loader() {
    return (
        <Box display="flex" mx="12px" px="8px">
            <CircularProgress size={25} />
        </Box>
    );
}

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
    const { t } = useSystemTranslation();

    function redirectCurrentWeatherLocation() {
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
                    disabled={currentLocationQuery.isLoading}
                    onClick={() => redirectCurrentWeatherLocation()}
                    sx={{
                        color: "gray",
                        margin: "0px 10px"
                    }}
                    type="button"
                >
                    <MyLocationIcon />
                </IconButton>
            </span>
        </Tooltip>
    );
}
