import mediaQuery from "css-mediaquery";

export interface Dimension {
    width: number;
    height: number;
}

export function resizeWindow(dimension: Dimension) {
    window.happyDOM.setViewport({
        width: dimension.width,
        height: dimension.height,
        devicePixelRatio: 2, // Retina display
    });
};

export function createMatchMedia(width: number) {
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
    window.matchMedia = createMatchMedia(375);
    resizeWindow({ height: 667, width: 375 });
}

export function useDesktopScreen() {
    window.matchMedia = createMatchMedia(1080);
    resizeWindow({ height: 1920, width: 1080 });
}
