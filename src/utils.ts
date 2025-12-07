import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export async function validateDto<T>(
  dtoClass: ClassConstructor<T>,
  payload: T,
) {
  const dtoObject = plainToInstance<T, T>(dtoClass, payload, {
    enableImplicitConversion: true,
  });
  await validateOrReject(dtoObject as object);
  return dtoObject;
}
