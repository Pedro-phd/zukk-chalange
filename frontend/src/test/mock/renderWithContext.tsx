import { FarmProvider, IContext } from '@/aplication/context/FarmContext'
import { IFarmer } from '@/domain/models/farmer'

const renderWithContext = (component: React.JSX.Element, mock?: IContext) => {
  const mockFarmer: IFarmer = {
    id: 0,
    name: 'any_name',
    document: '000.000.000-00',
    farmName: 'any_farmName',
    state: 'any_state',
    city: 'any_city',
    totalArea: 100,
    agriculturalArea: 10,
    vegetationArea: 10,
    plantedCrops: ['coffee', 'corn', 'cotton', 'sugar_cane'],
  }

  const mockDefault = {
    data: mockFarmer,
  }

  return <FarmProvider value={mock ?? mockDefault}>{component}</FarmProvider>
}

export default renderWithContext
