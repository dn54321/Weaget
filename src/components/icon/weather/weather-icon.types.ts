import { SxProps } from "@mui/system";

export interface WeatherIconProps {
    decoration?: boolean
}

export type WeatherParticleProps = SxProps & {
    angle?: string
    filter?: string
    height?: string
    left?: string
    top?: string
    width?: string
};
