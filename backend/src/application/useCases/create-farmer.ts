import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FarmerRequest } from 'src/domain/model/farmer-request';
import { ICreateFarmer } from 'src/domain/useCase/icreate-farmer';
import { FarmerRepository } from 'src/infra/repository/farmer-repository';
import { FieldAlreadyExists } from '../errors/fieldAlreadyExists';

@Injectable()
export class CreateFarmer implements ICreateFarmer {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async create(farmer: FarmerRequest): Promise<number> {
    try {
      const response = await this.farmerRepository.create(farmer);
      return response.id;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new FieldAlreadyExists(error.meta.target[0]);
        }
        console.log('---------------');
        console.log('ERROR ->', error.code, error?.meta?.target[0]);
        console.log('---------------');
        throw new Error(error.message);
      }
      throw new Error(error.message);
    }
  }
}
