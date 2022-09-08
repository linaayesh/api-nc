export interface IForgetPassword {
  email: string,
}

export interface ILogin {
  rememberMe: string,
  password: string,
  email: string,
}

export interface IGoogleTokenId {
  tokenId: string,
}

export interface IResetPassword {
  password: string,
  resetPasswordToken: string,
}

export interface ISignup {
  password: string,
  name: string,
  email: string,
}
