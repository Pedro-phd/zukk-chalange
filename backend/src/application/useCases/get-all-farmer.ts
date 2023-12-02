import { Injectable } from '@nestjs/common';
import { Farmer } from '@prisma/client';
import { IGetAllFarmer } from 'src/domain/useCase/iget-all-farmer';
import { FarmerRepository } from 'src/infra/repository/farmer-repository';

@Injectable()
export class GetAllFarmer implements IGetAllFarmer {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async get(): Promise<Farmer[]> {
    try {
      return this.farmerRepository.getAll();
    } catch (error) {
      throw new Error(error);
    }
  }
}
