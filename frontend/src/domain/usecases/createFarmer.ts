import { IFarmer } from '../models/farmer'

export interface ICreateFarmer {
  create(farmer: IFarmer): Promise<{ id: number }>
}
