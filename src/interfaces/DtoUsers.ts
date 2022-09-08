export interface IUserId {
userId: number
}
export interface IResetPassword {
password: string
oldPassword: string
}

export interface IEditProfile {
  id: number
  name: string
  image: string
  videoNotification: boolean
  paymentNotification: boolean
}
