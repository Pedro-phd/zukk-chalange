import { Injectable } from '@nestjs/common';
import { Farmer, Prisma } from '@prisma/client';
import { IUpdateFarmer } from 'src/domain/useCase/iupdate-farmer';
import { FarmerRepository } from 'src/infra/repository/farmer-repository';
import { NotPermitted } from '../errors/notPermitted';

@Injectable()
export class UpdateFarmer implements IUpdateFarmer {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async update(data: Farmer): Promise<boolean> {
    const area = data.agriculturalArea + data.vegetationArea;
    if (area > data.totalArea)
      throw new NotPermitted(
        'A Areal total não deve ser inferior a area de agricultura e de vegetação',
      );

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
