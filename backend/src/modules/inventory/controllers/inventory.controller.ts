import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';
import { ReceiveInventoryDto } from '../dto/receive-inventory.dto';
import { DispatchInventoryDto } from '../dto/dispatch-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('receive')
  @HttpCode(HttpStatus.CREATED)
  async receive(@Body() dto: ReceiveInventoryDto) {
    return this.inventoryService.receiveInventory(dto);
  }

  @Post('dispatch')
  @HttpCode(HttpStatus.CREATED)
  async dispatch(@Body() dto: DispatchInventoryDto) {
    return this.inventoryService.dispatchInventory(dto);
  }
}
