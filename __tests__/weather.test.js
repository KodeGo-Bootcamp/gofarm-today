import {
    toJsTimestamp,
    toDayName,
    toMonthName
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
