import React from 'react'
import FarmerTable from '@/presentation/components/FarmerTable'
import { render } from '@testing-library/react'
import renderWithContext from '../mock/renderWithContext'
import { UpdateFarmerSpy } from '../spy/updateFarmer-spy'
import { DeleteFarmerSpy } from '../spy/deleteFarmer-spy'

describe('Farmer table', () => {
  const updateSpy = new UpdateFarmerSpy()
  const deleteSpy = new DeleteFarmerSpy()

  const sut = render(
    renderWithContext(
      <FarmerTable deleteFarmer={deleteSpy} updateFarmer={updateSpy} />,
    ),
  )

  it('render component', async () => {
    const { findByTestId } = sut
    const component = await findByTestId('farm-table')
    expect(component).toBeInTheDocument()
  })
})
