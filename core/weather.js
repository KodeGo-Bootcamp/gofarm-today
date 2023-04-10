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

