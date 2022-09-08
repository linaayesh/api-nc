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
    }
