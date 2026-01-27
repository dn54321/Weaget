import SettingsStoreProvider from "@components/provider/settings-provider/settings-store-provider.component";
import * as SettingsStore from "@src/stores/settings.store";
import { render } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Component: settings-store-provider", async () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    // it("should properly initialise the setting store .", () => {
    //     const settingsStoreSpy = vi.spyOn(SettingsStore, "createSettingsStore");
    //     render(<SettingsStoreProvider>mockElement</SettingsStoreProvider>);
    //     expect(settingsStoreSpy).toHaveBeenCalled();
    // });

    it("should use the cached setting store if it exists.", async () => {
        const settingsStoreSpy = vi.spyOn(SettingsStore, "createSettingsStore");
        vi.spyOn(React, "useRef").mockReturnValue({ current: "mockRef" });
        render(<SettingsStoreProvider>mockElement</SettingsStoreProvider>);
        expect(settingsStoreSpy).not.toHaveBeenCalled();
    });
});
