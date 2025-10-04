import { IsUUID, IsInt, Min, IsOptional } from 'class-validator';

export class ReceiveInventoryDto {
  @IsUUID()
  productBatchId: string;

  @IsUUID()
  locationId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsUUID()
  createdById: string;

  @IsOptional()
  idempotencyKey?: string;
}
