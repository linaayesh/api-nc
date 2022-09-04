import { Request } from 'express';
import { pagination } from '../../interfaces/DtoContents';
import { userId } from '../../interfaces/DtoUsers';

export const paginationDTO = (request: Request): pagination => (
  {
    page: Number(request.query.page),
    limit: Number(request.query.limit),
    title: typeof request.query.title === 'string' ? String(request.query.title) : undefined,
    id: typeof request.query.id === 'string' ? String(request.query.id) : undefined,
  });
export const userIdDTO = (request: Request): userId => (
  {
    userId: Number(request.params.userId),
  });
