import { request, Request, Response } from 'express';

class UpdateUserAvatarController {
  async handle(reques: Request, response: Response) {
    const { id } = request.user;
  }
}

export { UpdateUserAvatarController };
