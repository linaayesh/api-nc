/* eslint-disable import/prefer-default-export */
import { pagination } from '../../interfaces/DtoContents';
import { ICustomContent } from '../../interfaces';

// CONTENTS TYPES
type IGetPaginatedContentsDTO = (_: pagination) => Promise<
  { rows: ICustomContent[]; count: number; } | ICustomContent[] | ICustomContent | null
>

type IGetContentReportDTO = (_: {
  page: number;
  limit: number;
  userId: number;
}) => Promise<{ rows: ICustomContent[]; count: number }>;

export { IGetPaginatedContentsDTO, IGetContentReportDTO };
