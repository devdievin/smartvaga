import moment from "moment";
import "moment/locale/pt-br";
import { formatTimeZero } from "./format";

export const TODAY = moment().locale("pt-br").format('YYYY-MM-DD');
export var WORKING_DAY = moment().locale("pt-br").format('YYYY-MM-DD');

export const TIMES_OF_DAY = [
    "00:00:00", "01:00:00", "02:00:00", "03:00:00",
    "04:00:00", "05:00:00", "06:00:00", "07:00:00",
    "08:00:00", "09:00:00", "10:00:00", "11:00:00",
    "12:00:00", "13:00:00", "14:00:00", "15:00:00",
    "16:00:00", "17:00:00", "18:00:00", "19:00:00",
    "20:00:00", "21:00:00", "22:00:00", "23:00:00",
]

export const setExitTime = (entry_time: string, reserve_hours: number) => {
    const time = entry_time.split(":");
    const entry_hour = parseInt(time[0]);
    const exit_time = `${entry_hour + reserve_hours}:00:00`;
    return formatTimeZero(exit_time);
}

export const timeNow = () => {
    const datetime = new Date();
    const hr = datetime.getHours();

    return (hr < 10) ? `0${hr}:00:00` : `${hr}:00:00`;
}

export const timeRangeNow = (reserveDate: string, range: string[]) => {
    if (reserveDate === TODAY) {
        if (timeNow() < range[0]) {
            console.log("MENOR");
            return range;
        }

        const index = range.indexOf(timeNow());

        if (index === -1 || index === (range.length - 1)) {
            // Colocar o WORKING_DAY direto no dashboard e manipular se o worktime for [] vazio
            WORKING_DAY = moment().locale("pt-br").add(1, "day").format('YYYY-MM-DD');
            console.log("MAIOR");

            return range;
        }

        console.log("DENTRO");
        return range.slice((index + 1), range.length);
    }

    return range;
}

// # OBS: ESSA FUNÇÃO É DISPENSÁVEL, TENHO QUE REMOVÊ-LA
// export const setTimeRange = (reserveDate: string, range: string[]) => {
//     if (reserveDate === TODAY) {
//         return timeRangeNow(range);
//     }

//     return range;
// }

export const getTimeIndex = (value: string) => {
    return TIMES_OF_DAY.indexOf(value);
}