/**
 * Convert an angle in degree to radian
 * @param {Number} theta Angle in degree
 * @returns Angle in radian
 */
function toRadian(theta) {
    const radian = theta * Math.PI / 180
    return radian
}

/**
 * Get the opposite side length of an angle using adjacent side of a right triangle.
 * @param {Number} theta Angle in degree
 * @param {Number} side Adjacent side length
 * @returns {Number} Opposite side length
 */
function computeOppositeSideLength(theta, side) {
    const thetaInRadian = toRadian(theta)
    const oppositeSideLength = side * Math.tan(thetaInRadian)
    return oppositeSideLength
}

