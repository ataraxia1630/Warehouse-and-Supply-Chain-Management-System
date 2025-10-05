import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InventoryRepository } from '../repositories/inventory.repository';
import { ReceiveInventoryDto } from '../dto/receive-inventory.dto';
import { DispatchInventoryDto } from '../dto/dispatch-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepo: InventoryRepository) {}

  async receiveInventory(dto: ReceiveInventoryDto) {
    // Basic existence validation (before making DB state changes)
    const batch = await this.inventoryRepo.findProductBatch(dto.productBatchId);
    if (!batch) {
      throw new NotFoundException(`ProductBatch not found: ${dto.productBatchId}`);
    }

    const location = await this.inventoryRepo.findLocation(dto.locationId);
    if (!location) {
      throw new NotFoundException(`Location not found: ${dto.locationId}`);
    }

    if (dto.createdById) {
      const user = await this.inventoryRepo.findUser(dto.createdById);
      if (!user) {
        throw new NotFoundException(`User not found: ${dto.createdById}`);
      }
    }

    // Idempotency: if movement exists, return it (idempotent)
    if (dto.idempotencyKey) {
      const existing = await this.inventoryRepo.findMovementByKey(dto.idempotencyKey);
      if (existing) {
        return { message: 'Already processed', movement: existing };
      }
    }

    // 1. Update inventory (availableQty)
    const inventory = await this.inventoryRepo.upsertInventory(
      dto.productBatchId,
      dto.locationId,
      dto.quantity,
    );

    // 2. Create movement (purchase_receipt)
    const movement = await this.inventoryRepo.createStockMovement(
      dto.productBatchId,
      dto.locationId,
      dto.quantity,
      dto.createdById,
      dto.idempotencyKey,
    );

    return { message: 'Inventory received successfully', inventory, movement };
  }

  async dispatchInventory(dto: DispatchInventoryDto) {
    // Basic existence validation
    const batch = await this.inventoryRepo.findProductBatch(dto.productBatchId);
    if (!batch) {
      throw new NotFoundException(`ProductBatch not found: ${dto.productBatchId}`);
    }

    const location = await this.inventoryRepo.findLocation(dto.locationId);
    if (!location) {
      throw new NotFoundException(`Location not found: ${dto.locationId}`);
    }

    if (dto.createdById) {
      const user = await this.inventoryRepo.findUser(dto.createdById);
      if (!user) {
        throw new NotFoundException(`User not found: ${dto.createdById}`);
      }
    }

    // Idempotency short-circuit
    if (dto.idempotencyKey) {
      const existing = await this.inventoryRepo.findMovementByKey(dto.idempotencyKey);
      if (existing) {
        return { message: 'Already processed', movement: existing };
      }
    }

    // Check current inventory
    const currentInventory = await this.inventoryRepo.findInventory(dto.productBatchId, dto.locationId);
    if (!currentInventory) {
      throw new NotFoundException('No inventory row for this productBatch/location');
    }
    if (currentInventory.availableQty < dto.quantity) {
      throw new BadRequestException('Not enough stock available');
    }

    // Decrement inventory and create movement
    const updatedInventory = await this.inventoryRepo.decreaseInventory(
      dto.productBatchId,
      dto.locationId,
      dto.quantity,
    );

    const movement = await this.inventoryRepo.createDispatchMovement(
      dto.productBatchId,
      dto.locationId,
      dto.quantity,
      dto.createdById,
      dto.idempotencyKey,
    );

    return { message: 'Inventory dispatched successfully', inventory: updatedInventory, movement };
  }
}
