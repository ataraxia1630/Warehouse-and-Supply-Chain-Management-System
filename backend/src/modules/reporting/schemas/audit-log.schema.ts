import { Schema, Document } from 'mongoose';

export interface AuditLogDocument extends Document {
  entityType: string;
  entityId?: string;
  action?: string;
  payload?: any;
  performedBy?: string;
  performedAt?: Date;
}

export const AuditLogSchema = new Schema<AuditLogDocument>({
  entityType: { type: String },
  entityId: { type: String },
  action: { type: String },
  payload: { type: Schema.Types.Mixed },
  performedBy: { type: String },
  performedAt: { type: Date, default: Date.now },
});
