import { Farmer, Prisma } from '@prisma/client';
import { IFarmerRepository } from 'src/domain/repository/ifarmer-repository';
import { PrismaService } from '../prisma-service';
import { Injectable } from '@nestjs/common';
import { FarmerRequest } from 'src/domain/model/farmer-request';

@Injectable()
export class FarmerRepository implements IFarmerRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: FarmerRequest): Promise<{ id: number }> {
    try {
      const farmer = this.prisma.farmer.create({
        data: data,
      });
      return farmer;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(error.message);
      }
    }
  }

  async getDocument(document: string): Promise<Farmer> {
    try {
      const farmer = await this.prisma.farmer.findFirst({
        where: {
          document: {
            equals: document,
          },
        },
      });
      return farmer;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getId(id: number): Promise<Farmer> {
    try {
      const farmer = await this.prisma.farmer.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
      });
      return farmer;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAll(): Promise<Farmer[]> {
    try {
      const allFarmer = await this.prisma.farmer.findMany();
      return allFarmer;
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(data: Farmer): Promise<boolean> {
    try {
      await this.prisma.farmer.update({
        where: {
          id: data.id,
        },
        data: data,
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.farmer.delete({
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
