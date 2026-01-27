import { AlertBox } from "@components/ui/alert-box";
import type { AlertBoxProps } from "@components/ui/alert-box";
import { useState } from "react";

export interface AlertMessage {
    message: string;
    type: "success" | "info" | "warning" | "error";
    duration?: number;
    unclosable?: boolean;
    id?: string;
    active?: boolean;
}

export type useAlertInterface = Omit<AlertBoxProps, "alerts" | "removeAlert">;

export function useAlert() {
    const [alerts, setAlerts] = useState<Array<Required<AlertMessage>>>([]);
    const activeAlerts = alerts.filter(alert => alert.active);

    const markStaleAlerts = () => {
        setAlerts(oldAlerts => oldAlerts.map(
            alert => (alert.duration > Date.now()) ? alert : { ...alert, active: false },
        ));
    };
    const removeAlert = (id: string) => {
        setAlerts(oldAlerts => oldAlerts.map(
            alert => (alert.id !== id) ? alert : { ...alert, active: false },
        ));
    };

    const addAlert = (alert: AlertMessage) => {
        const duration = alert.duration || 5000;
        const id = alert.id ?? alert.message;
        setAlerts((oldAlerts) => {
            const hasSameId = oldAlerts.some(alert => alert.id === id);
            if (hasSameId) {
                return oldAlerts;
            }

            const newAlert = {
                ...alert,
                active: true,
                duration: Date.now() + duration,
                id: id,
                unclosable: Boolean(alert.unclosable),
            };

            return [...oldAlerts, newAlert];
        });

        if (duration !== Infinity) {
            setTimeout(() => markStaleAlerts(), duration);
        }
    };

    const alertBox = (props: useAlertInterface) => AlertBox({ ...props, alerts: activeAlerts, removeAlert });

    return { AlertBox: alertBox, addAlert, alerts: activeAlerts, removeAlert } as const;
}
