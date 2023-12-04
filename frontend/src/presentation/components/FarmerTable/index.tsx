import { useFarmerContext } from '@/aplication/context/FarmContext'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  getKeyValue,
} from '@nextui-org/react'
import { PenSquare, Trash } from 'lucide-react'

const FarmerTable = () => {
  const { data, searchedUser } = useFarmerContext()
  const handleAction = (id: string) => console.log(id)

  const dataTable = data.map((d) => ({
    key: d.document,
    farmer: d.name,
    farmName: d.farmName,
    state: d.state,
    action: (
      <>
        <Tooltip content="Editar">
          <Button
            isIconOnly
            color="primary"
            variant="light"
            aria-label="edit farmer"
            size="sm"
            onClick={() => handleAction(d.document)}
          >
            <PenSquare size={16} />
          </Button>
        </Tooltip>
        <Tooltip content="Excluir">
          <Button
            isIconOnly
            color="danger"
            variant="light"
            aria-label="edit farmer"
            size="sm"
            onClick={() => handleAction(d.document)}
          >
            <Trash size={16} />
          </Button>
        </Tooltip>
      </>
    ),
  }))

  const filterData = dataTable.filter((d) => d.key === searchedUser)
  const hasFilter = searchedUser && filterData.length > 0
  const columns = [
    {
      key: 'farmer',
      label: 'Fazendeiro',
    },
    {
      key: 'farmName',
      label: 'Nome Fazenda',
    },
    {
      key: 'state',
      label: 'Estado',
    },
    {
      key: 'action',
      label: 'Ações',
    },
  ]

  return (
    <Table
      isCompact
      selectionMode="single"
      color="primary"
      className="table-edit bg-opacity-40"
      shadow="md"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={hasFilter ? filterData : dataTable}>
        {(item) => (
          <TableRow key={item?.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default FarmerTable
