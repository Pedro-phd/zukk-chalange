import { Farmer } from '@prisma/client';

export interface IGetAllFarmer {
  get(): Promise<Farmer[]>;
}
