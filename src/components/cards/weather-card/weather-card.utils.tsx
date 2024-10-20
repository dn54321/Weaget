import { DateTime } from "luxon";

export function getWeatherCardDateString(date: DateTime) {
    const timezone = date.zoneName;
    const currentTime = DateTime.local({ zone: `${timezone}` }).startOf("day");
    const days = Math.floor(date.diff(currentTime, "days").toObject().days || 0);
    if (days == 0 || days == 1) return date.toRelativeCalendar({ unit: "days" });
    const dateString = date.toLocaleString({ month: "short", day: "2-digit" });
    return dateString;
}
