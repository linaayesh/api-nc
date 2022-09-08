import { Request } from 'express';
import { IPagination } from '../../interfaces/DtoContents';
import { IUserId } from '../../interfaces/DtoUsers';

export const paginationDTO = (request: Request): IPagination => (
  {
    page: Number(request.query.page),
    limit: Number(request.query.limit),
    title: typeof request.query.title === 'string' ? String(request.query.title) : undefined,
    id: typeof request.query.id === 'string' ? String(request.query.id) : undefined,
  });
export const userIdDTO = (request: Request): IUserId => (
  {
    userId: Number(request.params.userId),
  });
