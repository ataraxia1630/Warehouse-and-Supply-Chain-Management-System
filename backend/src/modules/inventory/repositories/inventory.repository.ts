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

  async decrementInventory(productBatchId: string, locationId: string, quantity: number, updatedById: string) {
    return this.prisma.inventory.update({
      where: {
        productBatchId_locationId: {
          productBatchId,
          locationId,
        },
      },
      data: {
        quantity: {
          decrement: quantity,
        },
        updatedById,
      },
    });
  }

  async createDispatchMovement(productBatchId: string, locationId: string, quantity: number, createdById: string, idempotencyKey?: string) {
    return this.prisma.stockMovement.create({
      data: {
        productBatchId,
        locationId,
        quantity,
        movementType: 'OUTBOUND',
        createdById,
        idempotencyKey,
      },
    });
  }

  async getInventory(productBatchId: string, locationId: string) {
    return this.prisma.inventory.findUnique({
      where: {
        productBatchId_locationId: {
          productBatchId,
          locationId,
        },
      },
    });
  }
}
