import moment from "moment";
// import * as moment from "moment"
import "moment/locale/pt-br";
import "moment-timezone";
import { formatTimeZero } from "./format";

// moment.tz.setDefault("America/Sao_Paulo");
// moment.updateLocale("pt-br", config)

export const TODAY = moment().locale("pt-br").format('YYYY-MM-DD');
export let WORKING_DAY = moment().locale("pt-br").format('YYYY-MM-DD');

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

    return (hr < 10) ? `0${hr}:00` : `${hr}:00`;
}

export const timeRangeNow = (range: string[]) => {
    console.log("function timeNow():", timeNow());

    if (timeNow() < range[0]) {
        return range;
    }

    const index = range.indexOf(timeNow());

    if (index === -1 || index === (range.length - 1)) {
        WORKING_DAY = moment().locale("pt-br").add(1, "day").format('YYYY-MM-DD');
        return range;
    }

    return range.slice((index + 1), range.length);
}

export const setTimeRange = (reserveDate: string, range: string[]) => {
    if (reserveDate === TODAY) {
        return timeRangeNow(range);
    }

    return range;
}