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

/**
 * Convert polar coordinate to Cartesian coordinate
 * @param {Number} distance Distance from origin
 * @param {Number} azimuth Angular coordinate in degree
 * @returns {[Number, Number]} x and y component
 */
function toCartesianCoordinate(distance, azimuth) {
    const thetaInRadian = toRadian(azimuth)
    const x = distance * Math.cos(thetaInRadian)
    const y = distance * Math.sin(thetaInRadian)
    return [x, y]
}

/**
 * Get the line segment length of 1st and 2nd coordinaate
 * @param {[Number, Number]} coord1 x and y component of 1st coordinate
 * @param {[Number, Number]} coord2 x and y component of 2nd coordinate
 * @returns Length of line segment
 */
function computeLineSegmentLength(coord1, coord2) {
    const length = Math.sqrt((coord2[0] - coord1[0]) ** 2 + (coord2[1] - coord1[1]) ** 2)
    return length
}

