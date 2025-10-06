import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { InventoryRepository } from '../repositories/inventory.repository';
import { BadRequestException } from '@nestjs/common';

describe('InventoryService', () => {
  let service: InventoryService;
  let repo: Partial<InventoryRepository>;

  beforeEach(async () => {
    repo = {
      findMovementByKey: jest.fn(),
      upsertInventory: jest.fn(),
      createStockMovement: jest.fn(),
      findInventory: jest.fn(),
      decreaseInventory: jest.fn(),
      createDispatchMovement: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryService, { provide: InventoryRepository, useValue: repo }],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
  });

  describe('receiveInventory', () => {
    it('should return existing movement if idempotencyKey already used', async () => {
      (repo.findMovementByKey as jest.Mock).mockResolvedValue({ id: '123' });

      const result = await service.receiveInventory({
        productBatchId: 'pb1',
        locationId: 'loc1',
        quantity: 10,
        createdById: 'user1',
        idempotencyKey: 'key1',
      });

      expect(result.message).toBe('Already processed');
    });

    it('should create new inventory and movement', async () => {
      (repo.findMovementByKey as jest.Mock).mockResolvedValue(null);
      (repo.upsertInventory as jest.Mock).mockResolvedValue({ id: 'inv1' });
      (repo.createStockMovement as jest.Mock).mockResolvedValue({ id: 'move1' });

      const result = await service.receiveInventory({
        productBatchId: 'pb1',
        locationId: 'loc1',
        quantity: 10,
        createdById: 'user1',
      });

      expect(result.inventory.id).toBe('inv1');
      expect(result.movement.id).toBe('move1');
    });
  });

  describe('dispatchInventory', () => {
    it('should throw if not enough stock', async () => {
      (repo.findInventory as jest.Mock).mockResolvedValue({ availableQty: 5 });

      await expect(
        service.dispatchInventory({
          productBatchId: 'pb1',
          locationId: 'loc1',
          quantity: 10,
          createdById: 'user1',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should decrease stock and create movement', async () => {
      (repo.findInventory as jest.Mock).mockResolvedValue({ availableQty: 20 });
      (repo.decreaseInventory as jest.Mock).mockResolvedValue({ id: 'inv2' });
      (repo.createDispatchMovement as jest.Mock).mockResolvedValue({ id: 'move2' });

      const result = await service.dispatchInventory({
        productBatchId: 'pb1',
        locationId: 'loc1',
        quantity: 10,
        createdById: 'user1',
      });

      expect(result.inventory.id).toBe('inv2');
      expect(result.movement.id).toBe('move2');
    });
  });
});
