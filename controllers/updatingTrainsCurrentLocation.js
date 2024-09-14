import Train from '../models/train.js'; 
import LocationHistory from '../models/LocationHistory.js'; 
import { getDistance, interpolate } from '../utils/geometry.js'; 
import Route from '../models/route.js'; // Import the Route model

const updateTrainLocation = async (routeName, engineId) => {
  try {
    const route = await Route.findOne({ name: routeName });
    if (!route) {
      console.error(`Route "${routeName}" not found.`);
      return;
    }
    const waypointsList = route.waypoints;

    let curIndex = 0;
    let startPoint = waypointsList[curIndex];
    let endPoint = waypointsList[(curIndex + 1) % waypointsList.length];
    let progress = 0;
    let forward = true;

    const updateLocation = async () => {
      try {
        const { latitude, longitude } = interpolate(startPoint, endPoint, progress);
        const timestamp = new Date();

        // Update the Train document
        await Train.findOneAndUpdate(
          { engineId },
          { 
            currentLocation: { latitude, longitude },
            timestamp,
            path: waypointsList 
          }
        );

        // Update or create the LocationHistory document
        await LocationHistory.findOneAndUpdate(
          { engineId },
          {
            $push: {
              travelHistory: {
                timestamp,
                location: `Lat: ${latitude}, Lng: ${longitude}`,
                latitude,
                longitude
              }
            }
          },
          { upsert: true } 
        );

        console.log(`Train ${engineId} current location updated to Lat: ${latitude}, Lng: ${longitude}`);

        progress += 0.01;

        if (progress >= 1) {
          if (forward) {
            curIndex++;
            if (curIndex >= waypointsList.length - 1) {
              forward = false;
            }
          } else {
            curIndex--;
            if (curIndex <= 0) {
              forward = true;
            }
          }

          startPoint = waypointsList[curIndex];
          endPoint = forward ? waypointsList[curIndex + 1] : waypointsList[curIndex - 1];
          progress = 0;
        }
      } catch (error) {
        console.error('Error updating location:', error);
      }
    };

    await updateLocation();
    setInterval(updateLocation, 1000);
    console.log(`Data generator for ${routeName} is started`);
  } catch (error) {
    console.error('Error initializing train location update:', error);
  }
};


// Define functions for specific routes
export const updateLocation1 = () => updateTrainLocation("Colombo Fort to Badulla", 'T001');
export const updateLocation2 = () => updateTrainLocation("Colombo to Galle", 'T002');
export const updateLocation3 = () => updateTrainLocation("Colombo to Jaffna", 'T003');
export const updateLocation4 = () => updateTrainLocation("Anuradhapura to Medawachchiya", 'T004');
export const updateLocation5 = () => updateTrainLocation("Colombo Fort to Trincomalee", 'T005');
export const updateLocation6 = () => updateTrainLocation("Kandy to Nuwara Eliya - Udarata Manike (Extended)", 'T006');
export const updateLocation7 = () => updateTrainLocation("Colombo Fort to Polonnaruwa", 'T007');
export const updateLocation8 = () => updateTrainLocation("Kandy to Matale", 'T008');
export const updateLocation9 = () => updateTrainLocation("Colombo Fort to Ratnapura", 'T009');
export const updateLocation10 = () => updateTrainLocation("Colombo Fort to Batticaloa", 'T010');
