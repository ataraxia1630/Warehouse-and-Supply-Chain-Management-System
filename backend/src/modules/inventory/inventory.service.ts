import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly repo: InventoryRepository) {}

  async create(dto: CreateInventoryDto) {
    return this.repo.create(dto as any);
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const rec = await this.repo.findOne(id);
    if (!rec) throw new NotFoundException('Inventory not found');
    return rec;
  }

  async update(id: string, dto: Partial<CreateInventoryDto>) {
    return this.repo.update(id, dto);
  }

  async remove(id: string) {
    return this.repo.remove(id);
  }
}
