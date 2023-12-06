import { Crops, IFarmer } from '@/domain/models/farmer'
import { IUpdateFarmer } from '@/domain/usecases/updateFarmer'
import { makeToastAdapter } from '@/main/factories/adapter/make-toastAdapter'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Input,
  CheckboxGroup,
  Checkbox,
} from '@nextui-org/react'
import {
  LandPlot,
  Map,
  MapPin,
  Shovel,
  SquareUserRound,
  TentTree,
  User,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface IModalEditProps {
  open: boolean
  onClose: () => void
  updateFarmer: IUpdateFarmer
  editData: IFarmer
}

const ModalEdit = ({
  open,
  onClose,
  editData,
  updateFarmer,
}: IModalEditProps) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
  } = useForm<IFarmer>()

  const { toast } = makeToastAdapter()

  const [crops, setCrops] = useState<Crops[]>()

  const changeCrops = (data: Crops[]) => {
    setValue('plantedCrops', data)
    setCrops(data)
  }

  useEffect(() => {
    setCrops(editData?.plantedCrops)
  }, [editData])

  const stringToFloat = (value: string | number) =>
    typeof value === 'string' ? parseFloat(value) : value

  const submit = () => {
    trigger()

    if (Object.keys(errors).length !== 0) return

    const body = getValues()
    const bodyParse: IFarmer = {
      ...body,
      id: editData.id,
      totalArea: stringToFloat(body.totalArea),
      agriculturalArea: stringToFloat(body.agriculturalArea),
      vegetationArea: stringToFloat(body.vegetationArea),
    }

    updateFarmer
      .update(bodyParse)
      .then(() => {
        toast('Sucesso', 'success')
        location.reload()
      })
      .catch((err) => toast(err.message, 'error'))

    onClose()
    reset()
  }

  return (
    <Modal
      backdrop="blur"
      isOpen={open}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Novo Cadastro
          </ModalHeader>
          <ModalBody>
            <Card className="p-4" shadow="lg">
              <CardBody>
                <form
                  className="flex gap-2 flex-row flex-wrap"
                  onSubmit={handleSubmit(submit)}
                >
                  <div className="flex gap-2 flex-col w-full">
                    <Input
                      variant="faded"
                      label="Nome"
                      endContent={<User size={16} />}
                      isRequired
                      errorMessage={errors?.name?.message}
                      defaultValue={editData?.name}
                      {...register('name', {
                        required: 'O Nome é um campo obrigatório',
                      })}
                    />
                    <Input
                      variant="faded"
                      label="Documento"
                      defaultValue={editData?.document}
                      description="CPF ou CNPJ"
                      isDisabled
                      errorMessage={errors.document?.message}
                      endContent={<SquareUserRound size={16} />}
                      disabled={!!editData}
                      {...register('document', {
                        value: editData?.document,
                      })}
                    />
                    <Input
                      variant="faded"
                      label="Nome da fazenda"
                      defaultValue={editData?.farmName}
                      endContent={<SquareUserRound size={16} />}
                      isRequired
                      errorMessage={errors.farmName?.message}
                      {...register('farmName', {
                        required: 'O Nome da fazenda é um campo obrigatório',
                      })}
                    />
                    <Input
                      variant="faded"
                      label="Estado"
                      defaultValue={editData?.state}
                      endContent={<Map size={16} />}
                      isRequired
                      errorMessage={errors.state?.message}
                      {...register('state', {
                        required: 'O Estado é um campo obrigatório',
                      })}
                    />

                    <Input
                      variant="faded"
                      label="Cidade"
                      defaultValue={editData?.city}
                      endContent={<MapPin size={16} />}
                      isRequired
                      errorMessage={errors.city?.message}
                      {...register('city', {
                        required: 'A Cidade é um campo obrigatório',
                      })}
                    />
                    <Input
                      variant="faded"
                      label="Area Total"
                      type="number"
                      description="Em hectares"
                      isRequired
                      defaultValue={editData?.totalArea.toString()}
                      errorMessage={errors.totalArea?.message}
                      endContent={<LandPlot size={16} />}
                      {...register('totalArea', {
                        required: 'A Area total é um campo obrigatório',
                      })}
                    />
                  </div>
                  <div className="flex gap-2 w-full">
                    <Input
                      variant="faded"
                      type="number"
                      label="Area Agriculturável"
                      description="Em hectares"
                      defaultValue={editData?.agriculturalArea.toString()}
                      endContent={<Shovel size={16} />}
                      errorMessage={errors.agriculturalArea?.message}
                      isRequired
                      {...register('agriculturalArea', {
                        required:
                          'A area Agriculturável é um campo obrigatório',
                      })}
                    />
                    <Input
                      variant="faded"
                      type="number"
                      label="Area de Vegetação"
                      description="Em hectares"
                      defaultValue={editData?.vegetationArea.toString()}
                      errorMessage={errors.vegetationArea?.message}
                      endContent={<TentTree size={16} />}
                      isRequired
                      {...register('vegetationArea', {
                        required: 'A area vegetativa é um campo obrigatório',
                      })}
                    />
                  </div>
                  <CheckboxGroup
                    label="Culturas plantadas"
                    color="default"
                    orientation="horizontal"
                    value={crops}
                    onValueChange={(v) => changeCrops(v as Crops[])}
                  >
                    <Checkbox value="soy">Soja</Checkbox>
                    <Checkbox value="corn">Milho</Checkbox>
                    <Checkbox value="cotton">Algodão</Checkbox>
                    <Checkbox value="coffee">Café</Checkbox>
                    <Checkbox value="sugar_cane">Cana de Açucar</Checkbox>
                  </CheckboxGroup>
                </form>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="success" variant="faded" onPress={() => submit()}>
              Criar
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  )
}

export default ModalEdit
