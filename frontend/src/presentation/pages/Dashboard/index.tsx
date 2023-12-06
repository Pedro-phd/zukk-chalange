import { useFarmerContext } from '@/aplication/context/FarmContext'
import { ICreateFarmer } from '@/domain/usecases/createFarmer'
import { IDeleteFarmer } from '@/domain/usecases/deleteFarmer'
import { IGetAllFarmer } from '@/domain/usecases/getAllFarmer'
import { IUpdateFarmer } from '@/domain/usecases/updateFarmer'
import CardChart from '@/presentation/components/CardChart'
import FarmerTable from '@/presentation/components/FarmerTable'
import Header from '@/presentation/components/Header'
import { Card, CardBody, Divider, Spinner, Tab, Tabs } from '@nextui-org/react'
import { MapPin, Sprout, Trees } from 'lucide-react'
import { useEffect } from 'react'

interface IDashboard {
  getAll: IGetAllFarmer
  createFarmer: ICreateFarmer
  updateFarmer: IUpdateFarmer
  deleteFarmer: IDeleteFarmer
}

const Dashboard = ({
  getAll,
  createFarmer,
  updateFarmer,
  deleteFarmer,
}: IDashboard) => {
  const {
    cultureData,
    soilUseData,
    statesData,
    setFarmerData,
    setFarmerLoading,
    farmerLoading,
  } = useFarmerContext()
  useEffect(() => {
    setFarmerLoading(true)
    getAll
      .get()
      .then((res) => setFarmerData(res))
      .catch((err) => console.error(err))
      .finally(() => setFarmerLoading(false))
  }, [])

  return (
    <>
      <Header createFarmer={createFarmer} />
      <Divider />
      <div className="p-4">
        <Tabs aria-label="Dynamic tabs" isDisabled={farmerLoading}>
          <Tab title="Dados Gerais">
            <Card className="bg-opacity-50">
              <CardBody>
                {farmerLoading && (
                  <Spinner
                    label="Carregando dados ..."
                    color="primary"
                    labelColor="primary"
                  />
                )}
                {!farmerLoading && (
                  <div className="flex w-full gap-4 p-4 flex-col lg:flex-row">
                    <CardChart
                      data={cultureData}
                      title="Cultura"
                      icon={<Sprout />}
                    />
                    <CardChart
                      data={statesData}
                      title="Estado"
                      icon={<MapPin />}
                    />
                  </div>
                )}
                {!farmerLoading && (
                  <div className="flex w-full p-4">
                    <CardChart
                      data={soilUseData}
                      title="Uso de solo"
                      icon={<Trees />}
                    />
                  </div>
                )}
              </CardBody>
            </Card>
          </Tab>
          <Tab title="Fazendeiros">
            <Card className="bg-opacity-50">
              <CardBody>
                <FarmerTable
                  updateFarmer={updateFarmer}
                  deleteFarmer={deleteFarmer}
                />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

export default Dashboard
