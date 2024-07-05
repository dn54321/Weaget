import { useContext } from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { WidgetStoreContext } from "@components/provider/widget-provider";
import { WidgetStore } from "@src/stores/widget.store";

export function useWidgetStore<T>(
    selector: (store: WidgetStore) => T,
) {
    const storeContext = useContext(WidgetStoreContext);
    if (storeContext === undefined) {
        throw new Error(`useWidgetStore must be used within WidgetStoreProvider`);
    }

    return useStoreWithEqualityFn(storeContext, selector, shallow);
}
