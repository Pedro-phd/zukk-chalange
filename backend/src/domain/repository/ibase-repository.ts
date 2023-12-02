export interface IBaseRepository<T, R> {
  getId(id: number): Promise<T>;
  getAll(): Promise<T[]>;
  update(data: T): Promise<boolean>;
  delete(id: number): Promise<boolean>;
  create(data: R): Promise<{ id: number }>;
}
