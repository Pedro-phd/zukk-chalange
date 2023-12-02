import { Injectable } from '@nestjs/common';
import { Farmer, Prisma } from '@prisma/client';
import { IUpdateFarmer } from 'src/domain/useCase/iupdate-farmer';
import { FarmerRepository } from 'src/infra/repository/farmer-repository';

@Injectable()
export class UpdateFarmer implements IUpdateFarmer {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async update(data: Farmer): Promise<boolean> {
    try {
      await this.farmerRepository.update(data);
      return true;
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
