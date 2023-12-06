import { IFarmer } from '@/domain/models/farmer'
import { IUpdateFarmer } from '@/domain/usecases/updateFarmer'

export class UpdateFarmerSpy implements IUpdateFarmer {
  calls = 0
  async update(data: IFarmer): Promise<boolean> {
    this.calls++
    return true
  }
}
