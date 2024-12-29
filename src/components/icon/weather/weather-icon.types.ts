import { SxProps } from "@mui/system";

export interface WeatherIconProps {
    decoration?: boolean;
}

export type WeatherParticleProps = {
    left?: string;
    top?: string;
    height?: string;
    filter?: string;
    width?: string;
    angle?: string;
} & SxProps;
