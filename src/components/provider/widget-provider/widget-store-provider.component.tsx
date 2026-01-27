import { createWidgetStore, WidgetState } from "@src/stores/widget.store";
import React from "react";
import { createContext } from "react";

export interface WidgetProviderProps {
    children: React.ReactNode
    widgetState?: Partial<WidgetState>
}

export type WidgetStoreApi = ReturnType<typeof createWidgetStore>;
export const WidgetStoreContext = createContext<undefined | WidgetStoreApi>(
    undefined
);

export default function WidgetStoreProvider(props: WidgetProviderProps) {
    const storeRef = React.useRef<WidgetStoreApi>();
    if (!storeRef.current) {
        storeRef.current = createWidgetStore(props.widgetState);
    }

    return (
        <WidgetStoreContext.Provider value={storeRef.current}>
            {props.children}
        </WidgetStoreContext.Provider>
    );
}
