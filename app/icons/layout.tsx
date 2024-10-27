"use client";
import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "@components/layout/navbar/navbar.component";
import { Sidebar } from "@components/layout/sidebar";
import CollectionsIcon from "@mui/icons-material/Collections";
import { usePathname, useRouter } from "next/navigation";
import { BrokenCloud } from "@components/icon/weather/broken-cloud-icon";
import { FewCloudIcon } from "@components/icon/weather/few-cloud-icon/few-cloud-icon.component";
import { Mist } from "@components/icon/weather/mist-icon";
import { OvercastCloud } from "@components/icon/weather/overcast-cloud-icon/overcast-cloud-icon.component";
import { RainCloud } from "@components/icon/weather/rain-cloud-icon";
import { ScatteredCloud } from "@components/icon/weather/scattered-cloud-icon";
import { ShowerRain } from "@components/icon/weather/shower-rain-icon/shower-rain-icon.component";
import { SnowCloud } from "@components/icon/weather/snow-cloud-icon/snow-cloud-icon.component";
import SunIcon from "@components/icon/weather/sun-icon/sun-icon.component";
import Footer from "@components/layout/footer/footer.component";
import React, { useState } from "react";
import { Thunderstorm } from "@components/icon/weather/thunderstorm-icon/thunderstorm-icon.component";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export const weatherIconShowcase = [
    {
        id: 200,
        icon: <Thunderstorm decoration />,
        name: "weather.icon.thunderstorm.title",
        description: "weather.icon.thunderstorm.description",
    },
    {
        id: 300,
        icon: <ShowerRain decoration />,
        name: "weather.icon.showerRain.title",
        description: "weather.icon.showerRain.description",
    },
    {
        id: 500,
        icon: <RainCloud decoration />,
        name: "weather.icon.rainCloud.title",
        description: "weather.icon.rainCloud.description",
    },
    {
        id: 600,
        icon: <SnowCloud decoration />,
        name: "weather.icon.snowCloud.title",
        description: "weather.icon.snowCloud.description",
    },
    {
        id: 700,
        icon: <Mist decoration />,
        name: "weather.icon.mist.title",
        description: "weather.icon.mist.description",
    },
    {
        id: 800,
        icon: <SunIcon decoration />,
        name: "weather.icon.sun.title",
        description: "weather.icon.sun.description",
    },
    {
        id: 801,
        icon: <FewCloudIcon decoration />,
        name: "weather.icon.fewCloud.title",
        description: "weather.icon.fewCloud.description",
    },
    {
        id: 802,
        name: "weather.icon.scatteredCloud.title",
        icon: <ScatteredCloud decoration />,
        description: "weather.icon.scatteredCloud.title",
    },
    {
        id: 803,
        name: "weather.icon.brokenCloud.title",
        icon: <BrokenCloud decoration />,
        description: "weather.icon.brokenCloud.title",
    },
    {
        id: 804,
        name: "weather.icon.overcastCloud.title",
        icon: <OvercastCloud decoration />,
        description: "weather.icon.overcastCloud.title",
    },
];

export const menuItem = [
    {
        name: "page.iconGallery.gallery",
        icon: <CollectionsIcon fontSize="small" />,
        to: "/icons",
    },
    {
        name: "weather.icon.text",
    },
    ...weatherIconShowcase.map(weather => ({
        name: weather.name,
        icon: weather.icon,
        to: `/icons/weather/${weather.id}`,
    })),
];

export default function IconLayout(props: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useSystemTranslation();
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const toggleSideMenu = () => setSideMenuOpen(menuOpen => !menuOpen);
    const sidebarWidth = "280px";

    return (
        <Box height="100%" position="relative">
            <Box sx={{ display: "flex" }}>
                <Navbar mobileBurgerFn={toggleSideMenu} />
                <Sidebar
                    drawerWidth={sidebarWidth}
                    isMobileSidebarOpen={sideMenuOpen}
                    onClose={toggleSideMenu}
                >
                    <Box mt="20px" />
                    <List
                        sx={{ mt: "20px" }}
                        component="nav"
                        aria-labelledby="Sidebar"
                        dense
                    >
                        {
                            menuItem.map((menu) => {
                                if (menu.to) {
                                    return (
                                        <ListItemButton
                                            key={menu.to}
                                            onClick={() => {
                                                router.push(menu.to);
                                                toggleSideMenu();
                                            }}
                                            selected={menu.to === pathname}
                                            sx={{
                                                "color": "text.primary",
                                                "&.Mui-selected": {
                                                    backgroundColor: "secondary.dark",
                                                    color: "secondary.contrastText",
                                                },
                                                "&.MuiListItemButton-root.Mui-selected:hover": {
                                                    backgroundColor: "secondary.dark",
                                                    color: "secondary.contrastText",
                                                },
                                            }}
                                        >
                                            <ListItemIcon sx={{
                                                filter: "initial",
                                                overflow: "hidden",
                                                width: "fit-content",
                                            }}
                                            >
                                                {menu.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={t(menu.name)} />
                                        </ListItemButton>
                                    );
                                }
                                else {
                                    return (<ListSubheader key={menu.name}>{t(menu.name)}</ListSubheader>);
                                }
                            })
                        }
                    </List>
                </Sidebar>
                <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "calc(100vh - 80px)" }}>
                    <Toolbar />
                    {props.children}
                </Box>
            </Box>
            <Footer containerProps={{ maxWidth: "lg" }} />
        </Box>
    );
}
