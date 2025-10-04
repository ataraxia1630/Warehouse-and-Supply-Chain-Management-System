import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service'; 

@Injectable()
export class InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMovementByKey(idempotencyKey: string) {
    return this.prisma.stockMovement.findUnique({
      where: { idempotencyKey },
    });
  }

  async upsertInventory(productBatchId: string, locationId: string, quantity: number, createdById: string) {
    return this.prisma.inventory.upsert({
      where: {
        productBatchId_locationId: {
          productBatchId,
          locationId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
        updatedById: createdById,
      },
      create: {
        productBatchId,
        locationId,
        quantity,
        createdById,
      },
    });
  }

  async createStockMovement(productBatchId: string, locationId: string, quantity: number, createdById: string, idempotencyKey?: string) {
    return this.prisma.stockMovement.create({
      data: {
        productBatchId,
        locationId,
        quantity,
        movementType: 'INBOUND',
        createdById,
        idempotencyKey,
      },
    });
  }
}
