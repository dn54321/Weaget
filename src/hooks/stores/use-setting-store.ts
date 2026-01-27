import { SettingsStoreContext } from "@components/provider/settings-provider";
import { SettingStore } from "@src/stores/settings.store";
import { useContext } from "react";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";

export function useSettingStore<T>(
    selector: (store: SettingStore) => T
) {
    const storeContext = useContext(SettingsStoreContext);
    if (storeContext === undefined) {
        throw new Error("useSettingStore must be used within SettingsStoreProvider");
    }

    return useStoreWithEqualityFn(storeContext, selector, shallow);
}
