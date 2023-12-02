import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FarmerController } from './api/farmer-controller';
import { CreateFarmer } from './application/useCases/create-farmer';
import { PrismaService } from './infra/prisma-service';
import { FarmerRepository } from './infra/repository/farmer-repository';
import { GetAllFarmer } from './application/useCases/get-all-farmer';
import { GetDocumentFarmer } from './application/useCases/get-document-farmer';
import { GetIdFarmer } from './application/useCases/get-id-farmer';
import { UpdateFarmer } from './application/useCases';
import { DeleteFarmer } from './application/useCases/delete-farmer';

@Module({
  imports: [],
  controllers: [AppController, FarmerController],
  providers: [
    AppService,
    CreateFarmer,
    FarmerRepository,
    PrismaService,
    GetAllFarmer,
    GetIdFarmer,
    UpdateFarmer,
    GetDocumentFarmer,
    DeleteFarmer,
  ],
})
export class AppModule {}
