import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useWidgetStore } from "@project/src/hooks/stores/use-widget-store";

describe("Hooks - use-widget-store", () => {
    it("should throw error if no provider for setting store is provided", async () => {
        expect(
            () => renderHook(() => useWidgetStore(state => state)),
        ).toThrow(`useWidgetStore must be used within WidgetStoreProvider`);
    });
});
