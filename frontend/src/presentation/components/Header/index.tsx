import { useFarmerContext } from '@/aplication/context/FarmContext'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Autocomplete,
  AutocompleteItem,
  Chip,
  Divider,
  Button,
} from '@nextui-org/react'
import { Dot, Leaf, Plus, Search } from 'lucide-react'

const Header = () => {
  const { mock, setSearchedUser, searchedUser } = useFarmerContext()

  return (
    <Navbar className="p-4">
      <NavbarBrand className="gap-4">
        <img
          src="https://www.brain.agr.br/images/logo.png"
          className="saturate-0 brightness-200 w-24 md:w-36"
        />
        {/* <p className="font-bold text-inherit text-xl bg-gradient-to-b from-[#9354D2] to-[#653496] text-transparent bg-clip-text">
          Braing AG
        </p> */}
        <Chip
          className="flex flex-initial text-xs gap-2"
          endContent={<Leaf size={16} />}
          variant="flat"
          color="secondary"
        >
          <span className="hidden md:inline md:mr-1">Farmer Dashboard</span>
          V1.0
        </Chip>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="flex items-center gap-4">
          <Button
            className="md:hidden"
            isIconOnly
            variant="flat"
            color="secondary"
          >
            <Search />
          </Button>
          <Autocomplete
            label="Pesquise pelo Fazendeiro"
            className="max-w-xs hidden md:flex"
            selectedKey={searchedUser}
            onSelectionChange={setSearchedUser}
          >
            {mock.map((farmer) => (
              <AutocompleteItem key={farmer.document} value={farmer.document}>
                {farmer.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Button isIconOnly variant="faded" color="success">
            <Plus />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
