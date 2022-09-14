import { Request } from 'express';
import { IEditDashboardSettings, IAddUser, IStatisticsPayload } from '../../interfaces/DtoAdmin';
import { IUserRequest } from '../../interfaces';

export const editDashboardSettingsDTO = (request: Request): IEditDashboardSettings => ({
  nextupToOwedSplitPercentage: request.body.nextupToOwedSplitPercentage.toString(),
  fetchMaxCount: request.body.fetchMaxCount.toString(),
  expiredAfterInYears: request.body.expiredAfterInYears.toString(),
  viewliftWatchesFetchLimit: request.body.viewliftWatchesFetchLimit.toString(),
  viewliftPassword: request.body.viewliftPassword.toString(),
  viewliftEndpoint: request.body.viewliftEndpoint.toString(),
  viewliftEmail: request.body.viewliftEmail.toString(),
  systemActivationDate: request.body.systemActivationDate.toString(),
});

export const addUserDTO = (request: IUserRequest): IAddUser => (
  {
    name: request.body.name,
    email: request.body.email.toLowerCase(),
    roleId: request.body.roleId,
    currentUser: request.user,
  });

export const statisticsDTO = (request: Request): IStatisticsPayload => ({
  fromDate: request.query.fromDate as string,
  page: Number(request.query.page || 1),
  limit: Number(request.query.limit || 10),
});
