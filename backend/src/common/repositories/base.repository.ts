export abstract class BaseRepository<T> {
  abstract create(dto: any): Promise<T>;
  abstract findAll(query?: any): Promise<T[]>;
  abstract findOne(id: string): Promise<T | null>;
  abstract update(id: string, dto: any): Promise<T>;
  abstract remove(id: string): Promise<void>;
}