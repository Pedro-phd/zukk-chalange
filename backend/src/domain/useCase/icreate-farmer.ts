import { FarmerRequest } from '../model/farmer-request';

export interface ICreateFarmer {
  create(farmer: FarmerRequest): Promise<number>;
}
