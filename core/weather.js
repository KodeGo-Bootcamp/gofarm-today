/**
 * Convert Unix timestamp to JavaScript
 * @param {Number} timestamp Unix timestamp
 * @returns JavaScript timestamp
 */
function toJsTimestamp(timestamp) {
    const jsTimestamp = timestamp * 1000
    return jsTimestamp
}

/**
 * Convert return value of getDay to corresponding name of day
 * @param {Number} value return value of getDay
 * @returns Name of day
 */
function toDayName(value) {
    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    const dayName = dayNames[value]
    return dayName
}

/**
 * Convert return value of getMonth to corresponding name of month
 * @param {Number} value return value of getMonth
 * @returns Name of month
 */
function toMonthName(value) {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    const monthName = monthNames[value]
    return monthName
}

/**
 * Convert a value to its corresponding moon phase name
 * @param {Number} value Moon phase value (0-1)
 * @returns Moon phase name
 */
function toMoonPhaseName(value) {
    if (value == 0 || value == 1) {
        return "New Moon"
    }

    if (value < 0.25) {
        return "Waxing Crescent"
    }

    if (value == 0.25) {
        return "First Quarter Moon"
    }

    if (value < 0.5) {
        return "Waxing Gibous"
    }

    if (value == 0.5) {
        return "Full Moon"
    }

    if (value < 0.75) {
        return "Waning Gibous"
    }

    if (value == 0.75) {
        return "Last Quarter Moon"
    }

    return "Waning Crescent"
}

/**
 * Converts a timestamp to human readable format
 * @param {Number} timestamp Timestamp
 * @returns Human readable date and time
 */
function toHumanReadableTime(timestamp) {
    const locales = []
    const options = {
        dateStyle: "medium",
        timeStyle: "medium"
    }
    const date = new Date(timestamp)
    const humanReadableTime = date.toLocaleString(locales, options)
    return humanReadableTime
}

export {
    toJsTimestamp,
    toDayName,
    toMonthName,
    toMoonPhaseName,
    toHumanReadableTime
}
