import { useContext } from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { SettingStore } from "@src/stores/settings.store";
import { SettingsStoreContext } from "@components/provider/settings-provider/settings-store-provider";
import { shallow } from "zustand/shallow";

export function useSettingStore<T>(
    selector: (store: SettingStore) => T,
) {
    const storeContext = useContext(SettingsStoreContext);
    if (storeContext === undefined) {
        throw new Error(`useSettingStore must be used within SettingsStoreProvider`);
    }

    return useStoreWithEqualityFn(storeContext, selector, shallow);
}
