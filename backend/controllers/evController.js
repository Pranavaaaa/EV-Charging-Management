import { validationResult } from 'express-validator';
import evServices from '../services/evService.js';

const createChargingStation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      latitude,
      longitude,
      powerOutput,
      connectorType,
      status = 'Active'
    } = req.body;

    const { _id: userId } = req.user;

    const station = await evServices.createChargingStation({
      name,
      latitude,
      longitude,
      powerOutput,
      connectorType,
      status,
      userId
    });

    res.status(201).json({
      success: true,
      message: 'Charging station created successfully',
      data: station
    });
  } catch (error) {
    next(error);
  }
};

const getAllStations = async (req, res, next) => {
  try {
    const { status, connectorType } = req.query;
    const { _id: userId } = req.user; // Get logged in user's ID

    const filter = {
      userId: userId // Filter by logged in user
    };
    
    // Add additional filters if provided
    if (status) filter.status = status;
    if (connectorType) filter.connectorType = connectorType;

    const stations = await evServices.getAllStations({ filter });

    res.status(200).json({
      success: true,
      count: stations.length,
      data: stations
    });
  } catch (error) {
    next(error);
  }
};

const updateStation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;

    const station = await evServices.getStationById(id);
    
    // Compare strings
    if (station.userId !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this station'
      });
    }

    const updatedStation = await evServices.updateStation(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Station updated successfully',
      data: updatedStation
    });
  } catch (error) {
    console.error('Update error:', error);
    next(error);
  }
};

const deleteStation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;

    const station = await evServices.getStationById(id);
    
    // Check if user owns the station
    if (station.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this station'
      });
    }

    await evServices.deleteStation(id);

    res.status(200).json({
      success: true,
      message: 'Station deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createChargingStation,
  getAllStations,
  updateStation,
  deleteStation
};