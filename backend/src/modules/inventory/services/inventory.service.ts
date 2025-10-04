import { Injectable, BadRequestException } from '@nestjs/common';
import { InventoryRepository } from '../repositories/inventory.repository';
import { ReceiveInventoryDto } from '../dto/receive-inventory.dto';
import { DispatchInventoryDto } from '../dto/dispatch-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepo: InventoryRepository) {}

  async receiveInventory(dto: ReceiveInventoryDto) {
    // Kiểm tra idempotency
    if (dto.idempotencyKey) {
      const existing = await this.inventoryRepo.findMovementByKey(dto.idempotencyKey);
      if (existing) {
        return { message: 'Already processed', movement: existing };
      }
    }

    // 1. Cập nhật tồn kho (availableQty)
    const inventory = await this.inventoryRepo.upsertInventory(
      dto.productBatchId,
      dto.locationId,
      dto.quantity,
    );

    // 2. Ghi lại movement
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
    if (dto.idempotencyKey) {
      const existing = await this.inventoryRepo.findMovementByKey(dto.idempotencyKey);
      if (existing) {
        return { message: 'Already processed', movement: existing };
      }
    }

    // Kiểm tra tồn kho
    const currentInventory = await this.inventoryRepo.findInventory(dto.productBatchId, dto.locationId);
    if (!currentInventory || currentInventory.availableQty < dto.quantity) {
      throw new BadRequestException('Not enough stock available');
    }

    // Giảm tồn kho
    const updatedInventory = await this.inventoryRepo.decreaseInventory(
      dto.productBatchId,
      dto.locationId,
      dto.quantity,
      dto.createdById,
    );

    // Tạo movement
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
