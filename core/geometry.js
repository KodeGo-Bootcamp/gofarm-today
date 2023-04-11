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

/**
 * Perform Andrew's monotone chain convex hull algorithm
 * @param {[[Number, Number]]} coords Array of coordinates
 * @returns Convex hull array of coordinates
 */
function computeConvexHull(coords) {
    /**
     * Get the cross product of 3 coordinates
     * @param {[Number, Number]} coord1 x and y component of 1st coordinate
     * @param {[Number, Number]} coord2 x and y component of 2nd coordinate
     * @param {[Number, Number]} origin x and y component of origin
     * @returns Cross product
     */
    const computeCrossProduct = (coord1, coord2, origin) => {
        const product = (coord1[0] - origin[0]) * (coord2[1] - origin[1]) - (coord1[1] - origin[1]) * (coord2[0] - origin[0])
        return product
    }

    let coordsDeepClone = JSON.parse(JSON.stringify(coords))
    coordsDeepClone.sort((a, b) => {
        const a0 = Math.abs(a[0])
        const a1 = Math.abs(a[1])
        const b0 = Math.abs(b[0])
        const b1 = Math.abs(b[1])
        if (a0 == b0) {
            return a1 - b1
        }
        return a0 - b0
    })

    let lowerBound = []
    for (let idx = 0; idx < coordsDeepClone.length; idx++) {
        while (lowerBound.length >= 2) {
            const crossProduct = computeCrossProduct(
                lowerBound[lowerBound.length - 2],
                lowerBound[lowerBound.length - 1],
                coordsDeepClone[idx]
            )
            if (crossProduct > 0) {
                break
            }
            lowerBound.pop()
        }
        lowerBound.push(coordsDeepClone[idx])
    }

    let upperBound = []
    for (let idx = coordsDeepClone.length - 1; idx >= 0; idx--) {
        while (upperBound.length >= 2) {
            const crossProduct = computeCrossProduct(
                upperBound[upperBound.length - 2],
                upperBound[upperBound.length - 1],
                coordsDeepClone[idx]
            )
            if (crossProduct > 0) {
                break
            }
            upperBound.pop()
        }
        upperBound.push(coordsDeepClone[idx])
    }

    lowerBound.pop()
    upperBound.pop()
    const convexHullCoords = lowerBound.concat(upperBound)
    return convexHullCoords
}

export {
    toRadian,
    computeOppositeSideLength,
    toCartesianCoordinate,
    computeLineSegmentLength,
    computeConvexHull
}
