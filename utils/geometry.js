// utils/geometry.js

/**
 * Calculate distance between two points in meters
 * @param {Object} point1 - { latitude, longitude }
 * @param {Object} point2 - { latitude, longitude }
 * @returns {number} Distance in meters
 */
export const getDistance = (point1, point2) => {
  const R = 6371000; // Radius of the Earth in meters
  const φ1 = (point1.latitude * Math.PI) / 180;
  const φ2 = (point2.latitude * Math.PI) / 180;
  const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180;
  const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
* Interpolate between two points
* @param {Object} startPoint - { latitude, longitude }
* @param {Object} endPoint - { latitude, longitude }
* @param {number} progress - Progress between 0 and 1
* @returns {Object} Interpolated point { latitude, longitude }
*/
export const interpolate = (startPoint, endPoint, progress) => {
  const latitude = startPoint.latitude + (endPoint.latitude - startPoint.latitude) * progress;
  const longitude = startPoint.longitude + (endPoint.longitude - startPoint.longitude) * progress;
  return { latitude, longitude };
};
