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
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const UsersRepository_1 = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");
const AppError_1 = require("@shared/errors/AppError");
function ensureAuthenticated(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new AppError_1.AppError('Token missing.', 401);
        }
        const [, token] = authHeader.split(' ');
        try {
            const { sub: user_id } = (0, jsonwebtoken_1.verify)(token, 'daskldhjaskl123j12o3j12p31po');
            const usersRepository = new UsersRepository_1.UsersRepository();
            const user = usersRepository.findById(user_id);
            if (!user) {
                throw new AppError_1.AppError('User does not exists.', 401);
            }
            request.user = {
                id: user_id,
            };
            next();
        }
        catch (_a) {
            throw new AppError_1.AppError('Invald token.', 401);
        }
    });
}
exports.ensureAuthenticated = ensureAuthenticated;
