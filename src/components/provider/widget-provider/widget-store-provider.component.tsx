import { createContext, useRef } from "react";
import { WidgetState, createWidgetStore } from "@src/stores/widget.store";

export interface WidgetProviderProps {
    widgetState?: Partial<WidgetState>;
    children: React.ReactNode;
}

export type WidgetStoreApi = ReturnType<typeof createWidgetStore>;
export const WidgetStoreContext = createContext<WidgetStoreApi | undefined>(
    undefined,
);

export default function WidgetStoreProvider(props: WidgetProviderProps) {
    const storeRef = useRef<WidgetStoreApi>();
    if (!storeRef.current) {
        storeRef.current = createWidgetStore(props.widgetState);
    }

    return (
        <WidgetStoreContext.Provider value={storeRef.current}>
            {props.children}
        </WidgetStoreContext.Provider>
    );
}
