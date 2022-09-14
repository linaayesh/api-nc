import { IUser } from 'db-models-nc';

export interface IEditDashboardSettings {
  nextupToOwedSplitPercentage: string
  fetchMaxCount: string
  expiredAfterInYears: string
  viewliftWatchesFetchLimit: string
  viewliftPassword: string
  viewliftEndpoint: string
  viewliftEmail: string
  systemActivationDate: string
}

export interface IAddUser {
  name: string
  email: string
  roleId: number
  currentUser?: IUser
}

export interface IStatisticsPayload {
  fromDate: string;
  toDate: string;
  page: number;
  limit: number;
}
