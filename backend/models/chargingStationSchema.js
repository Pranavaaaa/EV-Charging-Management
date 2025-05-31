import mongoose from 'mongoose';

const chargingStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  powerOutput: {
    type: Number, // in kW
    required: true
  },
  connectorType: {
    type: String,
    enum: ['Type 1', 'Type 2', 'CCS', 'CHAdeMO', 'Other'],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const ChargingStation = mongoose.model('ChargingStation', chargingStationSchema);
export default ChargingStation;
