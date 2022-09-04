import { IContent, IUser } from 'db-models-nc';
import { pagination, matchUserContent } from '../../interfaces/DtoContents';
import { ICustomContent, ICustomUser, AddUserInterface } from '../../interfaces';

// CONTENTS TYPES
type IGetPaginatedContentsDTO = (_: pagination) => Promise<
  { rows: ICustomContent[]; count: number; } | ICustomContent[] | ICustomContent | null
>

type IGetContentReportDTO = (_: {
  page: number;
  limit: number;
  userId: number;
}) => Promise<{ rows: ICustomContent[]; count: number }>;

type IGetPaginatedUsersDTO = (_: pagination) => Promise<
  { rows: ICustomUser[]; count: number; } | ICustomUser[]
>

export type IMatchUserContentDTO = (_: matchUserContent) => Promise<IContent>

export type GetUserByEmailDTO = (email: string) => Promise<IUser | null>
export type GetUserByIdDTO = (id: number) => Promise<IUser | null>
export type AddUserDTO = (data: AddUserInterface) => Promise<IUser>

export type GetUsersStatusDTO = (statusId: number, _: {
  page: number, limit: number
}) => Promise<{rows: IUser[], count: number} | IUser[]>

export {
  IGetPaginatedContentsDTO,
  IGetContentReportDTO,
  IGetPaginatedUsersDTO,
};
