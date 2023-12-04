import { Crops, IFarmer } from '@/domain/models/farmer'
import { FarmerMock } from '@/mock'
import { createContext, useContext, useState } from 'react'

export interface IData {
  id: string
  label: string | Crops
  value: number
}

interface IContext {
  mock: IFarmer[]
  data: IFarmer[]
  totalFarm: number
  totalHectares: number
  statesData: IData[]
  cultureData: IData[]
  soilUseData: IData[]
  searchedUser: string | undefined
  setSearchedUser: (data: any) => void
}

const FarmContext = createContext({} as IContext)

export function FarmProvider({ children }: any) {
  const [searchedUser, setSearchedUser] = useState<string>()

  const mock = FarmerMock
  const data = searchedUser
    ? mock.filter((farm) => farm.document === searchedUser)
    : mock
  const totalFarm = data.length
  const totalHectares = data.reduce((acc, crr) => acc + crr.agriculturalArea, 0)
  const soilUseData = data.map((farm) => ({
    id: farm.document,
    label: farm.name,
    value:
      ((farm.agriculturalArea + farm.vegetationArea) / farm.totalArea) * 100,
  }))

  const stateRaw: Record<string, number> = {}
  const cropsRaw: Record<string, number> = {}
  data.forEach((farm) => {
    const state = farm.state
    stateRaw[state] = (stateRaw[state] || 0) + 1
    farm.plantedCrops.forEach((crops) => {
      cropsRaw[crops] = (cropsRaw[crops] || 0) + 1
    })
  })
  const statesData = Object.keys(stateRaw).map((e) => ({
    id: e,
    label: e,
    value: stateRaw[e],
  }))
  const cultureData = Object.keys(cropsRaw).map((e) => ({
    id: e,
    label: e,
    value: cropsRaw[e],
  }))

  return (
    <FarmContext.Provider
      value={{
        mock,
        totalFarm,
        totalHectares,
        statesData,
        cultureData,
        soilUseData,
        data,
        searchedUser,
        setSearchedUser,
      }}
    >
      {children}
    </FarmContext.Provider>
  )
}

export default FarmContext

export function useFarmerContext() {
  const context = useContext(FarmContext)
  return context
}
