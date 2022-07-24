"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsRoutes = void 0;
const CreateCarControoller_1 = require("@modules/cars/useCases/createCars/CreateCarControoller");
const express_1 = require("express");
const carsRoutes = (0, express_1.Router)();
exports.carsRoutes = carsRoutes;
const createCarController = new CreateCarControoller_1.CreateCarController();
carsRoutes.post('/', createCarController.handle);
