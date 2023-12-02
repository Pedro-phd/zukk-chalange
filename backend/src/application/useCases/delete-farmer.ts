import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IDeleteFarmer } from 'src/domain/useCase/idelete-farrmer';
import { FarmerRepository } from 'src/infra/repository/farmer-repository';

@Injectable()
export class DeleteFarmer implements IDeleteFarmer {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async delete(id: number): Promise<boolean> {
    try {
      await this.farmerRepository.delete(id);
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
