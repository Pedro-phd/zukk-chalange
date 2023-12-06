import { useFarmerContext } from '@/aplication/context/FarmContext'
import { IUpdateFarmer } from '@/domain/usecases/updateFarmer'
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
import ModalEdit from '../ModalEdit'
import { useState } from 'react'
import { IFarmer } from '@/domain/models/farmer'
import { IDeleteFarmer } from '@/domain/usecases/deleteFarmer'
import ModalRemove from '../ModalRemove'

interface IFarmerTableProps {
  updateFarmer: IUpdateFarmer
  deleteFarmer: IDeleteFarmer
}

const FarmerTable = ({ updateFarmer, deleteFarmer }: IFarmerTableProps) => {
  const { data, searchedUser } = useFarmerContext()
  const [open, setOpen] = useState(false)
  const [openRemove, setOpenRemove] = useState(false)
  const [editUser, setEditUser] = useState<IFarmer>()
  const [idRemove, setIdRemove] = useState<number>()

  const handleActionEdit = (doc: string) => {
    setOpen(true)
    const editData = data.find((farmer) => farmer.document === doc)
    setEditUser(editData)
  }

  const handleActionRemove = (id: number) => {
    setOpenRemove(true)
    setIdRemove(id)
  }

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
            onClick={() => handleActionEdit(d.document)}
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
            onClick={() => handleActionRemove(d.id)}
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
    <>
      <Table
        isCompact
        selectionMode="single"
        color="primary"
        className="table-edit bg-opacity-40"
        shadow="md"
        data-testid="farm-table"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={hasFilter ? filterData : dataTable}>
          {(item) => (
            <TableRow key={item?.key} data-testid="table-row">
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {editUser && (
        <ModalEdit
          updateFarmer={updateFarmer}
          editData={editUser}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
      {idRemove && (
        <ModalRemove
          deleteFarmer={deleteFarmer}
          open={openRemove}
          onClose={() => setOpenRemove(false)}
          idToRemove={idRemove}
        />
      )}
    </>
  )
}

export default FarmerTable
