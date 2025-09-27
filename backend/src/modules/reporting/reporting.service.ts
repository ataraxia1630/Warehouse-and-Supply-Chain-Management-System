import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ReportingService {
  constructor(
    private prisma: PrismaService,
    @InjectModel('AuditLog') private auditModel: Model<any>,
  ) {}

  // example: get inventory summary from Postgres
  async inventorySummary() {
    const query = await this.prisma.inventory.groupBy({
      by: ['productBatchId'],
      _sum: { availableQty: true, reservedQty: true },
    });
    return query;
  }

  // query audit logs from Mongo
  async recentAudit(limit = 50) {
    return this.auditModel.find().sort({ performedAt: -1 }).limit(limit).exec();
  }
}
