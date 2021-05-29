import { getRepository, Repository } from "typeorm";

import { ICreateSpecificationsDTO } from "../../dtos/ICreateSpecificationsDTO";
import { Specification } from "../../entities/Specifications";
import { ISpecificationsRepository } from "../ISpecificationsRepository";

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
