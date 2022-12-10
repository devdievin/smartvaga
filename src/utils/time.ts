import moment from "moment";
import { formatTimeZero } from "./format";

export const TODAY = moment().format('YYYY-MM-DD');
export let WORKING_DAY = moment().format('YYYY-MM-DD');

export const TIME_RANGE = [
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

export const timeNow = () => {
    const datetime = new Date();
    const hr = datetime.getHours();
    return `${hr}:00`;
}

export const timeRangeNow = (range: string[]) => {
    const index = range.indexOf(timeNow());

    if (index === -1) {
        WORKING_DAY = moment().add(1, "day").format('YYYY-MM-DD');
    }

    const result = range.slice((index + 1), range.length);
    return result;
}

export const setTimeRange = (reserveDate: string, range: string[]) => {
    if (reserveDate === WORKING_DAY) {
        return timeRangeNow(range);
    }

    return range;
}