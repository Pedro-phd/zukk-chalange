import { IFarmer } from '../models/farmer'

export interface IUpdateFarmer {
  update(data: IFarmer): Promise<boolean>
}
