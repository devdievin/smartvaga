import { formatTimeZero } from "./format";

export const timeRange = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00"
];

export const setExitTime = (entry_time: string, reserve_hours: number) => {
    const time = entry_time.split(":");
    const entry_hour = parseInt(time[0]);
    const exit_time = `${entry_hour + reserve_hours}:00`;
    return formatTimeZero(exit_time);
}