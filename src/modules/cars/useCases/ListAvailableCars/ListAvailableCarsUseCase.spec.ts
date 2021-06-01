import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Cart 01",
      description: "Car test",
      daily_rate: 90,
      license_plate: "ABC-1234",
      fine_amount: 800,
      brand: "Testa",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Cart 02",
      description: "Car test",
      daily_rate: 90,
      license_plate: "ABC-1234",
      fine_amount: 800,
      brand: "Testa",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: car.name,
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Cart 02",
      description: "Car test",
      daily_rate: 90,
      license_plate: "ABC-1234",
      fine_amount: 800,
      brand: "Testa",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: car.brand,
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Cart 02",
      description: "Car test",
      daily_rate: 90,
      license_plate: "ABC-1234",
      fine_amount: 800,
      brand: "Testa",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars).toEqual([car]);
  });
});
