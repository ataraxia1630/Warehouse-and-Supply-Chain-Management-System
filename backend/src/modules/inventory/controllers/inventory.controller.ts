import { Controller, Post, Body } from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';
import { ReceiveInventoryDto } from '../dto/receive-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('receive')
  async receiveInventory(@Body() dto: ReceiveInventoryDto) {
    return this.inventoryService.receiveInventory(dto);
  }
}