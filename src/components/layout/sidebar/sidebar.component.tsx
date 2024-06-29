import { Drawer, Toolbar, useTheme } from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";

export interface SidebarProps {
    children?: React.ReactNode;
    drawerWidth?: number | string;
    isMobileSidebarOpen: boolean;
    onClose: () => void
}
export default function Sidebar(props: SidebarProps) {
    const drawerWidth = props.drawerWidth || 240;
    const theme = useTheme();
    const tabletSize = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Drawer
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            variant={tabletSize ? 'permanent' : 'temporary'}
            open={tabletSize ? true : props.isMobileSidebarOpen}
            onClose={props.onClose}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            {props.children}
        </Box>
        </Drawer>
    )
}