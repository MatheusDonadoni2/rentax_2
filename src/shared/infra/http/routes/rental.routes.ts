import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRantalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

rentalRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalByUserController.handle,
);

export { rentalRoutes };
