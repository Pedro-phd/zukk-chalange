import { Farmer } from '@prisma/client';
import { IBaseRepository } from './ibase-repository';
import { FarmerRequest } from '../model/farmer-request';

export interface IFarmerRepository
  extends IBaseRepository<Farmer, FarmerRequest> {
  getDocument(document: string): Promise<Farmer>;
}
