import { Injectable, BadRequestException } from '@nestjs/common';
import { InventoryRepository } from '../repositories/inventory.repository';
import { ReceiveInventoryDto } from '../dto/receive-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepo: InventoryRepository) {}

  async receiveInventory(dto: ReceiveInventoryDto) {
    // Nếu có idempotencyKey thì kiểm tra
    if (dto.idempotencyKey) {
      const existing = await this.inventoryRepo.findMovementByKey(dto.idempotencyKey);
      if (existing) {
        return { message: 'Already processed', movement: existing };
      }
    }

    // 1. Cập nhật tồn kho
    const inventory = await this.inventoryRepo.upsertInventory(
      dto.productBatchId,
      dto.locationId,
      dto.quantity,
      dto.createdById,
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
}
