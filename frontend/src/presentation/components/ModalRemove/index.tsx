import { IDeleteFarmer } from '@/domain/usecases/deleteFarmer'
import { makeToastAdapter } from '@/main/factories/adapter/make-toastAdapter'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'

interface IModalRemoveProps {
  deleteFarmer: IDeleteFarmer
  open: boolean
  onClose: () => void
  idToRemove: number
}

const ModalRemove = ({
  open,
  onClose,
  deleteFarmer,
  idToRemove,
}: IModalRemoveProps) => {
  const { toast } = makeToastAdapter()

  const handleDelete = () => {
    deleteFarmer
      .delete(idToRemove)
      .then(() => {
        toast('Sucesso', 'success')
        location.reload()
      })
      .catch((err) => toast(err.message, 'error'))
      .finally(onClose)
  }

  return (
    <Modal size="sm" isOpen={open} onClose={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Excluir</ModalHeader>
          <ModalBody>
            <p>Deseja remover esse fazendeiro ?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button color="danger" variant="flat" onPress={handleDelete}>
              Remover
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  )
}

export default ModalRemove
