declare module "@mui/material/styles" {
    interface Theme {
        palette: {
            primary: {
                contrastColor: string
                dark: string
                light: string
                main: string
            }
            text: {
                color: string
            }
        }
        shadows: Array<string>
    }

    interface ThemeOptions {
        palette: {
            primary: {
                contrastColor: string
                dark: string
                light: string
                main: string
            }
            text: {
                color: string
            }
        }
    }
}
