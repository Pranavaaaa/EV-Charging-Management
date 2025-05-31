import express from "express";
import { body } from 'express-validator';
import evController from '../controllers/evController.js';
import { authUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Validation middleware
const validateStation = [
  body('name').notEmpty().withMessage('Station name is required'),
  body('latitude').isFloat().withMessage('Valid latitude is required'),
  body('longitude').isFloat().withMessage('Valid longitude is required'),
  body('powerOutput').isFloat().withMessage('Power output is required'),
  body('connectorType')
    .isIn(['Type 1', 'Type 2', 'CCS', 'CHAdeMO', 'Other'])
    .withMessage('Invalid connector type')
];

// CRUD Routes
router.post('/stations', authUser, validateStation, evController.createChargingStation);
router.get('/stations', authUser, evController.getAllStations); // Added authUser middleware
router.put('/stations/:id', authUser, validateStation, evController.updateStation);
router.delete('/stations/:id', authUser, evController.deleteStation);
router.get('/stations/:id', authUser, evController.getStationById);

export default router;
