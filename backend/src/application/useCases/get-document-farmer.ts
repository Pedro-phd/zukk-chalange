import { Injectable } from '@nestjs/common';
import { Farmer, Prisma } from '@prisma/client';
import { IGetDocumentFarmer } from 'src/domain/useCase/iget-document-farmer';
import { FarmerRepository } from 'src/infra/repository/farmer-repository';

@Injectable()
export class GetDocumentFarmer implements IGetDocumentFarmer {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async get(document: string): Promise<Farmer> {
    try {
      const farmer = await this.farmerRepository.getDocument(document);
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
