import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { UserRole } from '@prisma/client';

describe('Inventory RBAC (e2e)', () => {
  let app: INestApplication;
  let jwt: JwtService;

  const sign = (sub: string, email: string, role: UserRole) =>
    jwt.sign({ sub, email, role }, { secret: process.env.JWT_ACCESS_SECRET || 'test-secret' });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwt = app.get(JwtService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should allow admin to call POST /inventory/receive', async () => {
    const token = sign('u1', 'a@example.com', UserRole.admin);
    await request(app.getHttpServer())
      .post('/inventory/receive')
      .set('Authorization', `Bearer ${token}`)
      .send({ productBatchId: 'pb', locationId: 'loc', quantity: 1, createdById: 'u1' })
      .expect((res) => [200, 201].includes(res.status));
  });

  it('should deny partner to call POST /inventory/receive', async () => {
    const token = sign('u2', 'p@example.com', UserRole.partner);
    await request(app.getHttpServer())
      .post('/inventory/receive')
      .set('Authorization', `Bearer ${token}`)
      .send({ productBatchId: 'pb', locationId: 'loc', quantity: 1, createdById: 'u2' })
      .expect(403);
  });
});
