import { container } from 'tsyringe';

class CreateRentalController {
  async handle(request: Request, response: Response) {
    const createRentalUseCase = container.resolve();
  }
}

export { CreateRentalController };
