import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class InventoryRepository {
  constructor(public readonly prisma: PrismaService) {}

  async findMovementByKey(idempotencyKey: string) {
    return this.prisma.stockMovement.findUnique({
      where: { idempotencyKey },
    });
  }

  async upsertInventory(productBatchId: string, locationId: string, quantity: number) {
    return this.prisma.inventory.upsert({
      where: {
        productBatchId_locationId: {
          productBatchId,
          locationId,
        },
      },
      update: {
        availableQty: { increment: quantity },
      },
      create: {
        productBatchId,
        locationId,
        availableQty: quantity,
        reservedQty: 0,
      },
    });
  }

  async createStockMovement(
    productBatchId: string,
    locationId: string,
    quantity: number,
    createdById: string,
    idempotencyKey?: string,
  ) {
    return this.prisma.stockMovement.create({
      data: {
        productBatchId,
        toLocationId: locationId,
        quantity,
        movementType: 'purchase_receipt',
        createdById,
        idempotencyKey,
      },
    });
  }

  async decreaseInventory(productBatchId: string, locationId: string, quantity: number) {
    return this.prisma.inventory.update({
      where: {
        productBatchId_locationId: { productBatchId, locationId },
      },
      data: {
        availableQty: { decrement: quantity },
      },
    });
  }

  async createDispatchMovement(
    productBatchId: string,
    locationId: string,
    quantity: number,
    createdById: string,
    idempotencyKey?: string,
  ) {
    return this.prisma.stockMovement.create({
      data: {
        productBatchId,
        fromLocationId: locationId,
        quantity,
        movementType: 'sale_issue',
        createdById,
        idempotencyKey,
      },
    });
  }

  async findInventory(productBatchId: string, locationId: string) {
    return this.prisma.inventory.findUnique({
      where: {
        productBatchId_locationId: { productBatchId, locationId },
      },
    });
  }

  async findProductBatch(productBatchId: string) {
    if (!productBatchId) return null;
    return this.prisma.productBatch.findUnique({ where: { id: productBatchId } });
  }

  async findLocation(locationId: string) {
    if (!locationId) return null;
    return this.prisma.location.findUnique({ where: { id: locationId } });
  }

  async findUser(userId: string) {
    if (!userId) return null;
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
