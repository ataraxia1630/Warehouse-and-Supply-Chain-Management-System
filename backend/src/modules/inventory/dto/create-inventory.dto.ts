import { IsUUID, IsInt, IsOptional, Min } from 'class-validator';

export class CreateInventoryDto {
  @IsUUID()
  productBatchId: string;

  @IsUUID()
  locationId: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  availableQty?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  reservedQty?: number;
}
