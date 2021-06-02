import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositores/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const minRentalHours = 24;

    const carUnvailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );
    if (carUnvailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenedToUser =
      await this.rentalsRepository.findOpenRentalByUser(user_id);
    if (rentalOpenedToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();
    const dateNow = dayjs().utc().local().format();
    const compareDate = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

    if (compareDate < minRentalHours) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
