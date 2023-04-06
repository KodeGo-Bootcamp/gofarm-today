import {
    toRadian,
    computeOppositeSideLength,
    toCartesianCoordinate,
    computeLineSegmentLength,
    computeConvexHull
} from '../core/geometry'

test('toRadian', () => {
    expect(toRadian(-1)).toBeCloseTo(-0.0174533)
    expect(toRadian(0)).toBeCloseTo(0)
    expect(toRadian(1)).toBeCloseTo(0.0174533)
})

test('computeOppositeSideLength', () => {
    expect(computeOppositeSideLength(45, 1)).toBeCloseTo(1)
    expect(computeOppositeSideLength(72, 61)).toBeCloseTo(187.7386958)
})

test('toCartesianCoordinate', () => {
    expect(toCartesianCoordinate(5, 60)[0]).toBeCloseTo(2.5)
    expect(toCartesianCoordinate(5, 60)[1]).toBeCloseTo(4.33)
})

test('computeLineSegmentLength', () => {
    expect(computeLineSegmentLength([2, 3], [-1, 4])).toBeCloseTo(3.16228)
})

test('computeConvexHull', () => {
    let inArr = [[1, 1], [2, 1], [1, 2], [2, 2]]
    let outArr = [[1, 1], [2, 1], [2, 2], [1, 2]]
    expect(computeConvexHull(inArr)).toEqual(outArr)

    inArr = [[-2, 3], [-1, 2], [-3, 5], [-3, 6], [5, -1], [6, -1]]
    outArr = [[-1, 2], [5, -1], [6, -1], [-3, 6], [-3, 5], [-2, 3]]
    expect(computeConvexHull(inArr)).toEqual(outArr)

    inArr = [[1, 4], [4, 9], [1, 10], [2, 10], [2, 5]]
    outArr = [[1, 4], [2, 5], [4, 9], [2, 10], [1, 10]]
    expect(computeConvexHull(inArr)).toEqual(outArr)
})
