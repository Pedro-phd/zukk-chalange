import { useFarmerContext } from '@/aplication/context/FarmContext'
import CardChart from '@/presentation/components/CardChart'
import FarmerTable from '@/presentation/components/FarmerTable'
import Header from '@/presentation/components/Header'
import { Card, CardBody, Divider, Tab, Tabs } from '@nextui-org/react'
import { MapPin, Sprout, Trees } from 'lucide-react'

const Dashboard = () => {
  const { cultureData, soilUseData, statesData } = useFarmerContext()

  return (
    <>
      <Header />
      <Divider />
      <div className="p-4">
        <Tabs aria-label="Dynamic tabs">
          <Tab title="Dados Gerais">
            <Card className="bg-opacity-50">
              <CardBody>
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
                <div className="flex w-full p-4">
                  <CardChart
                    data={soilUseData}
                    title="Uso de solo"
                    icon={<Trees />}
                  />
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab title="Fazendeiros">
            <Card className="bg-opacity-50">
              <CardBody>
                <FarmerTable />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

export default Dashboard
