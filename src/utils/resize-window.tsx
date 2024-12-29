import mediaQuery from "css-mediaquery";

export interface Dimension {
    width: number;
    height: number;
}

export function resizeWindow(dimension: Dimension) {
    window.innerWidth = dimension.width;
    window.innerHeight = dimension.height;
    window.dispatchEvent(new Event("resize"));
};

function createMatchMedia(width: number) {
    return (query: string): MediaQueryList => ({
        matches: mediaQuery.match(query, { width }) as boolean,
        media: "",
        addListener: () => {},
        removeListener: () => {},
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
    });
}

export function useMobileScreen() {
    resizeWindow({ height: 667, width: 375 });
    window.matchMedia = createMatchMedia(375);
}

export function useDesktopScreen() {
    resizeWindow({ height: 1920, width: 1080 });
    window.matchMedia = createMatchMedia(1080);
}
