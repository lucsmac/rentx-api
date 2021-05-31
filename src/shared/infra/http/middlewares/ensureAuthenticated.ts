import { NextFunction, Request, Response } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
// eslint-disable-next-line import/no-extraneous-dependencies

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      "3af9acebff4cd77891a0baf0aa712db4"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);
    if (!user) throw new AppError("User doesn't not exist", 401);

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}
