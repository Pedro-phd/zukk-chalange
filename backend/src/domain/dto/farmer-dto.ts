import { Farmer } from '@prisma/client';
import { FarmerRequest } from '../model/farmer-request';
import { ApiProperty } from '@nestjs/swagger';

export class FarmerUpdateDto implements Farmer {
  @ApiProperty({ description: 'Id of farmer', example: 1 })
  id: number;
  @ApiProperty({ description: 'Name of farmer', example: 'John Doe' })
  name: string;
  @ApiProperty({ description: 'Name of farm', example: 'Farm of John Doe' })
  farmName: string;
  @ApiProperty({
    description: 'Document CPF | CNPJ',
    example: 11122233344,
  })
  document: string;
  @ApiProperty({
    description: 'City of farmer',
    example: 'Bragança Paulista',
  })
  city: string;
  @ApiProperty({
    description: 'State of farmer',
    example: 'São Paulo',
  })
  state: string;
  @ApiProperty({
    description: 'Total area of farm (in hectares)',
    example: 10,
  })
  totalArea: number;
  @ApiProperty({
    description: 'Total area of farm for planting (in hectares)',
    example: 10,
  })
  agriculturalArea: number;
  @ApiProperty({
    description: 'Total area of farm with plantation (in hectares)',
    example: 10,
  })
  vegetationArea: number;
  @ApiProperty({
    description: 'Crops in farm',
    example: '["cotton"]',
  })
  plantedCrops: string[];
}

export class FarmerRequestDto implements FarmerRequest {
  @ApiProperty({ description: 'Name of farmer', example: 'John Doe' })
  name: string;
  @ApiProperty({ description: 'Name of farm', example: 'Farm of John Doe' })
  farmName: string;
  @ApiProperty({
    description: 'Document CPF | CNPJ',
    example: '11122233344',
  })
  document: string;
  @ApiProperty({
    description: 'City of farmer',
    example: 'Bragança Paulista',
  })
  city: string;
  @ApiProperty({
    description: 'State of farmer',
    example: 'São Paulo',
  })
  state: string;
  @ApiProperty({
    description: 'Total area of farm (in hectares)',
    example: '10',
  })
  totalArea: number;
  @ApiProperty({
    description: 'Total area of farm for planting (in hectares)',
    example: '10',
  })
  agriculturalArea: number;
  @ApiProperty({
    description: 'Total area of farm with plantation (in hectares)',
    example: '10',
  })
  vegetationArea: number;
  @ApiProperty({
    description: 'Crops in farm',
    example: '["cotton"]',
  })
  plantedCrops: string[];
}
