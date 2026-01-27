import { useWidgetStore } from "@src/hooks/stores/use-widget-store";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Hooks - use-widget-store", () => {
    it("should throw error if no provider for setting store is provided", async () => {
        expect(
            () => renderHook(() => useWidgetStore(state => state))
        ).toThrow("useWidgetStore must be used within WidgetStoreProvider");
    });
});
