import { Alert, Box, BoxProps, Fade, Slide, Stack } from "@mui/material";
import { AlertMessage } from "../hooks/useAlert";

export interface AlertBoxProps {
    maxAlerts?: number;
    alerts: Array<Required<AlertMessage>>;
    removeAlert: (id: string) => void;

}

// Please use the useAlert hook instead of this component.
// The useAlert hook contains an AlertBox component that should be used.

export function AlertBox(props: AlertBoxProps & BoxProps) {
    const {maxAlerts, alerts, removeAlert} = props;
    const maxAlertsCount = maxAlerts || 3;
    return (
        <Box sx={{
            position: "fixed",
            bottom: {xs: "initial", md: 30},
            top: {xs: 30, md: "initial"},
            right: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
        zIndex={1101}
        >
            <Stack gap="10px" width="min(90%,450px)">
                    {
                        alerts.slice(-maxAlertsCount).map((alert)=>
                            <Alert
                                key={alert.id}
                                variant="filled"
                                severity={alert.type}
                                {...(!alert.unclosable && {onClose: () => removeAlert(alert.id)})}
                            >
                                {alert.message}
                            </Alert>
                        )
                    }
            </Stack>
        </Box>
    )   
}