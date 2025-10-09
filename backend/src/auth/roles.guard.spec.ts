import { ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { ROLES_KEY } from './decorators/roles.decorator';
import { UserRole } from '@prisma/client';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  const createMockContext = (role?: UserRole) => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          user: role ? { role } : undefined,
        }),
      }),
      getHandler: () => ({}) as any,
      getClass: () => ({}) as any,
    } as any;
  };

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('allows when no roles metadata', () => {
    const ctx = createMockContext(UserRole.admin);
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined as any);
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('throws when missing user role', () => {
    const ctx = createMockContext(undefined);
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.admin]);
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('allows when user role is included', () => {
    const ctx = createMockContext(UserRole.manager);
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.admin, UserRole.manager]);
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('denies when user role is not included', () => {
    const ctx = createMockContext(UserRole.partner);
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.manager]);
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });
});
