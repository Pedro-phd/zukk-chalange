import { IDeleteFarmer } from '@/domain/usecases/deleteFarmer'

export class DeleteFarmerSpy implements IDeleteFarmer {
  calls = 0
  async delete(id: number): Promise<boolean> {
    this.calls++
    return true
  }
}
