"use client";
import { BrokenCloud } from "@components/icon/weather/broken-cloud-icon";
import { FewCloudIcon } from "@components/icon/weather/few-cloud-icon/few-cloud-icon.component";
import { Mist } from "@components/icon/weather/mist-icon";
import { OvercastCloud } from "@components/icon/weather/overcast-cloud-icon/overcast-cloud-icon.component";
import { RainCloud } from "@components/icon/weather/rain-cloud-icon";
import { ScatteredCloud } from "@components/icon/weather/scattered-cloud-icon";
import { ShowerRain } from "@components/icon/weather/shower-rain-icon/shower-rain-icon.component";
import { SnowCloud } from "@components/icon/weather/snow-cloud-icon/snow-cloud-icon.component";
import SunIcon from "@components/icon/weather/sun-icon/sun-icon.component";
import { Thunderstorm } from "@components/icon/weather/thunderstorm-icon/thunderstorm-icon.component";
import Footer from "@components/layout/footer/footer.component";
import Navbar from "@components/layout/navbar/navbar.component";
import { Sidebar } from "@components/layout/sidebar";
import CollectionsIcon from "@mui/icons-material/Collections";
import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export const weatherIconShowcase = [
    {
        description: "weather.icon.thunderstorm.description",
        icon: <Thunderstorm decoration />,
        id: 200,
        name: "weather.icon.thunderstorm.title"
    },
    {
        description: "weather.icon.showerRain.description",
        icon: <ShowerRain decoration />,
        id: 300,
        name: "weather.icon.showerRain.title"
    },
    {
        description: "weather.icon.rainCloud.description",
        icon: <RainCloud decoration />,
        id: 500,
        name: "weather.icon.rainCloud.title"
    },
    {
        description: "weather.icon.snowCloud.description",
        icon: <SnowCloud decoration />,
        id: 600,
        name: "weather.icon.snowCloud.title"
    },
    {
        description: "weather.icon.mist.description",
        icon: <Mist decoration />,
        id: 700,
        name: "weather.icon.mist.title"
    },
    {
        description: "weather.icon.sun.description",
        icon: <SunIcon decoration />,
        id: 800,
        name: "weather.icon.sun.title"
    },
    {
        description: "weather.icon.fewCloud.description",
        icon: <FewCloudIcon decoration />,
        id: 801,
        name: "weather.icon.fewCloud.title"
    },
    {
        description: "weather.icon.scatteredCloud.title",
        icon: <ScatteredCloud decoration />,
        id: 802,
        name: "weather.icon.scatteredCloud.title"
    },
    {
        description: "weather.icon.brokenCloud.title",
        icon: <BrokenCloud decoration />,
        id: 803,
        name: "weather.icon.brokenCloud.title"
    },
    {
        description: "weather.icon.overcastCloud.title",
        icon: <OvercastCloud decoration />,
        id: 804,
        name: "weather.icon.overcastCloud.title"
    }
];

export const menuItem = [
    {
        icon: <CollectionsIcon fontSize="small" />,
        name: "page.iconGallery.gallery",
        to: "/icons"
    },
    {
        name: "weather.icon.text"
    },
    ...weatherIconShowcase.map(weather => ({
        icon: weather.icon,
        name: weather.name,
        to: `/icons/weather/${weather.id}`
    }))
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
                        aria-labelledby="Sidebar"
                        component="nav"
                        dense
                        sx={{ mt: "20px" }}
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
                                                "&.Mui-selected": {
                                                    backgroundColor: "secondary.dark",
                                                    color: "secondary.contrastText"
                                                },
                                                "&.MuiListItemButton-root.Mui-selected:hover": {
                                                    backgroundColor: "secondary.dark",
                                                    color: "secondary.contrastText"
                                                },
                                                "color": "text.primary"
                                            }}
                                        >
                                            <ListItemIcon sx={{
                                                filter: "initial",
                                                overflow: "hidden",
                                                width: "fit-content"
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
                <Box component="main" sx={{ flexGrow: 1, minHeight: "calc(100vh - 80px)", p: 3 }}>
                    <Toolbar />
                    {props.children}
                </Box>
            </Box>
            <Footer containerProps={{ maxWidth: "lg" }} />
        </Box>
    );
}
