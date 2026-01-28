import type DetachedWindowAPI from "happy-dom/lib/window/DetachedWindowAPI.js";

declare global {
    interface Window {
        happyDOM: DetachedWindowAPI;
    }
}

// This line is needed if the file has no imports/exports to ensure it's treated as a module augmenting the global scope.
export {};
