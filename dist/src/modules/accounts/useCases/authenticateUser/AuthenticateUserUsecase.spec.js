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
const AppError_1 = require("@shared/errors/AppError");
const UsersRespositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRespositoryInMemory");
const CreateUserUseCase_1 = require("@modules/accounts/useCases/createUser/CreateUserUseCase");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
let authenticateUserUseCase;
let userRepositoryInMemory;
let createUserUseCase;
describe('Authenticate User', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UsersRespositoryInMemory_1.UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(userRepositoryInMemory);
    });
    it('should be able to authenticate an user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_license: '001234',
            email: 'email@teste.com',
            password: '12345',
            name: 'Name User',
        };
        yield createUserUseCase.execute(user);
        const result = yield authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty('token');
    }));
    it('should not be able to authenticate an nonexistent user', () => {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield authenticateUserUseCase.execute({
                email: 'false@email',
                password: '12345',
            });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able to authenticate with incorrect password', () => {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                driver_license: '1231241',
                email: 'anotherUserIncorrect@4121.com',
                password: 'password fail',
                name: 'User fail authenticate',
            };
            yield createUserUseCase.execute(user);
            yield authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectpassword',
            });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
});
