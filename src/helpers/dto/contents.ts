/* eslint-disable import/prefer-default-export */
import { Request } from 'express';
import { matchUserContent } from '../../interfaces/DtoContents';

export const matchUserContentDTO = ({ body }: Request): matchUserContent => (
  {
    ...body,
    filmingCosts: body.filmingCosts.toString(),
    advance: body.advance.toString(),
    feePaid: body.feePaid.toString(),
    recoveredCosts: body.recoveredCosts.toString(),
  }
);
