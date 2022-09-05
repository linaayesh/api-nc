export interface userId {
userId: number
}
export interface resetPassword {
password: string
oldPassword: string
}

export interface editProfile {
  id: number
  name: string
  image: string
  videoNotification: boolean
  paymentNotification: boolean
}
