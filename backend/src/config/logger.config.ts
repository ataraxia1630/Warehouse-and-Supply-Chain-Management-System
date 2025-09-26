import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const logger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('WarehouseSystem', {
          prettyPrint: true,
        }),
      ),
    }),
  ],
});