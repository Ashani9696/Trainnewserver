import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  name: String, 
  waypoints: [
    {
      name: String,
      latitude: Number,
      longitude: Number
    }
  ]
});

const Route = mongoose.models.Route || mongoose.model('Route', routeSchema);

export default Route;