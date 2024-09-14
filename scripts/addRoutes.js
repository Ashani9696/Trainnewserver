import mongoose from 'mongoose';
import Route from '../models/route.js'; // Adjust path as necessary

const routes = [

    {
        name: "Colombo Fort to Badulla",
        waypoints: [
          { name: "Colombo Fort", latitude:6.9355, longitude: 79.8506 },
          { name: "Kandy", latitude: 7.2906, longitude: 80.6337 },
          { name: "Nawalapitiya", latitude: 7.0489, longitude: 80.5267 },
          { name: "Hatton", latitude: 6.8946, longitude: 80.595 },
          { name: "Nanu Oya", latitude: 6.9686, longitude: 80.7692 },
          { name: "Ella", latitude: 6.8661, longitude: 81.0466 },
          { name: "Badulla", latitude: 6.9894, longitude: 81.0551 }
          
        ]
      },


  {
    name: "Colombo to Galle",
    waypoints: [
      { name: "Colombo Fort", latitude: 6.9355, longitude: 79.8506 },
      { name: "Panadura", latitude: 6.7138, longitude: 79.9076 },
      { name: "Kalutara", latitude: 6.5839, longitude: 79.9641 },
      { name: "Aluthgama", latitude: 6.4264, longitude: 79.9972 },
      { name: "Bentota", latitude: 6.4264, longitude: 79.9972 },
      { name: "Hikkaduwa", latitude: 6.1396, longitude: 80.1038 },
      { name: "Galle", latitude: 6.0392, longitude: 80.2170 },
      { name: "Matara", latitude: 5.9485, longitude: 80.5353 }
    ]
  },
  {
    name: "Colombo to Jaffna",
    waypoints: [
      { name: "Colombo Fort", latitude: 6.9355, longitude: 79.8506 },
      { name: "Polgahawela", latitude: 7.3356, longitude: 80.3008 },
      { name: "Anuradhapura", latitude: 8.3114, longitude: 80.4037 },
      { name: "Vavuniya", latitude: 8.7527, longitude: 80.4982 },
      { name: "Jaffna", latitude: 9.6615, longitude: 80.0255 },
      { name: "Kankesanthurai", latitude: 9.8191, longitude: 80.0394 }
    ]
  },
  {   
    name: "Anuradhapura to Medawachchiya",
    waypoints: [
      { name: "Anuradhapura", latitude: 8.3114, longitude: 80.4037 },
      { name: "Medawachchiya", latitude: 8.4537, longitude: 80.3782 }
    ]
  },
  {
    name: "Colombo Fort to Trincomalee",
    waypoints: [
      { name: "Colombo Fort", latitude: 6.9271, longitude: 79.9613 },
      { name: "Polgahawela", latitude: 7.3356, longitude: 80.3008 },
      { name: "Kantale", latitude: 8.0123, longitude: 81.3062 },
      { name: "Trincomalee", latitude: 8.5876, longitude: 81.2150 }
    ]
  },
  {
    name: "Kandy to Nuwara Eliya - Udarata Manike (Extended)",
    waypoints: [
      { name: "Kandy", latitude: 7.2906, longitude: 80.6337 },
      { name: "Peradeniya", latitude: 7.2714, longitude: 80.5955 },
      { name: "Gampola", latitude: 7.1644, longitude: 80.5705 },
      { name: "Nawalapitiya", latitude: 7.0546, longitude: 80.5184 },
      { name: "Hatton", latitude: 6.8976, longitude: 80.5992 },
      { name: "Talawakele", latitude: 6.9361, longitude: 80.6691 },
      { name: "Great Western", latitude: 6.9674, longitude: 80.6842 },
      { name: "Nanu Oya", latitude: 6.9366, longitude: 80.7477 },
      { name: "Nuwara Eliya", latitude: 6.9708, longitude: 80.7829 }
    ]
  },
  {
    name: "Colombo Fort to Polonnaruwa",
    waypoints: [
      { name: "Colombo Fort", latitude: 6.9271, longitude: 79.9613 },
      { name: "Kurunegala", latitude: 7.4823, longitude: 80.3553 },
      { name: "Habarana", latitude: 8.1464, longitude: 80.6312 },
      { name: "Polonnaruwa", latitude: 7.9490, longitude: 81.0130 }
    ]
  },
  {
    name: "Kandy to Matale",
    waypoints: [
      { name: "Kandy", latitude: 7.2906, longitude: 80.6337 },
      { name: "Peradeniya", latitude: 7.2714, longitude: 80.5955 },
      { name: "Mawanella", latitude: 7.3500, longitude: 80.6333 },
      { name: "Matale", latitude: 7.4770, longitude: 80.6333 }
    ]
  },
  {
    name: "Colombo Fort to Ratnapura",
    waypoints: [
      { name: "Colombo Fort", latitude: 6.9271, longitude: 79.9613 },
      { name: "Avissawella", latitude: 6.9111, longitude: 80.1875 },
      { name: "Hanwella", latitude: 6.8913, longitude: 80.0865 },
      { name: "Ratnapura", latitude: 6.6900, longitude: 80.3828 }
    ]
  },
  {
    name: "Colombo Fort to Batticaloa",
    waypoints: [
      { name: "Colombo Fort", latitude: 6.9271, longitude: 79.9613 },
      { name: "Polgahawela", latitude: 7.3356, longitude: 80.3008 },
      { name: "Kurunegala", latitude: 7.4823, longitude: 80.3553 },
      { name: "Anuradhapura", latitude: 8.3114, longitude: 80.4037 },
      { name: "Batticaloa", latitude: 7.7030, longitude: 81.6980 }
    ]
  },

];

const addRoutes = async () => {
  try {
    await mongoose.connect('mongodb+srv://ashani:ashani1234@cluster0.ns0yxcs.mongodb.net/trainTrackingSytem', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    await Route.insertMany(routes);
    console.log('Routes added successfully!');
  } catch (error) {
    console.error('Error adding routes:', error);
  } finally {
    await mongoose.disconnect();
  }
};

addRoutes();
