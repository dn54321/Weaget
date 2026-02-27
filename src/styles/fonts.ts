import { Quicksand, Roboto } from "next/font/google";

export const quicksand = Quicksand({
    display: "swap",
    subsets: ["latin"],
    weight: "600",
    adjustFontFallback: true,
    variable: "--font-quicksand",
});

export const roboto = Roboto({
    display: "swap",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    adjustFontFallback: true,
    variable: "--font-roboto",
});
