import { Request } from 'express';
import { IEditDashboardSettings, IAddUser } from '../../interfaces/DtoAdmin';
import { IUserRequest } from '../../interfaces';

export const editDashboardSettingsDTO = (request: Request): IEditDashboardSettings => ({
  nextupToOwedSplitPercentage: request.body.nextupToOwedSplitPercentage.tostring(),
  fetchMaxCount: request.body.fetchMaxCount.tostring(),
  expiredAfterInYears: request.body.expiredAfterInYears.tostring(),
  viewliftWatchesFetchLimit: request.body.viewliftWatchesFetchLimit.tostring(),
  viewliftPassword: request.body.viewliftPassword.tostring(),
  viewliftEndpoint: request.body.viewliftEndpoint.tostring(),
  viewliftEmail: request.body.viewliftEmail.tostring(),
  systemActivationDate: request.body.systemActivationDate.tostring(),
});

export const addUserDTO = (request: IUserRequest): IAddUser => (
  {
    name: request.body.name,
    email: request.body.email.toLowerCase(),
    roleId: request.body.roleId,
    currentUser: request.user,
  });
