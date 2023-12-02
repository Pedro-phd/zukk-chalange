import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Farmer } from '@prisma/client';
import { FieldAlreadyExists } from 'src/application/errors/fieldAlreadyExists';
import { NotFound } from 'src/application/errors/notFound';
import { FarmerRequestDto, FarmerUpdateDto } from 'src/domain/dto/farmer-dto';
import { FarmerRequest } from 'src/domain/model/farmer-request';

import {
  CreateFarmer,
  GetAllFarmer,
  GetDocumentFarmer,
  GetIdFarmer,
  UpdateFarmer,
  DeleteFarmer,
} from 'src/application/useCases';

@Controller('/farmer')
export class FarmerController {
  constructor(
    private readonly createFarmer: CreateFarmer,
    private readonly getAll: GetAllFarmer,
    private readonly getDocument: GetDocumentFarmer,
    private readonly getId: GetIdFarmer,
    private readonly updateFarmer: UpdateFarmer,
    private readonly deleteFarmer: DeleteFarmer,
  ) {}

  @Get('/')
  async All(): Promise<Farmer[]> {
    return this.getAll.get();
  }

  @Get('/id/:id')
  async GetForId(@Param('id') id: string): Promise<Farmer> {
    try {
      const farmer = await this.getId.get(parseInt(id));
      if (farmer === null) {
        throw new NotFound('id', id);
      }
      return farmer;
    } catch (error) {
      if (error instanceof NotFound) {
        throw new HttpException(
          `Usuario do campo id: ${id} não existe`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new Error(error);
    }
  }

  @Get('/document/:document')
  async GetForDocument(@Param('document') doc: string): Promise<Farmer> {
    try {
      const farmer = await this.getDocument.get(doc);
      if (farmer === null) {
        throw new NotFound('document', doc);
      }
      return farmer;
    } catch (error) {
      if (error instanceof NotFound) {
        throw new HttpException(
          `Usuario do campo document: ${doc} não existe`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new Error(error);
    }
  }

  @Put('')
  @ApiBody({
    description: 'Update farmer',
    type: FarmerUpdateDto,
  })
  async Update(@Body() data: Farmer) {
    try {
      await this.updateFarmer.update(data);
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  @Delete('/:id')
  async Delete(@Param('id') id: string) {
    try {
      await this.deleteFarmer.delete(parseInt(id));
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/')
  @ApiBody({
    description: 'New farmer request',
    type: FarmerRequestDto,
  })
  async New(@Body() farmer: FarmerRequest): Promise<number> {
    console.log(farmer);
    try {
      const idFarmer = await this.createFarmer.create(farmer);
      return idFarmer;
    } catch (error) {
      console.log(error);
      if (error instanceof FieldAlreadyExists) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new Error(error);
    }
  }
}
