import ChargingStation from '../models/chargingStationSchema.js';
import mongoose from 'mongoose';

const createChargingStation = async (stationData) => {
  try {
    const station = await ChargingStation.create(stationData);
    return station;
  } catch (error) {
    throw new Error(`Error creating charging station: ${error.message}`);
  }
};

const getAllStations = async ({ filter = {} }) => {
  try {
    const stations = await ChargingStation.find(filter)
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean();
      
    return stations;
  } catch (error) {
    throw new Error(`Error fetching stations: ${error.message}`);
  }
};


const updateStation = async (stationId, updateData) => {
  try {
    const station = await ChargingStation.findByIdAndUpdate(
      stationId,
      updateData,
      { new: true, runValidators: true }
    ).populate('userId', 'fullName email');

    if (!station) {
      throw new Error('Station not found');
    }

    return station;
  } catch (error) {
    throw new Error(`Error updating station: ${error.message}`);
  }
};

const deleteStation = async (stationId) => {
  try {
    const station = await ChargingStation.findByIdAndDelete(stationId);
    
    if (!station) {
      throw new Error('Station not found');
    }

    return station;
  } catch (error) {
    throw new Error(`Error deleting station: ${error.message}`);
  }
};

const getStationById = async (stationId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(stationId)) {
      throw new Error('Invalid station ID');
    }

    const station = await ChargingStation.findById(stationId)
      .populate('userId', 'fullName email')
      .lean();

    if (!station) {
      throw new Error('Station not found');
    }

    // Convert ObjectId to string
    station.userId = station.userId._id.toString();
    return station;
  } catch (error) {
    throw new Error(`Error fetching station: ${error.message}`);
  }
};

export default {
  createChargingStation,
  getAllStations,
  updateStation,
  deleteStation,
  getStationById
};