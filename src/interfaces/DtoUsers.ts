import { IUser } from 'db-models-nc';

export interface IUserId {
userId: number
}
export interface IResetPassword {
password: string
oldPassword: string
user: IUser
}

export interface IEditProfile {
  id: number
  name: string
  image: string
  videoNotification: boolean
  paymentNotification: boolean
  user: IUser
}
