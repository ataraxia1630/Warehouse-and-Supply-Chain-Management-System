import { Injectable } from '@nestjs/common';
import { InventoryRepository } from '../repositories/inventory.repository';
import { ReceiveInventoryDto } from '../dto/receive-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepo: InventoryRepository) {}

  async receiveInventory(dto: ReceiveInventoryDto) {
    // TODO: sẽ thêm logic sau
    return { message: 'Inventory received (stub)', data: dto };
  }
}
