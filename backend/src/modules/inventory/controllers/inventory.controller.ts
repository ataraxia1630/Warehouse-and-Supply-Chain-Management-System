import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';
import { ReceiveInventoryDto } from '../dto/receive-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('receive')
  @HttpCode(HttpStatus.CREATED)
  async receive(@Body() dto: ReceiveInventoryDto) {
    return this.inventoryService.receiveInventory(dto);
  }
}
