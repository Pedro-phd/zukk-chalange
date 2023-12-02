import { Farmer } from '@prisma/client';

export interface FarmerRequest extends Omit<Farmer, 'id'> {}
