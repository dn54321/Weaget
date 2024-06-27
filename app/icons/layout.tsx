"use client";
import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "../../src/components/layout/navbar";
import { Sidebar } from "../../src/components/layout/sidebar";
import CollectionsIcon from '@mui/icons-material/Collections';
import { usePathname, useRouter } from 'next/navigation';
import { BrokenCloud } from "../../src/components/icon/weather/broken-cloud-icon";
import { FewCloudIcon } from "../../src/components/icon/weather/few-cloud-icon";
import { Mist } from "../../src/components/icon/weather/mist-icon";
import { OvercastCloud } from "../../src/components/icon/weather/overcast-cloud-icon";
import { RainCloud } from "../../src/components/icon/weather/rain-cloud-icon";
import { ScatteredCloud } from "../../src/components/icon/weather/scattered-cloud-icon";
import { ShowerRain } from "../../src/components/icon/weather/shower-rain-icon";
import { SnowCloud } from "../../src/components/icon/weather/snow-cloud-icon";
import SunIcon from "../../src/components/icon/weather/sun-icon";
import Footer from "../../src/components/layout/footer";
import React, { useState } from "react";
import { Thunderstorm } from "../../src/components/icon/weather/thunderstorm-icon";

export const weatherIconShowcase = [
    {
        id: 200,
        icon: <Thunderstorm/>,
        name: "Thunderstorm",
        description: "A lightning bolt accompanied with a cloud."
    },
    {
        id: 300,
        icon: <ShowerRain/>,
        name: "Shower Rain",
            description: "Grey clouds with many light raindrops."
    },
    {
        id: 500,
        icon: <RainCloud/>,
        name: "Rain Cloud",
        description: "Grey clouds with some heavy raindrops."
    },
    {
        id: 600,
        icon: <SnowCloud/>,
        name: "Snow Cloud",
        description: "Light gray clouds with acommpanying snow flakes."
    },
    {
        id: 700,
        icon: <Mist/>,
        name: "Mist",
        description: "A layer of clouds obscuring the sun."
    },
    {
        id: 800,
        icon: <SunIcon/>,
        name: "Sun",
        description: "A bright circle representing the sun."
    },
    {
        id: 801,
        icon: <FewCloudIcon/>,
        name: "Few Clouds",
        description: "A small cloud accompanied with the sun."
    },
    {
        id: 802,
        name: "Scattered Clouds",
        icon: <ScatteredCloud/>,
        description: "A few clouds accompanied with the sun."
    },
    {
        id: 803,
        name: "Broken Clouds",
        icon: <BrokenCloud/>,
        description: "A few clouds obscuring with the sun."
    },
    {
        id: 804,
        name: "Overcast Clouds",
        icon: <OvercastCloud/>,
        description: "Many clouds accompanied with a small sun."
    }
]

export const menuItem = [
    {
        name: "Gallery",
        icon: <CollectionsIcon fontSize="small"/>,
        to: "/icons"
    },
    {
        name: "Weather Icons",
    },
    ...weatherIconShowcase.map((weather) => ({
        name: weather.name,
        icon: weather.icon,
        to: `/icons/weather/${weather.id}`
    }))
]

export default function IconLayout(props: { children: React.ReactNode}) {  
    const router = useRouter();
    const pathname = usePathname();
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const toggleSideMenu = () => setSideMenuOpen((menuOpen) => !menuOpen)
    const sidebarWidth = "280px";

    return (
        <Box height="100%" position="relative">
            <Box sx={{ display: 'flex' }}>
                <Navbar mobileBurgerFn={toggleSideMenu}/>
                <Sidebar 
                    drawerWidth={sidebarWidth} 
                    isMobileSidebarOpen={sideMenuOpen}
                    onClose={toggleSideMenu}
                >
                <Box mt="20px"/>
                    <List 
                        sx={{mt: "20px"}}
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
                                                color: "text.primary",
                                                "&.Mui-selected": {
                                                    backgroundColor: "secondary.dark",
                                                    color: "secondary.contrastText"
                                                },
                                                "&.MuiListItemButton-root.Mui-selected:hover": {
                                                    backgroundColor: "secondary.dark",
                                                    color: "secondary.contrastText"
                                                }
                                            }}
                                        >
                                            <ListItemIcon sx={{
                                                filter: "initial", 
                                                overflow: "hidden",
                                                width: "fit-content"
                                            }}>
                                                {menu.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={menu.name} />
                                        </ListItemButton>
                                    )
                                }
                                else {
                                    return (<ListSubheader key={menu.name}>{menu.name}</ListSubheader>)
                                }
                            })
                        }
                    </List> 
                </Sidebar>
                <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight:"calc(100vh - 80px)"}}>
                    <Toolbar />
                    {props.children}
                </Box>        
            </Box>
            <Footer containerProps={{maxWidth: "lg"}} />
        </Box>
    )
}