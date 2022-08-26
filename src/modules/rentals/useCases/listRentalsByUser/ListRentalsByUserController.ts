import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListRentalByUserUseCase } from './ListRentalsByUserUseCase';

class ListRentalByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listRentalsByUserCase = container.resolve(ListRentalByUserUseCase);
    const rentals = await listRentalsByUserCase.execute(id);
    return response.json(rentals);
  }
}

export { ListRentalByUserController };
