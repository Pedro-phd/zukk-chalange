import { Farmer } from '@prisma/client';

export interface IGetDocumentFarmer {
  get(document: string): Promise<Farmer>;
}
