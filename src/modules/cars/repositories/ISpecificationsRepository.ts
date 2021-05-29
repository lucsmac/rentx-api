import { ICreateSpecificationsDTO } from "../dtos/ICreateSpecificationsDTO";
import { Specification } from "../entities/Specifications";

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationsDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository };
