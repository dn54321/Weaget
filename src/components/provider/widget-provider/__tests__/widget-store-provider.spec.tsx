import * as widgetStore from "@src/stores/widget.store";
import { afterEach, describe, expect, it, vi } from "vitest";
import React from "react";
import WidgetStoreProvider from "@components/provider/widget-provider/widget-store-provider.component";
import { render } from "@testing-library/react";

describe("Component: widget-store-provider", async () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should properly initialise the widget store.", () => {
        const widgetStoreSpy = vi.spyOn(widgetStore, "createWidgetStore");
        render(<WidgetStoreProvider>test</WidgetStoreProvider>);
        expect(widgetStoreSpy).toHaveBeenCalled();
    });

    it("should use the cached widget store if it exists.", async () => {
        const widgetStoreSpy = vi.spyOn(widgetStore, "createWidgetStore");
        vi.spyOn(React, "useRef").mockReturnValue({ current: "mockRef" });
        render(<WidgetStoreProvider>mockElement</WidgetStoreProvider>);
        expect(widgetStoreSpy).not.toHaveBeenCalled();
    });
});
