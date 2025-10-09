import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('order')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
// Mặc định: cho phép đọc cho nhiều role; khi thêm action cụ thể, ghi đè @Roles ở level method
@Roles(
  UserRole.admin,
  UserRole.manager,
  UserRole.warehouse_staff,
  UserRole.logistics,
  UserRole.partner,
)
export class OrderController {}
