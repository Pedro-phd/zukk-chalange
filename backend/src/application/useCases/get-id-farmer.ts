import { Injectable } from '@nestjs/common';
import { Farmer, Prisma } from '@prisma/client';
import { IGetIdFarmer } from 'src/domain/useCase/iget-id-farmer';
import { FarmerRepository } from 'src/infra/repository/farmer-repository';

@Injectable()
export class GetIdFarmer implements IGetIdFarmer {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async get(id: number): Promise<Farmer> {
    try {
      const farmer = await this.farmerRepository.getId(id);
      return farmer;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('-------------');
        console.log(error.code);
        console.log('-------------');
        throw new Error(error.message);
      }
      throw new Error(error);
    }
  }
}
