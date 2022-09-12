import { Request } from 'express';
import { IEditDashboardSettings, IAddUser } from '../../interfaces/DtoAdmin';
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