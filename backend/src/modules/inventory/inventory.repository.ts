import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class InventoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    productBatchId: string;
    locationId: string;
    availableQty?: number;
    reservedQty?: number;
  }) {
    return this.prisma.inventory.create({ data });
  }

  async findAll() {
    return this.prisma.inventory.findMany({
      include: {
        productBatch: true,
        location: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.inventory.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<any>) {
    return this.prisma.inventory.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.inventory.delete({ where: { id } });
  }
}
