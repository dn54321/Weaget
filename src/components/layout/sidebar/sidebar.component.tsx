import { Drawer, Toolbar, useTheme } from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";

export interface SidebarProps {
    children?: React.ReactNode
    drawerWidth?: number | string
    isMobileSidebarOpen?: boolean
    onClose?: () => void
}
export default function Sidebar(props: SidebarProps) {
    const drawerWidth = props.drawerWidth || 240;
    const theme = useTheme();
    const tabletSize = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <Drawer
            ModalProps={{
                keepMounted: true // Better open performance on mobile.
            }}
            onClose={props.onClose}
            open={tabletSize ? true : props.isMobileSidebarOpen}
            sx={{
                ["& .MuiDrawer-paper"]: { boxSizing: "border-box", width: drawerWidth },
                flexShrink: 0,
                width: drawerWidth
            }}
            variant={tabletSize ? "permanent" : "temporary"}
        >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
                {props.children}
            </Box>
        </Drawer>
    );
}
