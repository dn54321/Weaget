import { DateTime } from "luxon";

export function getWeatherCardDateString(date: DateTime) {
    const timezone = date.zoneName;
    const currentTime = DateTime.local({ zone: `${timezone}` }).startOf('day');
    const days = Math.floor(date.diff(currentTime, 'days').toObject().days || 0);
    if (days == 0) return "today";
    if (days == 1) return "tomorrow";
    const dateString = date.toFormat("LLL dd");
    return dateString;
}