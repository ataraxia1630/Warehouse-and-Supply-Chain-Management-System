import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ReportingService {
  constructor(
    private prisma: PrismaService,
    @InjectModel('AuditLog') private auditModel: Model<Document>,
  ) {}

  // example: get inventory summary from Postgres
  async inventorySummary() {
    return await this.prisma.inventory.groupBy({
      by: ['productBatchId'],
      _sum: { availableQty: true, reservedQty: true },
    });
  }

  // query audit logs from Mongo
  async recentAudit(limit = 50): Promise<Document[]> {
    return this.auditModel.find().sort({ performedAt: -1 }).limit(limit).exec();
  }
}
