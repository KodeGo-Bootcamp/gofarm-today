import {
    toJsTimestamp,
    toDayName,
    toMonthName,
    toMoonPhaseName,
    toHumanReadableTime
} from '../core/weather'

test('toJsTimestamp', () => {
    expect(toJsTimestamp(0)).toBe(0)
    expect(toJsTimestamp(1)).toBe(1000)
})

test('toDayName', () => {
    expect(toDayName(0)).toBe("Sunday")
    expect(toDayName(6)).toBe("Saturday")
})

test('toMonthName', () => {
    expect(toMonthName(0)).toBe("January")
    expect(toMonthName(11)).toBe("December")
})

test('toMoonPhaseName', () => {
    expect(toMoonPhaseName(0)).toBe("New Moon")
    expect(toMoonPhaseName(0.1)).toBe("Waxing Crescent")
    expect(toMoonPhaseName(0.25)).toBe("First Quarter Moon")
    expect(toMoonPhaseName(0.4)).toBe("Waxing Gibous")
    expect(toMoonPhaseName(0.5)).toBe("Full Moon")
    expect(toMoonPhaseName(0.6)).toBe("Waning Gibous")
    expect(toMoonPhaseName(0.75)).toBe("Last Quarter Moon")
    expect(toMoonPhaseName(0.9)).toBe("Waning Crescent")
    expect(toMoonPhaseName(1)).toBe("New Moon")
})

test('toHumanReadableTime', () => {
    expect(toHumanReadableTime(1681406353000)).toBe("Apr 13, 2023, 5:19:13 PM")
})
