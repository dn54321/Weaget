import { useState } from "react";
import { AlertBox, AlertBoxProps } from "../components/AlertBox";
import crypto from "crypto";

export interface AlertMessage {
    message: string,
    type: "success" | "info" | "warning" | "error",
    duration?: number,
    unclosable?: boolean,
    id?: string,
    active?: boolean,
}

export type useAlertInterface = Omit<AlertBoxProps, "alerts" | "removeAlert">;

export function useAlert() {
    const [alerts, setAlerts] = useState<Array<Required<AlertMessage>>>([]);
    const activeAlerts = alerts.filter(alert => alert.active);

    const markStaleAlerts = () => {
        setAlerts(oldAlerts => oldAlerts.map(
            alert => (alert.duration > Date.now()) ? alert : {...alert, active: false}
        ));
    }
    const removeAlert = (id: string) => {
        setAlerts(oldAlerts => oldAlerts.map(
            alert => (alert.id !== id) ? alert : {...alert, active: false}
        ));
    }

    const addAlert = (alert: AlertMessage) => {
        const duration = alert.duration || 5000;
        const id = crypto.createHash('md5').update(alert.message).digest('hex');
        setAlerts((oldAlerts) => {
            const hasSameId = oldAlerts.some((alert) => alert.id === id);
            if (hasSameId) {
                return oldAlerts;
            }

            const newAlert = {
                ...alert, 
                duration: Date.now() + duration,
                unclosable: Boolean(alert.unclosable),
                active: true,
                id: id,
            }

            return [...oldAlerts, newAlert];
        })

        if (duration !== Infinity) {
            setTimeout(() => markStaleAlerts(), duration);
        }
    }


    const alertBox = (props: useAlertInterface) => AlertBox({...props, alerts: activeAlerts, removeAlert});


    return {alerts: activeAlerts, addAlert, removeAlert, AlertBox: alertBox} as const;
}