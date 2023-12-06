import { IData } from '@/aplication/context/FarmContext'
import { PieChart } from '@mui/x-charts'
import { mangoFusionPaletteDark } from '@mui/x-charts/colorPalettes'

const PieChartCustom = ({
  data,
  hiddenLabel,
  middle,
}: {
  data: IData[]
  hiddenLabel: boolean
  middle: number
}) => {
  return (
    <PieChart
      colors={mangoFusionPaletteDark}
      className="dark"
      series={[
        {
          data,
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30 },
          cx: middle - 10,
        },
      ]}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'left' },
          padding: 0,
          hidden: hiddenLabel,
        },
      }}
      height={400}
    />
  )
}

export default PieChartCustom
