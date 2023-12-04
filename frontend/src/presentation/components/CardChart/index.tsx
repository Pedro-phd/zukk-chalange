import React, { ReactNode, useEffect, useRef, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Checkbox,
} from '@nextui-org/react'
import { IData } from '@/aplication/context/FarmContext'
import PieChartCustom from '../PieChart'
import { Eye } from 'lucide-react'

interface ICardProps {
  title: string
  icon: ReactNode
  data: IData[]
}

const CardChart = ({ title, icon, data }: ICardProps) => {
  const [hiddenLabel, setHiddenLabel] = useState(false)
  const [offsetChart, setOffsetChart] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const chartMiddle = ref?.current?.offsetWidth / 2
      console.log('-->', ref?.current?.offsetWidth)
      setOffsetChart(chartMiddle)
    }
  }, [])

  return (
    <Card className="py-4 w-full bg-opacity-40" shadow="md">
      <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-center justify-between mb-4 gap-2 md:flex-row">
        <div className="flex gap-2 items-center">
          {icon}
          <h4 className="font-bold text-large">{title}</h4>
        </div>
        <Checkbox
          isSelected={hiddenLabel}
          onValueChange={setHiddenLabel}
          icon={<Eye />}
          className="text-right"
        >
          Esconder Legenda
        </Checkbox>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible py-2">
        <div ref={ref}>
          <PieChartCustom
            data={data}
            hiddenLabel={hiddenLabel}
            middle={offsetChart}
          />
        </div>
      </CardBody>
    </Card>
  )
}

export default CardChart
