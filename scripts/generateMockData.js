// scripts/generateMockData.js
import Route from '../models/route.js';

export const getRouteWaypoints = async (routeName) => {
  try {
    const route = await Route.findOne({ name: routeName });
    return route ? route.waypoints : [];
  } catch (error) {
    console.error('Error fetching route waypoints:', error);
    return [];
  }
};
