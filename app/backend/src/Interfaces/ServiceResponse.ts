export type ServiceMessage = { message: string };

type ServiceErrorTypes =
  | 'INVALID_DATA'
  | 'INVALID_USER_DATA'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND'
  | 'CONFLICT';

type ServiceResSuccessType =
  | 'SUCCESSFUL'
  | 'OK';

export type ServiceError = {
  status: ServiceErrorTypes,
  data: ServiceMessage
};

export type ServiceResSuccess<T> = {
  status: ServiceResSuccessType,
  data: T
};

export type ServiceRes<T> = ServiceError | ServiceResSuccess<T>;
