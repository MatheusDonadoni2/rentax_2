"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateCarUseCase_1 = require("@modules/cars//useCases/createCars/CreateCarUseCase");
const CarsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
let createCarUseCase;
let carsRepository;
describe('Create Car', () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase_1.CreateCarUseCase(carsRepository);
    });
    it('should be able to create a new car', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createCarUseCase.execute({
            name: 'Name Car',
            description: 'Description',
            daily_rate: 100,
            license_plate: 'abc-1234',
            fine_amount: 100,
            brand: 'Brand',
            category_id: '1',
        });
    }));
    it('should not be able to create a car with exists license plate', () => {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createCarUseCase.execute({
                name: 'Name Car 1',
                description: 'Description',
                daily_rate: 100,
                license_plate: 'abc-1234',
                fine_amount: 100,
                brand: 'Brand',
                category_id: '1',
            });
            yield createCarUseCase.execute({
                name: 'Name Car 2',
                description: 'Description',
                daily_rate: 100,
                license_plate: 'abc-1234',
                fine_amount: 100,
                brand: 'Brand',
                category_id: '1',
            });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able to create a car with avaible tru by default', () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield createCarUseCase.execute({
            name: 'Name Car Avaiable',
            description: 'Description',
            daily_rate: 100,
            license_plate: 'xxx-1212',
            fine_amount: 100,
            brand: 'Brand',
            category_id: '1',
        });
        expect(car.available).toBe(true);
    }));
});
