import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  async handle(request: Request, responset: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-acess-token'] ||
      request.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refresh_token = await refreshTokenUseCase.execute(token);

    return responset.json(refresh_token);
  }
}
export { RefreshTokenController };
