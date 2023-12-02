import { Farmer } from '@prisma/client';

export interface IUpdateFarmer {
  update(farmer: Farmer): Promise<boolean>;
}
