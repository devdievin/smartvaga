export const hourFormat = (hour: string, format: string) => {
    const timeData = hour.split(":");

    switch (format) {
        case "HH":
            return `${timeData[0]}h`
        case "HH:MM":
            return `${timeData[0]}:${timeData[1]}`
        case "HH:MM:SS":
            return `${timeData[0]}:${timeData[1]}:${timeData[2]}`
    }
}

export const formatTimeZero = (hour: string) => {
    const time = hour.split(":");
    const hr = parseInt(time[0]);
    const mn = parseInt(time[1]);
    const fmtHours = (hr < 10) ? `0${hr}` : hr;
    const fmtMinutes = (mn < 10) ? `0${mn}` : mn;
    return `${fmtHours}:${fmtMinutes}`;
}