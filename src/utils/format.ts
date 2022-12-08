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