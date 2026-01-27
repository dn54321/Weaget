import mediaQuery from "css-mediaquery";

export interface Dimension {
    height: number
    width: number
}

export function resizeWindow(dimension: Dimension) {
    window.innerWidth = dimension.width;
    window.innerHeight = dimension.height;
    window.dispatchEvent(new Event("resize"));
};

export function useDesktopScreen() {
    resizeWindow({ height: 1920, width: 1080 });
    window.matchMedia = createMatchMedia(1080);
}

export function useMobileScreen() {
    resizeWindow({ height: 667, width: 375 });
    window.matchMedia = createMatchMedia(375);
}

function createMatchMedia(width: number) {
    return (query: string): MediaQueryList => ({
        addEventListener: () => {},
        addListener: () => {},
        dispatchEvent: () => true,
        matches: mediaQuery.match(query, { width }) as boolean,
        media: "",
        onchange: () => {},
        removeEventListener: () => {},
        removeListener: () => {}
    });
}
