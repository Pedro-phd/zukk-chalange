import { Farmer } from '@prisma/client';

export interface IGetIdFarmer {
  get(id: number): Promise<Farmer>;
}
