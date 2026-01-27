import { Alert, Box, BoxProps, Stack } from "@mui/material";
import { AlertMessage } from "@src/hooks/use-alert";

export interface AlertBoxProps {
    alerts: Array<Required<AlertMessage>>
    maxAlerts?: number
    removeAlert: (id: string) => void

}

// Please use the useAlert hook instead of this component.
// The useAlert hook contains an AlertBox component that should be used.

export default function AlertBox(props: AlertBoxProps & BoxProps) {
    const { alerts, maxAlerts, removeAlert } = props;
    const maxAlertsCount = maxAlerts || 3;
    const alertSliceIndex = Math.max(0, alerts.length - maxAlertsCount);
    return (
        <Box
            sx={{
                alignItems: "center",
                bottom: { md: 30, xs: "initial" },
                display: "flex",
                flexDirection: "column",
                left: 0,
                pointerEvents: "none",
                position: "fixed",
                right: 0,
                top: { md: "initial", xs: 30 }
            }}
            zIndex={1400}
        >
            <Stack gap="10px" width="min(90%,450px)">
                {
                    alerts.slice(alertSliceIndex).map(alert => (
                        <Alert
                            key={alert.id}
                            severity={alert.type}
                            sx={{ pointerEvents: "all" }}
                            variant="filled"
                            {...(!alert.unclosable && { onClose: () => removeAlert(alert.id) })}
                        >
                            {alert.message}
                        </Alert>
                    )
                    )
                }
            </Stack>
        </Box>
    );
}
