import { Crops, IFarmer } from '@/domain/models/farmer'
import { ICreateFarmer } from '@/domain/usecases/createFarmer'
import { makeToastAdapter } from '@/main/factories/adapter/make-toastAdapter'
import { makeCnpjValidator } from '@/main/factories/adapter/make-cnpjValidatorAdapter'
import { makeCpfValidator } from '@/main/factories/adapter/make-cpfValidatorAdapter'

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
import { useForm } from 'react-hook-form'

interface IModalCreateProps {
  open: boolean
  onClose: () => void
  createFarmer: ICreateFarmer
}

const ModalCreate = ({ open, onClose, createFarmer }: IModalCreateProps) => {
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
  const { isValid: cpfIsValid } = makeCnpjValidator()
  const { isValid: cnpjIsValid } = makeCpfValidator()

  const stringToFloat = (value: string | number) =>
    typeof value === 'string' ? parseFloat(value) : value

  const submit = () => {
    trigger()
    if (Object.keys(errors).length !== 0) return

    const doc = getValues('document').replace(/[^\d]+/g, '')
    const isCpf = cpfIsValid(doc)
    const isCnpj = cnpjIsValid(doc)
    if (!isCpf && !isCnpj) {
      toast('O documento deve ser valido, cpf ou cnpj', 'error')
      return
    }

    const body = getValues()
    const bodyParse: IFarmer = {
      ...body,
      totalArea: stringToFloat(body.totalArea),
      agriculturalArea: stringToFloat(body.agriculturalArea),
      vegetationArea: stringToFloat(body.vegetationArea),
    }

    createFarmer
      .create(bodyParse)
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
                      {...register('name', {
                        required: 'O Nome é um campo obrigatório',
                      })}
                    />
                    <Input
                      variant="faded"
                      label="Documento"
                      description="CPF ou CNPJ"
                      isRequired
                      errorMessage={errors.document?.message}
                      endContent={<SquareUserRound size={16} />}
                      {...register('document', {
                        required: 'O Documento é um campo obrigatório',
                      })}
                    />
                    <Input
                      variant="faded"
                      label="Nome da fazenda"
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
                    value={getValues('plantedCrops')}
                    onValueChange={(v) =>
                      setValue('plantedCrops', v as Crops[])
                    }
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

export default ModalCreate
