import { IFarmer } from '../models/farmer'

export interface IGetAllFarmer {
  get(): Promise<IFarmer[]>
}
