declare module "@mui/material/styles" {
    interface Theme {
        palette: {
            text: {
                color: string;
            };
            primary: {
                main: string;
                light: string;
                dark: string;
                contrastColor: string;
            };
        };
        shadows: Array<string>;
    }

    interface ThemeOptions {
        palette: {
            text: {
                color: string;
            };
            primary: {
                main: string;
                light: string;
                dark: string;
                contrastColor: string;
            };
        };
    }
}
