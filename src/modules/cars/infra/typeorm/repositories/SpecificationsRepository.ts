import { getRepository, Repository } from "typeorm";

import { ICreateSpecificationsDTO } from "@modules/cars/dtos/ICreateSpecificationsDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specifications";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationsDTO): Promise<void> {
    const specifications = this.repository.create({ name, description });

    await this.repository.save(specifications);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}

export { SpecificationsRepository };
