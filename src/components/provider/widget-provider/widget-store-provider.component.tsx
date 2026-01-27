import React from "react";
import type { WidgetState } from "@src/stores/widget.store";
import { createContext } from "react";
import { createWidgetStore } from "@src/stores/widget.store";

export interface WidgetProviderProps {
    widgetState?: Partial<WidgetState>;
    children: React.ReactNode;
}

export type WidgetStoreApi = ReturnType<typeof createWidgetStore>;
export const WidgetStoreContext = createContext<WidgetStoreApi | undefined>(
    undefined,
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
