"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("@shared/infra/typeorm");
require("@shared/container");
const AppError_1 = require("@shared/errors/AppError");
const routes_1 = require("@shared/infra/http/routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.router);
app.use((err, request, response, next) => {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`,
    });
});
app.listen(3333, () => console.log('Server is running in port 3333'));
