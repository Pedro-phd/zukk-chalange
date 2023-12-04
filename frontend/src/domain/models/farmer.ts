export type Crops = 'corn' | 'coffee' | 'cotton' | 'sugar_cane'
export interface IFarmer {
  name: string
  farmName: string
  document: string
  city: string
  state: string
  totalArea: number
  agriculturalArea: number
  vegetationArea: number
  plantedCrops: Crops[]
}
