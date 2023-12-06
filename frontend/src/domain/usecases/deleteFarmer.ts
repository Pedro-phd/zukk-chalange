export interface IDeleteFarmer {
  delete(id: number): Promise<boolean>
}
