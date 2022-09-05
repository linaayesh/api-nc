import { Request } from 'express';
import { editDashboardSettings, addUser } from '../../interfaces/DtoAdmin';

export const editDashboardSettingsDTO = (request: Request): editDashboardSettings => ({
  nextupToOwedSplitPercentage: request.body.nextupToOwedSplitPercentage.tostring(),
  fetchMaxCount: request.body.fetchMaxCount.tostring(),
  expiredAfterInYears: request.body.expiredAfterInYears.tostring(),
  viewliftWatchesFetchLimit: request.body.viewliftWatchesFetchLimit.tostring(),
  viewliftPassword: request.body.viewliftPassword.tostring(),
  viewliftEndpoint: request.body.viewliftEndpoint.tostring(),
  viewliftEmail: request.body.viewliftEmail.tostring(),
  systemActivationDate: request.body.systemActivationDate.tostring(),
});

export const addUserDTO = (request: Request): addUser => (
  {
    name: request.body.name,
    email: request.body.email.toLowerCase(),
    roleId: request.body.roleId,
  });
