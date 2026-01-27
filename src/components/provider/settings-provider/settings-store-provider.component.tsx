import React from "react";
import type { SettingState } from "@src/stores/settings.store";
import { createContext } from "react";
import { createSettingsStore } from "@src/stores/settings.store";

export interface SettingProviderProps {
    settings?: Partial<SettingState>;
    children: React.ReactNode;
    temporary?: boolean;
}

export type SettingStoreApi = ReturnType<typeof createSettingsStore>;
export const SettingsStoreContext = createContext<SettingStoreApi | undefined>(
    undefined,
);

export default function SettingsStoreProvider(props: SettingProviderProps) {
    const storeRef = React.useRef<SettingStoreApi>();
    if (!storeRef.current) {
        storeRef.current = createSettingsStore(props.settings, !props.temporary);
    }

    return (
        <SettingsStoreContext.Provider value={storeRef.current}>
            {props.children}
        </SettingsStoreContext.Provider>
    );
}
