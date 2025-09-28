import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Inventory } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private readonly repo: InventoryRepository) {}

  async create(dto: CreateInventoryDto): Promise<Inventory> {
    return this.repo.create(dto);
  }

  async findAll(): Promise<Inventory[]> {
    return this.repo.findAll();
  }

  async findOne(id: string): Promise<Inventory> {
    const rec = await this.repo.findOne(id);
    if (!rec) throw new NotFoundException('Inventory not found');
    return rec;
  }

  async update(id: string, dto: Partial<CreateInventoryDto>): Promise<Inventory> {
    return this.repo.update(id, dto);
  }

  async remove(id: string): Promise<void> {
    return this.repo.remove(id);
  }
}
